// AppContainer.js

import React from "react";
import { Box } from "@chakra-ui/react";
import "../custom.css";

function AppContainer({ children }) {
  return <Box className="app-container">{children}</Box>;
}

export default AppContainer 