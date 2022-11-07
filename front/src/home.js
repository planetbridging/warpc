import React from "react";
import {
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  WrapItem,
  Wrap,
  Badge,
  Text,
  Square,
  Stack,
  Center,
} from "@chakra-ui/react";
import { v4 as uuidv4 } from "uuid";

import io from "socket.io-client";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useParams,
} from "react-router-dom";

var ioLocation = "";
var testing = true;
var chatSocket = null;

if (testing) {
  ioLocation = "http://localhost:5000";
  chatSocket = io.connect(ioLocation);
} else {
  chatSocket = io.connect();
}

class HomePage extends React.Component {
  state = {};
  render() {
    return <p>hello</p>;
  }
}

export default HomePage;
