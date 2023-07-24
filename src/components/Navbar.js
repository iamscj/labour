import { useState } from "react";
import {
  Box,
  Flex,
  Button,
  IconButton,
  Text,
  Avatar,
  Menu,
  MenuButton,
} from "@chakra-ui/react";
import { HamburgerIcon } from "@chakra-ui/icons";
import { useNavigate } from "react-router-dom";
import GetRequest from "./Get_request";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverHeader,
  PopoverBody,
  PopoverArrow,
  PopoverCloseButton,
} from "@chakra-ui/react";

const Navbar = ({ t }) => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const toggle = () => setIsOpen(!isOpen);
  const handleClick = () => {
    sessionStorage.removeItem("username");
    sessionStorage.removeItem("phoneno");
    sessionStorage.removeItem("password");
    navigate("/");
  };

  return (
    <Box bg="gray.800" px={{ base: 2, md: 4 }} py={4}>
      <Flex h={16} alignItems={"center"} justifyContent={"space-between"}>
        <IconButton
          size={"md"}
          icon={<HamburgerIcon />}
          aria-label={"Open Menu"}
          display={{ md: "none" }}
          onClick={toggle}
        />
        <Box display={{ base: "none", md: "flex" }} alignItems={"center"}>
          <Text fontSize="lg" fontWeight="bold" color="white">
            {t("Find Your's")}
          </Text>
          <Box ml={10}>
            <Button variant="link" color="white" mr={4}>
              {t("Home")}
            </Button>
            <Button variant="link" color="white" mr={4}>
              {t("About")}
            </Button>
            <Button variant="link" color="white" mr={4}>
              {t("Contact Us")}
            </Button>
          </Box>
        </Box>
        <Box
          display={{ base: "none", sm: "flex", md: "flex" }}
          alignItems={"center"}
          justifyContent={"flex-end"}
        >
          <Popover>
            <PopoverTrigger>
              <Button
                colorScheme="blue"
                variant="solid"
                size="sm"
                mr={4}
                px={4}
                py={2}
              >
                {"Requests"}
              </Button>
            </PopoverTrigger>
            <PopoverContent>
              <PopoverArrow />
              <PopoverCloseButton />
              <PopoverHeader>Requests</PopoverHeader>
              <PopoverBody>
                <GetRequest />
              </PopoverBody>
            </PopoverContent>
          </Popover>
          <Button
            colorScheme="blue"
            variant="solid"
            size="sm"
            mr={4}
            px={4}
            py={2}
            onClick={() => {
              navigate("/post");
            }}
          >
            {t("ClickHereToPostNewJob")}
          </Button>

          <Button
            as={Button}
            rounded={"full"}
            variant={"link"}
            cursor={"pointer"}
            minW={0}
            onClick={handleClick}
          >
            <Avatar size={"sm"} name="User" />
          </Button>
        </Box>
      </Flex>
      {isOpen ? (
        <Box pb={4}>
          <Button variant="link" color="white" mb={4} w="full">
            {t("Home")}
          </Button>
          <Button variant="link" color="white" mb={4} w="full">
            {t("About")}
          </Button>
          <Button variant="link" color="white" mb={4} w="full">
            {t("Contact Us")}
          </Button>
          <Box
            display={{ base: "flex", sm: "none", md: "none" }}
            alignItems={"center"}
            justifyContent={"flex-end"}
          >
            <Button
              colorScheme="blue"
              variant="solid"
              size="sm"
              mr={4}
              px={4}
              py={2}
              onClick={() => {
                navigate("/getrequest");
              }}
            >
              {"Requests"}
            </Button>
            <Button
              colorScheme="blue"
              variant="solid"
              size="sm"
              mr={4}
              px={4}
              py={2}
              onClick={() => {
                navigate("/post");
              }}
            >
              {t("ClickHereToPostNewJob")}
            </Button>

            <Menu>
              <MenuButton
                as={Button}
                rounded={"full"}
                variant={"link"}
                cursor={"pointer"}
                minW={0}
              >
                <Avatar size={"sm"} name="User" />
              </MenuButton>
            </Menu>
          </Box>
        </Box>
      ) : null}
    </Box>
  );
};

export default Navbar;
