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
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useParams,
} from "react-router-dom";

class Panel extends React.Component {
  state = { search: "" };

  lstDyn(lst, searchType) {
    const { txtSearch } = this.state;
    var lstBtns = lst.map((i) => {
      var found = false;
      const searchItem = i;
      if (txtSearch != "" && i.toLowerCase().includes(txtSearch)) {
        found = true;
      }

      if (txtSearch == "" || txtSearch == undefined || txtSearch == null) {
        found = true;
      }

      if (found) {
        return (
          <Link
            to={"/" + searchType + "/" + searchItem}
            as={Button}
            key={uuidv4()}
            p="3"
            colorScheme="orange"
          >
            <Text as="u" fontSize="xs">
              {i}
            </Text>
          </Link>
        );
      }
    });
    return lstBtns;
  }

  updateSearch(e) {
    this.setState({ txtSearch: e.target.value });
  }

  render() {
    var lst1 = this.lstDyn(this.props.lstReq, "lstReq");
    var lst2 = this.lstDyn(this.props.lstReqObjs, "lstReqObjs");

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
