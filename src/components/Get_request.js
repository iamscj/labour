import {
  Box,
  Flex,
  Heading,
  Text,
  Divider,
  Stack,
  Button,
  Input,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverBody,
  PopoverArrow,
  PopoverCloseButton,
} from "@chakra-ui/react";

const GetRequest = ({ t }) => {
  const [jobs, setJobs] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    let req = {
      username: sessionStorage.getItem("username"),
      password: sessionStorage.getItem("password"),
    };
    console.log(req);
    if (req.username === null || req.password === null) {
      navigate("/login");
    }
    let res = axios.post("https://server-labour.vercel.app/verify-user", req);
    console.log(res);
    if (res.msg === "password missmatch") {
      navigate("/login");
    }
  });
  const handleSubmit1 = async (job_id1, username3, phonenumber3, email_id1) => {
    let res = {
      status: "yes",
      job_id: job_id1,
      username1: sessionStorage.getItem("username"),
      username2: username3,
      phonenumber1: sessionStorage.getItem("phoneno"),
      phonenumber2: phonenumber3,
      email_id_1: inputfeild.email_id,
      email_id_2: email_id1,
    };
    console.log(res);
    let req = await axios.post(
      "https://server-labour.vercel.app/accept-reject-request",
      res
    );
    window.location.reload(false)
  };
  const handleSubmit2 = async (job_id1, username3, phonenumber3, email_id1) => {
    let res = {
      status: "yes1",
      job_id: job_id1,
      username1: sessionStorage.getItem("username"),
      username2: username3,
      phonenumber1: sessionStorage.getItem("phoneno"),
      phonenumber2: phonenumber3,
      email_id_1: inputfeild.email_id,
      email_id_2: email_id1,
    };
    console.log(res);
    let req = await axios.post(
      "https://server-labour.vercel.app/accept-reject-request",
      res
    );
    window.location.reload(false)
  };
  const handleSubmit3 = async (job_id1, username3, phonenumber3, email_id1) => {
    let res = {
      status: "no",
      job_id: job_id1,
      username1: sessionStorage.getItem("username"),
      username2: username3,
      phonenumber1: sessionStorage.getItem("phoneno"),
      phonenumber2: phonenumber3,
      email_id_1: inputfeild.email_id,
      email_id_2: email_id1,
    };
    console.log(res);
    let req = await axios.post(
      "https://server-labour.vercel.app/accept-reject-request",
      res
    );
    window.location.reload(false)
  };

  useEffect(() => {
    axios
      .get(
        `https://server-labour.vercel.app/get-requests-for-user/${sessionStorage.getItem(
          "username"
        )}`
      )
      .then((response) => {
        console.log(response.data);
        let temp = response.data;

        let arr = [];
        if (temp !== "No Jobs Posted")
          for (let i = 0; i < temp.length; i++) {
            arr.push(temp[i]);
          }

        setJobs(arr);
      })
      .catch((error) => {
        // console.log(error);
      });
  }, []);
  const [inputfeild, setFeild] = useState("");
  const onInputChange = (e) => {
    setFeild({ ...inputfeild, [e.target.name]: e.target.value });
  };

  return (
    <div>
      {jobs.length > 0 ? (
        jobs.map((item) => (
          <div key={item.job_id}>
            <Box
              bg="white"
              borderRadius="lg"
              boxShadow="lg"
              maxWidth="xl"
              width="100%"
              overflow="hidden"
              m="auto"
              transition="all 0.3s ease-in-out"
              _hover={{
                transform: "scale(1.02)",
                boxShadow: "2xl",
                cursor: "pointer",
              }}
            >
              <Box>
                <Box bg="gray.100" p={4}>
                  <Heading size="md" fontWeight="bold" color="gray.700">
                    {t('Job_ID')}
                  </Heading>
                  <Text fontSize="sm" mt={1} color="gray.600">
                    {item.job_id}
                  </Text>
                </Box>

                <Flex p={4} alignItems="center">
                  <Box>
                    <Heading fontSize="2xl" fontWeight="semibold">
                      {t('Username')}: {item.username}
                    </Heading>
                  </Box>
                  <Box ml="auto"></Box>
                </Flex>

                <Divider />

                <Stack p={4} direction={["column", "row"]} spacing={4}>
                  <Box>
                    <Text fontWeight="bold" color="gray.700">
                      {t('Salary')}:
                    </Text>
                    <Text color="gray.600">{item.salary}Rs</Text>
                  </Box>
                  <Box>
                    <Text fontWeight="bold" color="gray.700">
                      {t('Working Hours')}:
                    </Text>
                    <Text color="gray.600">{item.no_of_hours}Hr</Text>
                  </Box>
                  <Box></Box>
                </Stack>

                <Divider />
                <Box display={"flex"} justifyContent={"space-between"}>
                  <Popover placement="top">
                    <PopoverTrigger>
                      <Button
                        loadingText="Submitting"
                        size="lg"
                        bg={"black"}
                        color={"white"}
                        _hover={{
                          bg: "blue.500",
                        }}
                        width={"30%"}
                      >
                        {t('Accept')}
                      </Button>
                    </PopoverTrigger>

                    <PopoverContent boxSize="110%">
                      <PopoverArrow />

                      <PopoverCloseButton />

                      <PopoverBody>
                        <Box>
                          <Input
                            name="email_id"
                            onChange={(e) => onInputChange(e)}
                            type="email"
                            placeholder="Enter email"
                          />
                        </Box>
                        <Box display={"flex"} justifyContent={"space-between"}>
                          <Button
                            colorScheme="blue"
                            onClick={() =>
                              handleSubmit1(
                                item.job_id,
                                item.username,
                                item.phonenumber,
                                item.email_id
                              )
                            }
                          >
                            {t('Accept & Delete')}
                          </Button>

                          <Button
                            colorScheme="blue"
                            onClick={() =>
                              handleSubmit2(
                                item.job_id,
                                item.username,
                                item.phonenumber,
                                item.email_id
                              )
                            }
                          >
                            {t('Accept')}
                          </Button>
                        </Box>
                      </PopoverBody>
                    </PopoverContent>
                  </Popover>

                  <Button
                    loadingText="Submitting"
                    size="lg"
                    bg={"black"}
                    color={"white"}
                    _hover={{
                      bg: "blue.500",
                    }}
                    width={"30%"}
                    onClick={() =>
                      handleSubmit3(
                        item.job_id,
                        item.username,
                        item.phonenumber,
                        item.email_id
                      )
                    }
                  >
                    {t('Decline')}
                  </Button>
                </Box>
                <Divider />
              </Box>
            </Box>
          </div>
        ))
      ) : (
        <Box
          bg="white"
          borderRadius="lg"
          boxShadow="lg"
          maxWidth="xl"
          width="100%"
          overflow="hidden"
          m="auto"
          transition="all 0.3s ease-in-out"
          _hover={{
            transform: "scale(1.02)",
            boxShadow: "2xl",
            cursor: "pointer",
          }}
        >
          <Box bg="gray.100" p={4}>
            <Heading
              size="md"
              fontWeight="bold"
              color="gray.700"
              textAlign={"center"}
            >
              {t('No Requests Found')}
            </Heading>
          </Box>
        </Box>
      )}
    </div>
  );
};

export default GetRequest;
