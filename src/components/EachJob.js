import {
    Box,
    Flex,
    Heading,
    Text,
    Badge,
    Divider,
    Stack,
} from "@chakra-ui/react";
import { useParams } from "react-router-dom";
import React, { useState, useEffect } from "react";
import axios from "axios";

const EachJob = () => {
    const [jobs, setJobs] = useState({});

    let { field } = useParams();
    field = field.toLowerCase();
    useEffect(() => {
        if (field !== undefined) {
            axios.get(`https://server-labour.vercel.app/get-all-jobs-by-category/${field}`)
                .then(response => {
                    setJobs(response.data);
                })
                .catch(error => {
                    console.log(error);
                });
        }
    }, [field]);
    console.log(jobs)
    return (
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
                        Category
                    </Heading>
                    <Text fontSize="sm" mt={1} color="gray.600">
                        Description
                    </Text>
                </Box>

                <Flex p={4} alignItems="center">
                    <Box>
                        <Heading fontSize="2xl" fontWeight="semibold">
                            Username
                        </Heading>
                        <Text color="gray.500" fontSize="sm">
                            Location
                        </Text>
                    </Box>
                    <Box ml="auto">
                        <Badge borderRadius="full" px="2" colorScheme="green">
                            Full-Time
                        </Badge>
                    </Box>
                </Flex>

                <Divider />

                <Stack p={4} direction={["column", "row"]} spacing={4}>
                    <Box>
                        <Text fontWeight="bold" color="gray.700">
                            Salary:
                        </Text>
                        <Text color="gray.600">1000 - 2000$</Text>
                    </Box>
                    <Box>
                        <Text fontWeight="bold" color="gray.700">
                            Working Hours:
                        </Text>
                        <Text color="gray.600">9:00am - 5:00pm</Text>
                    </Box>
                    <Box>
                        <Text fontWeight="bold" color="gray.700">
                            Distance:
                        </Text>
                        <Text color="gray.600">5km</Text>
                    </Box>
                </Stack>

                <Divider />

                <Box p={4}>
                    <Text fontSize="sm" color="gray.600">
                        Job Description: Lorem ipsum dolor sit amet, consectetur adipiscing
                        elit. Proin tincidunt velit quis velit dapibus, vel bibendum magna
                        semper. Pellentesque lobortis consequat interdum.
                    </Text>
                </Box>
            </Box>
        </Box>
    );
};

export default EachJob;
