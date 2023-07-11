import {
  Box,
  Flex,
  Heading,
  Text,
  Badge,
  Divider,
  Stack,
} from "@chakra-ui/react";
import { useParams, useNavigate } from "react-router-dom";
import React, { useState, useEffect } from "react";
import axios from "axios";
import SimpleSidebar from "./Sidebar";
import { Button } from "@chakra-ui/react";
import { ArrowUpIcon } from "@chakra-ui/icons";

const EachJob = () => {
  const [jobs, setJobs] = useState([]);
  const [likedjobs, setLiked] = useState([]);
  const [countjobss, setcountjobs] = useState([]);
  const [countlikes, setcountlikes] = useState([]);
  const [renderpost, setrenderpost] = useState(0);
  const [filtered, setfiltered] = useState({
    price: "no_price",
    hours: "no_hours",
  });
  const navigate = useNavigate();
  const handleClick = async (job_id) => {
    await axios.post(
      `https://server-labour.vercel.app/like-dislike/${sessionStorage.getItem(
        "username"
      )}/${job_id}`
    );
    setrenderpost(!renderpost);
  };

  const handleRequest = (job_id) => {
    // console.log(job_id);
    navigate("/request", {
      state: {
        job: job_id,
      },
    });
  };

  useEffect(() => {
    axios
      .get("https://server-labour.vercel.app/get-like-count")
      .then((response) => {
        let temp = response.data;
        let arr = [];
        let arr1 = [];
        for (let i = 0; i < temp.length; i++) {
          arr.push(temp[i].job_id);
          arr1.push(temp[i].count);
        }
        setcountjobs(arr);
        setcountlikes(arr1);
      })
      .catch((error) => {
        //console.log(error);
      });
  }, [renderpost]);

  useEffect(() => {
    axios
      .get(
        `https://server-labour.vercel.app/get-liked-posts?username=${sessionStorage.getItem(
          "username"
        )}`
      )
      .then((response) => {
        console.log(response.data);
        let temp = response.data;
        let arr = [];

        for (let i = 0; i < temp.length; i++) {
          arr.push(temp[i].job_id);
        }

        setLiked(arr);
      })
      .catch((error) => {
        // console.log(error);
      });
  }, [renderpost]);

  let { field } = useParams();
  field = field.toLowerCase();
  useEffect(() => {
    if (field !== undefined) {
      axios
        .get(
          `https://server-labour.vercel.app/get-all-jobs-by-category/${field}`
        )
        .then((response) => {
          setJobs(response.data);
        })
        .catch((error) => {
          // console.log(error);
        });
    }
  }, [field]);
  // console.log(countlikes);
  // function onfiltervalueselected(filtervalue) {
  //   setfiltered(filtervalue);
  // }
  // useEffect(() => {
  //  let arr=[];
  //  let x=sessionStorage.getItem("latitude");
  //  let y=sessionStorage.getItem("longitude");
  //  console.log(x);
  //  console.log(y);
  //  for(let i=0;i<jobs.length;i++)
  //  {
  //      let xx=jobs[i].latitude;
  //      let yy=jobs[i].longitude;
  //      const radius = 6371;

  //      // Haversine formula
  //      const dlat =Math.abs( x - xx);
  //      const dlon = Math.abs(y - yy);
  //      const a = Math.sin(dlat / 2) ** 2 + Math.cos(x) * Math.cos(xx) * Math.sin(dlon / 2) ** 2;
  //      const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  //      const distance = radius * c;
  //      if(jobs[i].expected_distance_range>=distance)
  //      arr.push(jobs[i]);
  //  }
  //  console.log(arr);
  // //  setJobs(arr);
  // }, );
  //console.log(jobs);
  const [filteredjobs, setfilteredjobs] = useState([]);
  useEffect(() => {
    let arr = [];
    if (filtered.price === "no_price") {
      arr = jobs;
    } else if (filtered.price === "all_price") {
      arr = jobs;
    } else if (filtered.price === "1_price") {
      let arr1 = [];
      for (let i = 0; i < jobs.length; i++) {
        if (jobs[i].max_salary <= 1000) arr1.push(jobs[i]);
      }
      arr = arr1;
    } else if (filtered.price === "2_price") {
      let arr1 = [];

      for (let i = 0; i < jobs.length; i++) {
        if (jobs[i].min_salary >= 1000 && jobs[i].max_salary <= 2000)
          arr1.push(jobs[i]);
      }
      arr = arr1;
    } else if (filtered.price === "3_price") {
      let arr1 = [];
      for (let i = 0; i < jobs.length; i++) {
        if (jobs[i].max_salary > 2000 && jobs[i].max_salary < 3000)
          arr1.push(jobs[i]);
      }
      arr = arr1;
    } else if (filtered.price === "4_price") {
      let arr1 = [];
      for (let i = 0; i < jobs.length; i++) {
        if (jobs[i].max_salary > 4000 && jobs[i].max_salary < 5000)
          arr1.push(jobs[i]);
      }
      arr = arr1;
    } else if (filtered.price === "5_price") {
      let arr1 = [];
      for (let i = 0; i < jobs.length; i++) {
        if (jobs[i].max_salary > 5000) arr1.push(jobs[i]);
      }
      arr = arr1;
    }
    let arr2 = [];
    if (filtered.hours === "no_hours") {
      arr2 = jobs;
    } else if (filtered.hours === "all_hr") {
      arr2 = jobs;
    }
    if (filtered.hours === "1_hr") {
      let arr1 = [];
      for (let i = 0; i < jobs.length; i++) {
        if (jobs[i].working_hours < 1) arr1.push(jobs[i]);
      }
      arr2 = arr1;
    } else if (filtered.hours === "2_hr") {
      let arr1 = [];
      for (let i = 0; i < jobs.length; i++) {
        if (jobs[i].working_hours > 1 && jobs[i].working_hours < 2)
          arr1.push(jobs[i]);
      }
      arr2 = arr1;
    } else if (filtered.hours === "3_hr") {
      let arr1 = [];
      for (let i = 0; i < jobs.length; i++) {
        if (jobs[i].working_hours > 2 && jobs[i].working_hours < 3)
          arr1.push(jobs[i]);
      }
      arr2 = arr1;
    } else if (filtered.hours === "4_hr") {
      let arr1 = [];
      for (let i = 0; i < jobs.length; i++) {
        if (jobs[i].working_hours > 3) arr1.push(jobs[i]);
      }
      arr2 = arr1;
    }
    // console.log("hello",arr);

    // console.log("hi",arr2);
    let arr3 = [];
    for (let i = 0; i < arr.length; i++) {
      for (let j = 0; j < arr2.length; j++) {
        if (arr[i] === arr2[j]) {
          arr3.push(arr[i]);
          break;
        }
      }
    }
    setfilteredjobs(arr3);
  }, [filtered, jobs]);

  //console.log(filtered);

  return (
    <div>
      <SimpleSidebar onfiltervalueselected={setfiltered} />
      {filteredjobs.length ? (
        filteredjobs.map((item) => (
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
                    Category: {item.field}
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
                    <Text color="gray.500" fontSize="sm">
                      Location:{item.latitude},{item.longitude}
                    </Text>
                  </Box>
                  <Box ml="auto">
                    <Badge borderRadius="full" px="2" colorScheme="green">
                      Full-time
                    </Badge>
                  </Box>
                </Flex>

                <Divider />

                <Stack p={4} direction={["column", "row"]} spacing={4}>
                  <Box>
                    <Text fontWeight="bold" color="gray.700">
                      Salary:
                    </Text>
                    <Text color="gray.600">
                      {item.min_salary} - {item.max_salary}Rs
                    </Text>
                  </Box>
                  <Box>
                    <Text fontWeight="bold" color="gray.700">
                      Working Hours:
                    </Text>
                    <Text color="gray.600">{item.working_hours}Hr</Text>
                  </Box>
                  <Box>
                    <Text fontWeight="bold" color="gray.700">
                      Distance:
                    </Text>
                    <Text color="gray.600">
                      {item.expected_distance_range}Kms
                    </Text>
                  </Box>
                </Stack>

                <Divider />

                <Box p={4}>
                  <Text fontSize="sm" color="gray.600">
                    Job Description: {item.description}
                  </Text>
                </Box>
                <Divider />

                <Box p={4} display={"flex"} justifyContent={"right"}>
                  <Button
                    bg={
                      likedjobs.includes(item.job_id) ? "blue.200" : "gray.200"
                    }
                    aria-label="Call Segun"
                    size="sm"
                    onClick={() => handleClick(item.job_id)}
                    margin={"0px 20px 0px 0px"}
                  >
                    <ArrowUpIcon />
                  </Button>
                  <Box display={"flex"} margin={"0px 10px 0px 0px"}>
                    <Text fontWeight="bold">UpVotes:</Text>
                    <Text margin={"0px 0px 0px 5px"}>
                      {countjobss.indexOf(item.job_id) !== -1
                        ? countlikes[countjobss.indexOf(item.job_id)]
                        : 0}
                    </Text>
                  </Box>
                </Box>

                <Divider />

                <Box>
                  <Button
                    loadingText="Submitting"
                    size="lg"
                    bg={"black"}
                    color={"white"}
                    _hover={{
                      bg: "blue.500",
                    }}
                    width={"200px"}
                    onClick={() => handleRequest(item.job_id)}
                  >
                    Request
                  </Button>
                </Box>
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

export default EachJob;
