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
  useToast
} from "@chakra-ui/react";
import { useLocation,useNavigate } from "react-router-dom";

import { useState } from "react";
import axios from "axios";




export default function Request({}) {
  const location = useLocation();


  const inputss = {


    username:sessionStorage.getItem("username"),
    job_id:location.state.job,
    phonenumber: sessionStorage.getItem("phoneno"),
    salary:"",
    no_of_hours:"",
  
    
    
  };
  console.log(location);
  const toast = useToast();
  const [inputfeild, setFeild] = useState(inputss);
  const onInputChange = (e) => {
    setFeild({ ...inputfeild, [e.target.name]: e.target.value });
  };
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    let res;
    console.log(inputfeild);
    try {
      res = await axios.post(
        "https://server-labour.vercel.app/raise-request",
        inputfeild
      );
      console.log(res);
      if (res.error === "Internal Server Error") {
        toast({
          title: "Check username",
          status: "error",
          duration: 4000,
          isClosable: true,
          position: "bottom",
        });
        return;
      }

      toast({
        title: "Successfully submitted",
        status: "success",
        duration: 4000,
        isClosable: true,
        position: "top",
      });

      setTimeout(() => navigate("/"), 1000);
    } catch (err) {
      //console.log(res.data);
      toast({
        title: res,
        status: "error",
        duration: 4000,
        isClosable: true,
        position: "bottom",
      });
    }
    //console.log(res.data.error);
  };
  return (
    <Stack minH={"100vh"} direction={{ base: "column", md: "row" }}>
      <Flex p={8} flex={1} align={"center"} justify={"center"}>
        <Stack spacing={4} w={"full"} maxW={"md"}>
          <Heading fontSize={"2xl"}>Fill out form to request</Heading>
          <FormControl>
            <FormLabel>Username</FormLabel>
            <Input
            name="username"
              type="text"
              value={sessionStorage.getItem("username")}
              required
            />
          </FormControl>
          

          <FormControl>
            <FormLabel>To JobId</FormLabel>
            <Input name="job_id" type="text" value={location.state.job} required />
          </FormControl>

          <FormControl>
            <FormLabel>PhoneNo</FormLabel>
            <Input
             name="phonenumber"
              type="number"
              value={sessionStorage.getItem("phoneno")}
              required
            />
          </FormControl>

          <FormControl>
            <FormLabel>Salary</FormLabel>
            <Input name="salary" onChange={(e) => onInputChange(e)} type="number" placeholder="Enter Salary Rs" />
          </FormControl>

          <FormControl>
            <FormLabel>Hours</FormLabel>
            <Input name="no_of_hours" onChange={(e) => onInputChange(e)} type="number" placeholder="Enter Hours" />
          </FormControl>

          <Stack spacing={6}>
            <Stack
              direction={{ base: "column", sm: "row" }}
              align={"start"}
              justify={"space-between"}
            ></Stack>
            <Button colorScheme={"blue"} variant={"solid"} onClick={handleSubmit}>
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
