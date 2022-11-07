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
  Code,
} from "@chakra-ui/react";

class Results extends React.Component {
  state = { rawData: {}, dyLinkPath: "" };

  componentDidMount() {
    this.loadSocket();
  }

  async loadSocket() {
    console.log(this.props.id, this.props.searchType);
    var chatSocket = this.props.chatSocket;
    if (this.props.searchType == "lstReq") {
      chatSocket.on("lstReqData", (data) => {
        //console.log(data);
        this.setState({ rawData: JSON.parse(data) });
      });

      chatSocket.emit("lstReqData", this.props.id);
    } else if (this.props.searchType == "lstReqObjs") {
      chatSocket.on("lstReqObjsData", (data) => {
        //console.log(data);
        this.setState({ rawData: JSON.parse(data) });
      });

      chatSocket.emit("lstReqObjsData", this.props.id);
    }
  }

  getCodeReq(t, data) {
    if (t) {
      return <Code bg="white" children={`<` + data + ">"}></Code>;
    } else {
      return <Code bg="white" children={`</` + data + ">"}></Code>;
    }
  }

  rebuildSource() {
    const { rawData } = this.state;
    if (Object.keys(rawData).length > 0) {
      var lst = [];
      if (this.props.searchType == "lstReq") {
        lst.push(
          <Code
            bg="white"
            children={`<?xml version="1.0" encoding="utf-8"?>
<soap:Envelope xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">
  <soap:Body>`}
          />
        );
        lst.push(this.getCodeReq(true, rawData["title"]));
        lst.push(this.getCodeReq(true, rawData["subTitle"]));

        for (var sub in rawData["lstParam"]) {
          //lst.push(this.getCodeReq(true, rawData["lstParam"][sub]["name"]));
          //lst.push(this.getCodeReq(false, rawData["lstParam"][sub]["name"]));
          lst.push(
            <Code>
              {"<" + rawData["lstParam"][sub]["name"] + ">"}
              {"</" + rawData["lstParam"][sub]["name"] + ">"}
            </Code>
          );
        }

        lst.push(this.getCodeReq(false, rawData["subTitle"]));
        lst.push(this.getCodeReq(false, rawData["title"]));
        lst.push(
          <Code
            bg="white"
            children={` </soap:Body>
            </soap:Envelope>`}
          />
        );
      } else if (this.props.searchType == "lstReqObjs") {
        console.log(rawData);
        for (var sub in rawData) {
          //lst.push(this.getCodeReq(true, rawData["lstParam"][sub]["name"]));
          //lst.push(this.getCodeReq(false, rawData["lstParam"][sub]["name"]));
          lst.push(
            <Code>
              {"<" + rawData[sub]["name"] + ">"}
              {"</" + rawData[sub]["name"] + ">"}
            </Code>
          );
        }
      }
      return lst;
    }
  }

  render() {
    const { dyLinkPath } = this.state;
    //console.log(searchType);

    var id = this.props.id;

    if (dyLinkPath != window.location.pathname) {
      this.props.passCurrentLink(window.location.pathname);
      this.setState({ dyLinkPath: window.location.pathname });
    }

    return (
      <Stack>
        <Center>
          <Text>Item: {id}</Text>
        </Center>

        <Stack bg="white">{this.rebuildSource()}</Stack>
      </Stack>
    );
  }
}

export default Results;
