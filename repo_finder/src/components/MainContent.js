// MainContent.js

import React from "react";
import { Box, Heading, Input, FormControl, FormLabel, 
  Stack, Select, InputGroup, InputRightElement, Text,
  Checkbox, Grid, Button } from "@chakra-ui/react";
import "../custom.css";
import customTheme from "../customTheme";

function MainContent() {
  const inputStyles = {
    bg: customTheme.colors.primary[50],
    color: customTheme.colors.primary[600],
  };

  const buttonStyles = {
    bg: customTheme.colors.primary[800],
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

  return (
    <Box className="main-content">
      <Heading as="h2" fontSize="2xl" fontWeight="bold" mb={8}>
        Search Criteria
      </Heading>
      <Stack spacing={4}>
        <FormControl id="keywords" w="75%">
          <FormLabel fontSize="lg" fontWeight="bold">
            Keywords
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
            <option value="10000">10,000</option>
            <option value="100000">100,000</option>
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
              >
                {language}
              </Checkbox>
            ))}
          </Grid>
        </FormControl>
        <Button fontSize="lg" fontWeight="bold" w="12.5%"
          borderRadius="md" _hover={{ boxShadow: "lg" }}
          paddingY={4} {...buttonStyles} >
          Search
        </Button>
      </Stack>
    </Box>
  );
}

export default MainContent;
