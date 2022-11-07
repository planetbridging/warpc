import React from "react";
import {
  Box,
  VStack,
  Text,
  Image,
  Button,
  Flex,
  Spacer,
  HStack,
  Stack,
  Center,
  Square,
  Input,
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbSeparator,
  WrapItem,
  Wrap,
  Container,
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverHeader,
  PopoverBody,
  PopoverFooter,
  PopoverArrow,
  PopoverCloseButton,
  PopoverAnchor,
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

import Panel from "./panel";
import Results from "./results";

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
  state = { clientCounter: 0, lstReq: [], lstReqObjs: [] };

  componentDidMount() {
    this.loadSocket();
  }

  async loadSocket() {
    console.log("loading connections");

    chatSocket.on("lstReq", (data) => {
      //console.log(data);
      if (data.includes(",")) {
        var lstReq = data.split(",");
        this.setState({ lstReq: lstReq });
      }
    });

    chatSocket.on("lstReqObjs", (data) => {
      //console.log(data);
      if (data.includes(",")) {
        var lstReqObjs = data.split(",");
        this.setState({ lstReqObjs: lstReqObjs });
      }
    });

    chatSocket.on("clientCounter", (data) => {
      //console.log("people connected ", data);
      this.setState({ clientCounter: data });
    });

    chatSocket.emit("lstReq", "");
    chatSocket.emit("lstReqObjs", "");
  }

  render() {
    const { clientCounter, lstReq, lstReqObjs } = this.state;
    //   <Image src={logo} h="30px" />
    return (
      <Box w="100%" minH={"100vh"} bg="#25aae2">
        <Router>
          <Stack>
            <Wrap
              spacing="30px"
              align="center"
              justify="center"
              color="white"
              boxShadow="dark-lg"
              p="2"
            >
              <WrapItem>
                <Stack>
                  <HStack>
                    <Text fontSize="2xl">WARPC</Text>
                  </HStack>
                  <Square flex="1">Connected: {clientCounter}</Square>
                </Stack>
              </WrapItem>

              <WrapItem>
                <Breadcrumb p="2">
                  <BreadcrumbItem>
                    <Text as="u">
                      <Link
                        to="/"
                        onClick={() => this.setState({ dyLinkPath: "" })}
                      >
                        Home
                      </Link>
                    </Text>
                  </BreadcrumbItem>
                  {"hello"}
                </Breadcrumb>
              </WrapItem>
            </Wrap>

            <Switch>
              <Route exact path="/">
                <Panel lstReq={lstReq} lstReqObjs={lstReqObjs} />
              </Route>

              <Route
                exact
                path="/lstReqObjs/:id"
                render={({ match }) => (
                  <Results
                    id={match.params.id}
                    lstReq={lstReqObjs}
                    lstReqObjs={lstReqObjs}
                    chatSocket={chatSocket}
                    searchType={"lstReqObjs"}
                  />
                )}
              />

              <Route
                exact
                path="/lstReq/:id"
                render={({ match }) => (
                  <Results
                    id={match.params.id}
                    lstReq={lstReqObjs}
                    lstReqObjs={lstReqObjs}
                    chatSocket={chatSocket}
                    searchType={"lstReq"}
                  />
                )}
              />
            </Switch>
          </Stack>
        </Router>
      </Box>
    );
  }
}

export default HomePage;
