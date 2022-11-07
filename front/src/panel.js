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

class Panel extends React.Component {
  state = { search: "" };

  lstReqObjs() {
    const { txtSearch } = this.state;
    var lst = this.props.lstReqObjs;
    var lstBtns = lst.map((i) => {
      var found = false;
      if (txtSearch != "" && i.toLowerCase().includes(txtSearch)) {
        found = true;
      }

      if (txtSearch == "" || txtSearch == undefined || txtSearch == null) {
        found = true;
      }

      if (found) {
        return (
          <Button key={uuidv4()} p="3" colorScheme="orange">
            <Text as="u" fontSize="xs">
              {i}
            </Text>
          </Button>
        );
      }
    });
    return lstBtns;
  }

  lstReq() {
    const { txtSearch } = this.state;
    var lst = this.props.lstReq;
    var lstBtns = lst.map((i) => {
      var found = false;
      if (txtSearch != "" && i.toLowerCase().includes(txtSearch)) {
        found = true;
      }

      if (txtSearch == "" || txtSearch == undefined || txtSearch == null) {
        found = true;
      }

      if (found) {
        return (
          <Button key={uuidv4()} p="3" colorScheme="orange">
            <Text as="u" fontSize="xs">
              {i}
            </Text>
          </Button>
        );
      }
    });
    return lstBtns;
  }

  updateSearch(e) {
    this.setState({ txtSearch: e.target.value });
  }

  render() {
    var lst1 = this.lstReqObjs();
    var lst2 = this.lstReq();

    /*var btnSearch = <Square flex="1" color="black">
<Popover>
  <PopoverTrigger>
    <Button colorScheme="blue">Search</Button>
  </PopoverTrigger>
  <PopoverContent>
    <PopoverArrow />
    <PopoverCloseButton />
    <PopoverHeader>
      <Input placeholder="search" />
    </PopoverHeader>
    <PopoverBody>Search for objects</PopoverBody>
  </PopoverContent>
</Popover>
</Square>;*/

    var txtSearch = <Input onChange={(e) => this.updateSearch(e)} />;

    return (
      <Stack>
        {txtSearch}
        <Flex color="white" minH="100vh">
          <Box flex="1" boxShadow="dark-lg" p="6" rounded="md">
            <Stack>{lst1}</Stack>
          </Box>
          <Box flex="1" boxShadow="dark-lg" p="6" rounded="md">
            <Stack flex="1" color="black">
              {lst2}
            </Stack>
          </Box>
        </Flex>
      </Stack>
    );
  }
}

export default Panel;
