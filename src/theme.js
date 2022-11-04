import { extendTheme } from "@chakra-ui/react";

const config = {
  initialColorMode: "dark",
  useSystemColorMode: false,
  colors: {
    pink: "#ff006b",
    purple: "#8a3ab9",
    blue: "#0437F2",
    green: "#48bb78",
  },
};

const theme = extendTheme({ config });

export default theme;
