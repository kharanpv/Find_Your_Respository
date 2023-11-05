// runSearch.js

import { Octokit } from "octokit";

const authKey = "ENTER YOUR GITHUB PERSONAL ACCESS TOKEN HERE"

const octokit = new Octokit({
    auth: authKey, // Use the read key as the authentication token
});

async function getResults(query, owner, stars, lastUpdated, selectedLanguages) {

    try {
        // Define the base query string
        let queryString = `/search/repositories?q=`;

        // Add the 'query' parameter if it's not empty
        if (query) {
            queryString += `${query.value}+`;
        }

        // Add the 'user' parameter if it's not empty
        if (owner.value != "") {
            queryString += `user:${owner.value}+`;
        }

        // Add the 'stars' and 'updated' parameters if they are not empty
        if (stars) {
            queryString += `stars:>${stars.value}+`;
        }
        if (lastUpdated.value != "") {
            queryString += `updated:>${lastUpdated.value}+`;
        }

        // Add language filters for each selected language
        if (selectedLanguages.length > 0) {
            const languageFilters = selectedLanguages.map(language => `language:${language}+`).join('');
            queryString += languageFilters;
        }

        // Remove the trailing '+' character if it exists
        if (queryString.endsWith('+')) {
            queryString = queryString.slice(0, -1);
        }

        // Use the queryString in your GET request
        let response = await octokit.request(`GET ${queryString}`, {
            per_page: 10,
        });

        // Create the responses directory if it doesn't exist
        if (!localStorage.responses) {
            localStorage.responses = JSON.stringify([response]);

        } else { // else, append
            const responses = JSON.parse(localStorage.responses);
            responses.push(response);
            localStorage.responses = JSON.stringify(responses);
        }

    } catch (error) {
        if (error.response)
            console.error(`Error: ${error.response.status}\n Message: ${error.response.data.message}`)
        else console.error(error)
    }
}

export function runSearch(selectedLanguages) {
    const query = document.getElementById("query");
    const owner = document.getElementById("owner");
    const stars = document.getElementById("stars");
    const lastUpdated = document.getElementById("last-updated");
    getResults(query, owner, stars, lastUpdated, selectedLanguages);

  }
