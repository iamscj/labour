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
import LoadingSpinner from "./Loading";

const EachJob = ({ t }) => {
  const [jobs, setJobs] = useState([]);
  const [likedjobs, setLiked] = useState([]);
  const [countjobss, setcountjobs] = useState([]);
  const [countlikes, setcountlikes] = useState([]);
  const [renderpost, setrenderpost] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  const [filteredjobs, setfilteredjobs] = useState([]);
  const [filtered, setfiltered] = useState({
    price: "all_price",
    hours: "all_hr",
    distance: "all_distance",
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
    setIsLoading(true);
    if (field !== undefined) {
      axios
        .get(
          `https://server-labour.vercel.app/get-all-jobs-by-category/${field}`
        )
        .then((response) => {
          setJobs(response.data);
          setIsLoading(false);
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

  const [updatejobs, setUpdatejobs] = useState([]);
  const ff = (lat1, lon1, lat2, lon2) => {

    const R = 6371e3; // metres
    const φ1 = lat1 * Math.PI / 180; // φ, λ in radians
    const φ2 = lat2 * Math.PI / 180;
    const Δφ = (lat2 - lat1) * Math.PI / 180;
    const Δλ = (lon2 - lon1) * Math.PI / 180;

    const a = Math.sin(Δφ / 2) * Math.sin(Δφ / 2) +
      Math.cos(φ1) * Math.cos(φ2) *
      Math.sin(Δλ / 2) * Math.sin(Δλ / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

    const d = R * c; // in metres
    console.log("ameya ", d)
    return d / 1000;
  };


  useEffect(() => {
    const xUser = sessionStorage.getItem("latitude");
    const yUser = sessionStorage.getItem("longitude");
    console.log("shfdshfkdsjb")
    console.log(xUser);
    console.log(yUser);
    let arr = jobs;
    let i = 0;
    if(jobs.length>0){
    const updatedJobs = jobs.map((job) => {
      const xx = job.latitude;
      const yy = job.longitude;
      const distance = ff(xUser, yUser, xx, yy);
      arr[i].expected_distance_range = distance;
      console.log(arr.expected_distance_range)
      i++;
    });}
    // for (let i = 0; i < arr.length; i++) {
    //   console.log(arr[i])
    // }
    setUpdatejobs(arr);
    console.log("hiiii", updatejobs);
  }, [jobs]);

  //console.log(jobs);
  useEffect(() => {
    let arr = [];
    if (filtered.price === '') {
      arr = jobs;
    } 
    else if (filtered.price === 'no_price') {
      arr = jobs;
    } 
    else if (filtered.price === "all_price") {
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
    if (filtered.hours ==='') {
      arr2 = jobs;
    } 
    else if (filtered.hours ==="no_hours") {
      arr2 = jobs;
    } 
    else if (filtered.hours === "all_hr") {
      arr2 = jobs;
    }
    else if (filtered.hours === "1_hr") {
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
    if (filtered.distance === '') {
      arr3 = updatejobs;
    } 
    else if (filtered.distance === 'no_distance') {
      arr3 = updatejobs;
    } 
    else if (filtered.distance === "all_distance") {
      arr3 = updatejobs;
    }
    else if (filtered.distance === "1_distance") {
      let arr1 = [];
      for (let i = 0; i < updatejobs.length; i++) {
        if (updatejobs[i].expected_distance_range < 5) arr1.push(jobs[i]);
      }
      arr3 = arr1;
    } else if (filtered.distance === "2_distance") {
      let arr1 = [];
      for (let i = 0; i < updatejobs.length; i++) {
        if (updatejobs[i].expected_distance_range > 5 && updatejobs[i].expected_distance_range < 20) arr1.push(jobs[i]);
      }
      arr3 = arr1;
    } else if (filtered.distance === "3_distance") {
      let arr1 = [];
      for (let i = 0; i < updatejobs.length; i++) {
        if (updatejobs[i].expected_distance_range > 20 && updatejobs[i].expected_distance_range < 50) arr1.push(jobs[i]);
      }
      arr3 = arr1;
    } else if (filtered.distance === "4_distance") {
      let arr1 = [];
      for (let i = 0; i < updatejobs.length; i++) {
        if (updatejobs[i].expected_distance_range > 50) arr1.push(jobs[i]);
      }
      arr3 = arr1;
    }
    let arr4 = [];
    console.log(arr);
    console.log(arr2);
    console.log(arr3);
    console.log(jobs);
    for (let i = 0; i < arr.length; i++) {
      for (let j = 0; j < arr2.length; j++) {
        if (arr[i].job_id === arr2[j].job_id) {
          for (let k = 0; k < arr3.length; k++) {
            if (arr3[k].job_id === arr2[j].job_id) {
              arr4.push(arr[i]);
              break;
            }
          }
        }
      }
    }
    console.log(arr4);
    setfilteredjobs(arr4);
  }, [filtered, jobs]);

  console.log(filtered);
  const renderUser = (
    <div>
      <SimpleSidebar onfiltervalueselected={setfiltered} t={t} />
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
                    {t('Category')} : {item.field}
                  </Heading>
                  <Text fontSize="sm" mt={1} color="gray.600">
                  {t('Job_ID')} :{item.job_id}
                  </Text>
                </Box>

                <Flex p={4} alignItems="center">
                  <Box>
                    <Heading fontSize="2xl" fontWeight="semibold">
                      {t('Username')}: {item.username}
                    </Heading>
                    <Text color="gray.500" fontSize="sm">
                      {t('Latitude')}:{Math.round(item.latitude * 100) / 100}, {t('Longitude')}:{Math.round(item.longitude * 100) / 100}
                    </Text>
                  </Box>
                  <Box ml="auto">
                    <Badge borderRadius="full" px="2" colorScheme="green">
                      {t('Full-time')}
                    </Badge>
                  </Box>
                </Flex>

                <Divider />

                <Stack p={4} direction={["column", "row"]} spacing={4}>
                  <Box>
                    <Text fontWeight="bold" color="gray.700">
                      {t('Salary')}:
                    </Text>
                    <Text color="gray.600">
                      {item.min_salary} - {item.max_salary}Rs
                    </Text>
                  </Box>
                  <Box>
                    <Text fontWeight="bold" color="gray.700">
                      {t('Working Hours')}:
                    </Text>
                    <Text color="gray.600">{item.working_hours}Hr</Text>
                  </Box>
                  <Box>
                    <Text fontWeight="bold" color="gray.700">
                      {t('Distance')}:
                    </Text>
                    <Text color="gray.600">
                    {Math.round(item.expected_distance_range * 100) / 100}Kms
                      
                    </Text>
                  </Box>
                </Stack>

                <Divider />

                <Box p={4}>
                  <Text fontSize="sm" color="gray.600">
                    {t('Job Description')}: {item.description}
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
                    <Text fontWeight="bold">{t('UpVotes')}:</Text>
                    <Text margin={"0px 0px 0px 5px"}>
                      {countjobss.indexOf(item.job_id) !== -1
                        ? countlikes[countjobss.indexOf(item.job_id)]
                        : 0}
                    </Text>
                  </Box>
                </Box>

                <Divider />

                <Box display={"flex"} justifyContent={"center"}>
                  <Button
                    loadingText="Submitting"
                    size="lg"
                    bg={"black"}
                    color={"white"}
                    _hover={{
                      bg: '#808080',
                    }}
                    width={"200px"}
                    mt="10px"
                    mb="10px"
                    onClick={() => handleRequest(item.job_id)}
                  >
                    {t('Request')}
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
              {t('No Jobs Found')}
            </Heading>
            <Text fontSize="sm" mt={1} color="gray.600" textAlign={"center"}>
              {t('Please Search Again')}
            </Text>
          </Box>
        </Box>
      )}
    </div>
  );

  return <div>{isLoading ? <LoadingSpinner /> : renderUser}</div>;
};

export default EachJob;
