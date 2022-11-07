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
import { asBlob } from "html-docx-js-typescript";
import { saveAs } from "file-saver";

class ExportAllToWord extends React.Component {
  state = { rawData: {} };

  componentDidMount() {
    this.loadSocket();
  }

  async loadSocket() {
    var chatSocket = this.props.chatSocket;
    chatSocket.on("lstAllReq", (data) => {
      console.log(JSON.parse(data)["lst"]);
      this.setState({ rawData: JSON.parse(data)["lst"] });
    });

    chatSocket.emit("lstAllReq", "");
  }

  exportData = async (report) => {
    //const { report } = this.state;
    asBlob(report).then((data) => {
      saveAs(data, "file.docx"); // save as docx file
    });
  };

  btnExport = () => {
    const { rawData } = this.state;
    var tmpHtml = "<html><body>";
    if (Object.keys(rawData).length > 0) {
      console.log(rawData[0]);
      for (var l in rawData) {
        tmpHtml += "<h1>" + rawData[l]["title"] + "</h1>";
        tmpHtml += "<p>";
        tmpHtml += `#:#?xml version="1.0" encoding="utf-8"?$:$ #:#soap:Envelope xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/"$:$ #:#soap:Body$:$`;
        tmpHtml += "#:#" + rawData[l]["title"] + ">";
        tmpHtml += "#:#" + rawData[l]["subTitle"] + ">";

        for (var sub in rawData[l]["lstParam"]) {
          tmpHtml += "#:#" + rawData[l]["lstParam"][sub]["name"] + "$:$";
          tmpHtml += "#:#/" + rawData[l]["lstParam"][sub]["name"] + "$:$";
          console.log(rawData[l]["lstParam"][sub]["name"]);
        }

        tmpHtml += "#:#/" + rawData[l]["subTitle"] + "$:$";
        tmpHtml += "#:#/" + rawData[l]["title"] + "$:$";
        tmpHtml += "#:#/soap:Body$:$ #:#/soap:Envelope$:$";
      }

      tmpHtml += "</p>";
    }
    tmpHtml += "</body></html>";
    this.exportData(tmpHtml);
  };

  render() {
    return (
      <Stack>
        <Button onClick={() => this.btnExport()} colorScheme={"blue"}>
          Save All to Word
        </Button>
      </Stack>
    );
  }
}

export default ExportAllToWord;
