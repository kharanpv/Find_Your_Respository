import { Octokit } from "octokit";
import fs from "fs";
import path from "path";
import { fileURLToPath } from 'url';

// to set up  __dirname variable
const __filename = fileURLToPath(import.meta.url);

const __dirname = path.dirname(__filename);

const responsesDir = path.join(__dirname, "responses"); // Define the responses directory path

// Define the path to the auth key file
const authKeyFilePath = path.join(__dirname, "../gh-api-authkey.txt"); // Assuming the file is in the parent directory

// Read the auth key from the file
const authKey = fs.readFileSync(authKeyFilePath, "utf-8").trim();

const octokit = new Octokit({
    auth: authKey, // Use the read key as the authentication token
});

async function getResults() {
    let start_date = new Date("01/01/2009")
    const current_date = new Date()

    while ( start_date < current_date) {
        // Format the date as "yyyy/mm/dd"
        let year = start_date.getFullYear();
        let month = start_date.getMonth() + 1;
        let day = start_date.getDate();
        let from_date = `${year}-${String(month).padStart(2, '0')}-${String(day).padStart(2, '0')}`;

        let end_date = new Date(start_date)
        // Add 1 month to the end date
        end_date.setFullYear(end_date.getFullYear() + 1);
        // Subtract 1 day from the end date
        end_date.setDate(end_date.getDate() - 1);
        // if end date is greater than current date
        if (end_date > current_date) {
            end_date = current_date; // Set end_date to current_date
        }
        // Format the end_date
        year = end_date.getFullYear();
        month = end_date.getMonth() + 1;
        day = end_date.getDate();
        let to_date = `${year}-${String(month).padStart(2, '0')}-${String(day).padStart(2, '0')}`;

        try {
            // try to get response for request to search
            let response = octokit.paginate.iterator("GET /search/repositories?q={query}+language:{language}+created:{from_date}..{to_date}", {
                query: "ARM",
                language: "Assembly",
                from_date: from_date,
                to_date: to_date,
                per_page: 100,
            })

            // Create the responses directory if it doesn't exist
            if (!fs.existsSync(responsesDir)) {
                fs.mkdirSync(responsesDir);
            }

            // Write the response data to a JSON file
            const responseFilePath = path.join(responsesDir, "response.json");
            for await (const {data} of response) {
                if (!fs.existsSync(responseFilePath)) {
                    // if file does not exist, create and write
                    fs.writeFileSync(responseFilePath, JSON.stringify(data, null, 2));
                } else {
                    // else, append
                    fs.appendFileSync(responseFilePath, JSON.stringify(data, null, 2));
                }
                console.log(`Added ${data.length} repositories created between ${from_date} and ${to_date}`)
            }

        } catch (error) {
            if (error.response)
                console.error(`Error: ${error.response.status}\n Message: ${error.response.data.message}`)
            else console.error(error)
        }
        // Add 1 month to the start date
        start_date.setFullYear(start_date.getFullYear() + 1);
    }
}

getResults()

