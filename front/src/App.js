import { ChakraProvider } from "@chakra-ui/react";

import logo from "./logo.svg";
import "./App.css";
import HomePage from "./home";

function App() {
  return (
    <ChakraProvider>
      <HomePage />
    </ChakraProvider>
  );
}

export default App;
