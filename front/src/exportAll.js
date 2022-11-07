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
  state = { report: "<html><body>hello</body></html>" };

  exportData = async () => {
    const { report } = this.state;
    asBlob(report).then((data) => {
      saveAs(data, "file.docx"); // save as docx file
    });
  };

  btnExport = () => {
    this.exportData();
  };

  render() {
    return (
      <Stack>
        <Button onClick={() => this.btnExport()} colorScheme={"blue"}>
          Save All to word
        </Button>
      </Stack>
    );
  }
}

export default ExportAllToWord;
