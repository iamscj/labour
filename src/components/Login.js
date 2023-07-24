import {
  Box,
  Flex,
  Stack,
  Link,
  useToast,
  Heading,
  Text,
  Container,
  Input,
  Button,
  SimpleGrid,
  Avatar,
  AvatarGroup,
  useBreakpointValue,
  Icon,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
} from "@chakra-ui/react";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import LoadingSpinner from "./Loading";

const avatars = [
  {
    name: "Ryan Florence",
    url: "https://bit.ly/ryan-florence",
  },
  {
    name: "Segun Adebayo",
    url: "https://bit.ly/sage-adebayo",
  },
  {
    name: "Kent Dodds",
    url: "https://bit.ly/kent-c-dodds",
  },
  {
    name: "Prosper Otemuyiwa",
    url: "https://bit.ly/prosper-baba",
  },
  {
    name: "Christian Nwamba",
    url: "https://bit.ly/code-beast",
  },
];

const loginInitialValues = {
  username: "",
  password: "",
};

export default function JoinOurTeam() {
  const [login, setLogin] = useState(loginInitialValues);
  const [isLoading, setIsLoading] = useState(false);
  const { t, i18n } = useTranslation();
  const onValueChange = (e) => {
    setLogin({ ...login, [e.target.name]: e.target.value });
  };
  const navigate = useNavigate();
  const toast = useToast();
  const handleSubmit = async (e) => {
    e.preventDefault();

    setIsLoading(true);
    try {
      let res = await axios.post(
        "https://server-labour.vercel.app/login",
        login
      );

      console.log(res.data);

      if (res.data.msg === "password missmatch") {
        toast({
          title: t("Incorrect Password"),
          status: "error",
          duration: 4000,
          isClosable: true,
          position: "bottom",
        });
        setIsLoading(false);

        return;
      }
      if (res.data.msg === "User Does Not Exist") {
        toast({
          title: t("User Does Not Exist"),
          status: "error",
          duration: 4000,
          isClosable: true,
          position: "bottom",
        });

        setIsLoading(false);
        return;
      }
      if (res.data.msg === "user verified") {
        toast({
          title: t("user verified"),
          status: "success",
          duration: 4000,
          isClosable: true,
          position: "top",
        });
        sessionStorage.setItem("username", res.data.details.username);
        sessionStorage.setItem("phoneno", res.data.details.phonenumber);
        sessionStorage.setItem("password", res.data.details.password);

        setIsLoading(false);

        setTimeout(() => navigate("/"), 1000);
      } else {
        toast({
          title: t("Something Went Wrong"),
          status: "error",
          duration: 4000,
          isClosable: true,
          position: "top",
        });
        //e.currentTarget.disabled = false;
        setIsLoading(false);
        return;
      }
    } catch (err) {
      console.log(err);
      toast({
        title: t("Something Went Wrong"),
        status: "error",
        duration: 4000,
        isClosable: true,
        position: "top",
      });

      setIsLoading(false);
      return;
    }
  };

  function handleClick(lang) {
    i18n.changeLanguage(lang);
  }

  return (
    <Box position={"relative"}>
      <Container
        as={SimpleGrid}
        maxW={"7xl"}
        columns={{ base: 1, md: 2 }}
        spacing={{ base: 10, lg: 32 }}
        py={{ base: 10, sm: 20, lg: 32 }}
      >
        <Stack spacing={{ base: 10, md: 20 }}>
          <Heading
            lineHeight={1.1}
            fontSize={{ base: "3xl", sm: "4xl", md: "5xl", lg: "6xl" }}
          >
            {t("Labours")}{" "}
            <Text
              as={"span"}
              bgGradient="linear(to-r, red.400,pink.400)"
              bgClip="text"
            >
              &
            </Text>{" "}
            {t("Employment")}
          </Heading>
          <Stack direction={"row"} spacing={4} align={"center"}>
            <AvatarGroup>
              {avatars.map((avatar) => (
                <Avatar
                  key={avatar.name}
                  name={avatar.name}
                  src={avatar.url}
                  // size={useBreakpointValue()}
                  position={"relative"}
                  zIndex={2}
                  _before={{
                    content: '""',
                    width: "full",
                    height: "full",
                    rounded: "full",
                    transform: "scale(1.125)",
                    bgGradient: "linear(to-bl, red.400,pink.400)",
                    position: "absolute",
                    zIndex: -1,
                    top: 0,
                    left: 0,
                  }}
                />
              ))}
            </AvatarGroup>
            <Text fontFamily={"heading"} fontSize={{ base: "4xl", md: "6xl" }}>
              +
            </Text>
            <Flex
              align={"center"}
              justify={"center"}
              fontFamily={"heading"}
              fontSize={{ base: "sm", md: "lg" }}
              bg={"gray.800"}
              color={"white"}
              rounded={"full"}
              minWidth={useBreakpointValue({ base: "44px", md: "60px" })}
              minHeight={useBreakpointValue({ base: "44px", md: "60px" })}
              position={"relative"}
              _before={{
                content: '""',
                width: "full",
                height: "full",
                rounded: "full",
                transform: "scale(1.125)",
                bgGradient: "linear(to-bl, orange.400,yellow.400)",
                position: "absolute",
                zIndex: -1,
                top: 0,
                left: 0,
              }}
            >
              YOU
            </Flex>
          </Stack>
        </Stack>
        <Stack
          bg={"gray.50"}
          rounded={"xl"}
          p={{ base: 4, sm: 6, md: 8 }}
          spacing={{ base: 8 }}
          maxW={{ lg: "lg" }}
        >
          <Stack spacing={4}>
            <Heading
              color={"gray.800"}
              lineHeight={1.1}
              fontSize={{ base: "2xl", sm: "3xl", md: "4xl" }}
            >
              {t("Login")}
              <Text
                as={"span"}
                bgGradient="linear(to-r, red.400,pink.400)"
                bgClip="text"
              >
                !
              </Text>
            </Heading>
            <Text color={"gray.500"} fontSize={{ base: "sm", sm: "md" }}></Text>
          </Stack>
          <Box as={"form"} mt={10}>
            <Stack spacing={4}>
              <Input
                value={login.username}
                onChange={(e) => onValueChange(e)}
                name="username"
                placeholder={t("Username")}
                bg={"gray.100"}
                border={0}
                color={"gray.500"}
                _placeholder={{
                  color: "gray.500",
                }}
              />
              <Input
                value={login.password}
                onChange={(e) => onValueChange(e)}
                name="password"
                placeholder={t("Password")}
                bg={"gray.100"}
                border={0}
                color={"gray.500"}
                _placeholder={{
                  color: "gray.500",
                }}
              />
              <Menu>
                <MenuButton as={Button}>{t("Language")}</MenuButton>
                <MenuList>
                  <MenuItem onClick={() => handleClick("en")}>
                    {t("English")}
                  </MenuItem>
                  <MenuItem onClick={() => handleClick("kn")}>
                    {t("Kannada")}
                  </MenuItem>
                </MenuList>
              </Menu>
              <Link>
                <Button
                  fontFamily={"heading"}
                  bg={"gray.200"}
                  color={"gray.800"}
                  width={"100%"}
                  isDisabled={isLoading ? true : false}
                  onClick={handleSubmit}
                >
                  {isLoading ? <LoadingSpinner /> : t("Login")}
                </Button>
              </Link>
            </Stack>
            <Stack spacing={2}>
              <Text textAlign={"center"} margin={"20px 20px"}>
                OR
              </Text>
            </Stack>

            <Button
              fontFamily={"heading"}
              mt={8}
              w={"full"}
              bgGradient="linear(to-r, red.400,pink.400)"
              color={"white"}
              _hover={{
                bgGradient: "linear(to-r, red.400,pink.400)",
                boxShadow: "xl",
              }}
              disabled={true}
              onClick={() => navigate("/signup")}
            >
              {t("No Account!SignUp")}
            </Button>
          </Box>
        </Stack>
      </Container>
      <Blur
        position={"absolute"}
        top={-10}
        left={-10}
        style={{ filter: "blur(70px)" }}
      />
    </Box>
  );
}

export const Blur = (props) => {
  return (
    <Icon
      width={useBreakpointValue({ base: "100%", md: "40vw", lg: "30vw" })}
      zIndex={useBreakpointValue({ base: -1, md: -1, lg: 0 })}
      height="560px"
      viewBox="0 0 528 560"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <circle cx="71" cy="61" r="111" fill="#F56565" />
      <circle cx="244" cy="106" r="139" fill="#ED64A6" />
      <circle cy="291" r="139" fill="#ED64A6" />
      <circle cx="80.5" cy="189.5" r="101.5" fill="#ED8936" />
      <circle cx="196.5" cy="317.5" r="101.5" fill="#ECC94B" />
      <circle cx="70.5" cy="458.5" r="101.5" fill="#48BB78" />
      <circle cx="426.5" cy="-0.5" r="101.5" fill="#4299E1" />
    </Icon>
  );
};
