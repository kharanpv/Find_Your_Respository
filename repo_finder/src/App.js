import React from 'react';
import {
  ChakraProvider,
  Box,
  Text,
  Link,
  VStack,
  Code,
  Grid,
  theme,
  CSSReset,
} from '@chakra-ui/react';
// import { ColorModeSwitcher } from './ColorModeSwitcher';

import MainHeading from "./components/main_heading";
import customTheme from "./customTheme"; // Import your custom theme
import AppContainer from './components/AppContainer';
import MainContent from './components/MainContent';

function App() {
  return (
    <ChakraProvider theme={customTheme}>
      <CSSReset />
      <div>
        <MainHeading />
      </div>
      <div>
        <AppContainer>
          <MainContent />
        </AppContainer>
      </div>
    </ChakraProvider>
  );
}

export default App;
