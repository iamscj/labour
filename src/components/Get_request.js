import {
  Box,
  Flex,
  Heading,
  Text,
  
  Divider,
  Stack,
  Button
} from "@chakra-ui/react";
import { useParams } from "react-router-dom";
import React, { useState, useEffect } from "react";
import axios from "axios";


const GetRequest = () => {
  const [jobs, setJobs] = useState([]);
  
  useEffect(() => {
    
      axios
        .get(
          `https://server-labour.vercel.app/get-requests-for-user/${sessionStorage.getItem("username")}`
        )
        .then((response) => {
            console.log(response.data);
            let temp = response.data;

            let arr = [];
            if(temp!=="No Jobs Posted")
            for (let i = 0; i < temp.length; i++) {
              arr.push(temp[i]);
            }
    
            setJobs(arr);
        })
        .catch((error) => {
          // console.log(error);
        });
    
  }, []);

  return (
    <div>
      {jobs.length>0 ? (
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
                    Category: Job_ID
                  </Heading>
                  <Text fontSize="sm" mt={1} color="gray.600">
                    {item.job_id}
                  </Text>
                </Box>

                <Flex p={4} alignItems="center">
                  <Box>
                    <Heading fontSize="2xl" fontWeight="semibold">
                      Username: {item.username}
                    </Heading>
                  </Box>
                  <Box ml="auto"></Box>
                </Flex>

                <Divider />

                <Stack p={4} direction={["column", "row"]} spacing={4}>
                  <Box>
                    <Text fontWeight="bold" color="gray.700">
                      Salary:
                    </Text>
                    <Text color="gray.600">{item.salary}Rs</Text>
                  </Box>
                  <Box>
                    <Text fontWeight="bold" color="gray.700">
                      Working Hours:
                    </Text>
                    <Text color="gray.600">{item.no_of_hours}Hr</Text>
                  </Box>
                  <Box></Box>
                </Stack>

                <Divider />

                <Button
                    loadingText="Submitting"
                    size="lg"
                    bg={"black"}
                    color={"white"}
                    _hover={{
                      bg: "blue.500",
                    }}
                    width={"200px"}
                   
                  >
                    Accept
                  </Button>

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
              No Jobs Found
            </Heading>
            <Text fontSize="sm" mt={1} color="gray.600" textAlign={"center"}>
              Please Search Again
            </Text>
          </Box>
        </Box>
      )}
    </div>
  );
};

export default GetRequest;
