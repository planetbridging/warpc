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
import ExportAllToWord from "./exportAll";

var ioLocation = "";
var testing = false;
var chatSocket = null;

if (testing) {
  ioLocation = "http://localhost:5000";
  chatSocket = io.connect(ioLocation);
} else {
  chatSocket = io.connect();
}

class HomePage extends React.Component {
  state = { clientCounter: 0, lstReq: [], lstReqObjs: [], dyLinkPath: "/" };

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

  dynamicCreateLinks() {
    const { dyLinkPath } = this.state;
    var dLink = dyLinkPath; //window.location.pathname;
    var sLink = dLink.split("/");
    console.log(dLink);

    var lstBtns = sLink.map((i, index) => {
      const tmp = i;
      if (i != "") {
        var linkpath = "/";
        if (index == 1) {
          linkpath += i;
        } else if (index == 2) {
          linkpath = dLink;
        }
        return (
          <BreadcrumbItem key={uuidv4()}>
            <Text as="u">
              <Link to={linkpath}>{i}</Link>
            </Text>
          </BreadcrumbItem>
        );
      }
    });
    return lstBtns;
  }

  passCurrentLink(path) {
    this.setState({ dyLinkPath: path });
  }

  render() {
    const { clientCounter, lstReq, lstReqObjs, dyLinkPath } = this.state;

    if (window.location.pathname != dyLinkPath) {
      this.setState({ dyLinkPath: window.location.pathname });
    }

    var sLinks = this.dynamicCreateLinks();
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
                  {sLinks}
                </Breadcrumb>
              </WrapItem>
              <Spacer />
              <WrapItem>
                <ExportAllToWord chatSocket={chatSocket} />
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
                    passCurrentLink={this.passCurrentLink.bind(this)}
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
                    passCurrentLink={this.passCurrentLink.bind(this)}
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
