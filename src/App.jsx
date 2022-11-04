import "./App.css";

import { Outlet } from "react-router-dom";
import { ChakraProvider } from "@chakra-ui/react";
import { CurrentPageProvider } from "./context/PageContext";
import { CollectionProvider } from "./context/CollectionContext";
import theme from "./theme";
import Navbar from "./components/layout/Navbar";

function App() {
  return (
    <ChakraProvider theme={theme}>
      <CollectionProvider>
        <CurrentPageProvider>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              minHeight: "100vh",
              justifyContent: "space-between",
              fontFamily: "Poppins",
            }}
          >
            <Outlet />
            <Navbar />
          </div>
        </CurrentPageProvider>
      </CollectionProvider>
    </ChakraProvider>
  );
}

export default App;
