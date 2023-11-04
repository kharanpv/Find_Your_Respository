// customTheme.js

import { extendTheme } from "@chakra-ui/react";

const customTheme = extendTheme({
    colors: {
      primary: {
        50: "#fffcf2",
        200: "#ccc5b9",
        400: "#403d39",
        600: "#252422",
        800: "#eb5e28",
      },
      // Define colors for other parts of your theme as needed
    },
  });
  

export default customTheme;
