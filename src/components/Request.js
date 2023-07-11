import {
  Button,
  Checkbox,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Link,
  Stack,
  Image,
} from "@chakra-ui/react";
import { useLocation } from "react-router-dom";

export default function Request({}) {
  const location = useLocation();
  console.log(location);
  return (
    <Stack minH={"100vh"} direction={{ base: "column", md: "row" }}>
      <Flex p={8} flex={1} align={"center"} justify={"center"}>
        <Stack spacing={4} w={"full"} maxW={"md"}>
          <Heading fontSize={"2xl"}>Fill out form to request</Heading>
          <FormControl>
            <FormLabel>Username</FormLabel>
            <Input
              type="text"
              value={sessionStorage.getItem("username")}
              required
            />
          </FormControl>
          <FormControl>
            <FormLabel>PhoneNo</FormLabel>
            <Input
              type="number"
              value={sessionStorage.getItem("phoneno")}
              required
            />
          </FormControl>

          <FormControl>
            <FormLabel>To JobId</FormLabel>
            <Input type="text" value={location.state.job} required />
          </FormControl>

          <FormControl>
            <FormLabel>Salary</FormLabel>
            <Input type="number" placeholder="Enter Salary Rs" />
          </FormControl>

          <FormControl>
            <FormLabel>Hours</FormLabel>
            <Input type="number" placeholder="Enter Hours" />
          </FormControl>

          <Stack spacing={6}>
            <Stack
              direction={{ base: "column", sm: "row" }}
              align={"start"}
              justify={"space-between"}
            ></Stack>
            <Button colorScheme={"blue"} variant={"solid"}>
              Request
            </Button>
          </Stack>
        </Stack>
      </Flex>
      <Flex flex={1}>
        <Image
          alt={"Login Image"}
          objectFit={"cover"}
          src={
            "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1352&q=80"
          }
        />
      </Flex>
    </Stack>
  );
}
