// MainContent.js

import React, { useState, useEffect } from "react";
import { Box, Heading, Input, FormControl, FormLabel, 
  Stack, Select, InputGroup, InputRightElement, Text,
  Checkbox, Grid, Button} from "@chakra-ui/react";
import "../custom.css";
import customTheme from "../customTheme";
import { runSearch } from "../utils/runSearch";

function MainContent() {
  const inputStyles = {
    bg: customTheme.colors.primary[50],
    color: customTheme.colors.primary[600],
  };

  const buttonStyles = {
    bg: customTheme.colors.primary[800],
    color: customTheme.colors.primary[50],
  }

  const resultStyles = {
    bg: customTheme.colors.primary[600],
    color: customTheme.colors.primary[50],
  }

  const languages = [
    "C", "C#", "C++", "CoffeeScript",
    "CSS", "Dart", "DM", "Elixir", "Go",
    "Groovy", "HTML", "Java", "JavaScript",
    "Kotlin", "Objective-C", "Perl",
    "PHP", "PowerShell", "Python", "Ruby",
    "Rust", "Scala", "Shell", "Swift",
    "TypeScript",
  ];

  const [showResults, setShowResults] = useState(false);
  const [repositories, setRepositories] = useState([]);
  const [selected, setSelected] = useState([]); // array of selected languages
  const handleCheckbox = (e) => {
      const value = e.target.value;
      if (e.target.checked) {
          setSelected([...selected, value]); // add the value to the selected array
      } else {
          setSelected(selected.filter(item => item !== value)); // remove the value from the selected array
      }
  }

  // Define a function to process the data from localStorage
  const processLocalStorageData = () => {
    const localStorageData = localStorage.getItem('responses');
    if (localStorageData) {
      const parsedData = JSON.parse(localStorageData);
      const items = parsedData[0]?.data?.items || [];
      setRepositories(items);
    }
  };

  const handleClick = async () => {
    localStorage.clear();
    if (showResults) {
      // Go back to the main content form
      setShowResults(false);
    } else {
      // Show search results
      setShowResults(true);
      await runSearch(selected);
      processLocalStorageData(); // Process data after search is complete
    }
  };

  useEffect(() => {
    // Load data from localStorage when the component mounts
    processLocalStorageData();
  }, []);

  return (
    <Box className="main-content">
      {showResults ? (
        <Box>
          {repositories.map((repo) => (
            <Box
              key={repo.id}
              bg={resultStyles.bg}
              color={resultStyles.color}
              borderRadius="md"
              p={4}
              my={2}
              boxShadow="base"
            >
              <Text>Full Name: {repo.full_name}</Text>
              <Text>Owner: {repo.owner.login}</Text>
              <Text>Description: {repo.description}</Text>
              <Text>Stars: {repo.stargazers_count}</Text>
              <Text>
                URL: <a href={repo.html_url} target="_blank" rel="noopener noreferrer">{repo.html_url}</a>
              </Text>
            </Box>
          ))}
          <Button fontSize="lg" fontWeight="bold" w="12.5%"
            borderRadius="md" _hover={{ boxShadow: "lg" }}
            paddingY={4} {...buttonStyles}
            onClick={handleClick}
          >
            Go Back
          </Button>
        </Box>
      ) : (
        <Stack spacing={4}>
          <FormControl id="query" w="75%">
            <FormLabel fontSize="lg" fontWeight="bold">
              Query
            </FormLabel>
            <Input type="text" {...inputStyles} />
          </FormControl>
          <FormControl id="owner" w="50%">
            <FormLabel fontSize="lg" fontWeight="bold">
              Owner
            </FormLabel>
            <Input type="text" {...inputStyles} />
          </FormControl>
          <FormControl id="stars" w="20%" display="flex" alignItems="center">
            <FormLabel flex="2" m="0" fontSize="lg" fontWeight="bold">
              At least
            </FormLabel>
            <Select {...inputStyles} flex="3">
              <option value="0">0</option>
              <option value="1">1</option>
              <option value="10">10</option>
              <option value="100">100</option>
              <option value="1000">1,000</option>
              <option value="10000">10 K</option>
              <option value="100000">100 K</option>
              <option value="1000000">1 Million</option>
            </Select>
            <Text flex="1" ml={4} fontSize="lg" fontWeight="bold">
              stars
            </Text>
          </FormControl>
          <FormControl id="last-updated" w="25%">
            <FormLabel fontSize="lg" fontWeight="bold">
              Last Updated (Date)
            </FormLabel>
            <InputGroup>
              <Input type="date" {...inputStyles} />
              <InputRightElement
                pointerEvents="none"
                children={<i className="calendar-icon" />}
              />
            </InputGroup>
          </FormControl>
          <FormControl id="languages" w="25%">
            <FormLabel fontSize="lg" fontWeight="bold">
              Languages
            </FormLabel>
            <Grid templateColumns="repeat(5, 1fr)" gap={2}>
              {languages.map((language) => (
                <Checkbox
                  key={language}
                  value={language}
                  colorScheme={customTheme}
                  textColor="gray.50"
                  paddingLeft="4"
                  paddingBottom="2"
                  onChange={handleCheckbox}
                >
                  {language}
                </Checkbox>
              ))}
            </Grid>
          </FormControl>
          <Button fontSize="lg" fontWeight="bold" w="12.5%"
            borderRadius="md" _hover={{ boxShadow: "lg" }}
            paddingY={4} {...buttonStyles} 
            onClick={handleClick}
          >
            Search
          </Button>
        </Stack>
      )}
    </Box>
  );
}

export default MainContent;
