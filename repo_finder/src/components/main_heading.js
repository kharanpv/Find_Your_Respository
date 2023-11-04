// main_heading.js

import React from "react";
import { Heading, Divider } from "@chakra-ui/react";
import "../custom.css";

function MainHeading() {
  return (
    <div className="main-heading">
      <Heading as="h1" size="xl" ml={4} mt={4} mb={4}> {/* Add mb prop for bottom padding */}
        GitHub Repo Searcher
      </Heading>
    </div>
  );
}

export default MainHeading;

