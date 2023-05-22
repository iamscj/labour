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
import SimpleSidebar from "./Sidebar";
import { Button } from "@chakra-ui/react";
import { ArrowUpIcon } from "@chakra-ui/icons";



const EachJob = () => {
  const [jobs, setJobs] = useState([]);
  const [likedjobs, setLiked] = useState([]);
  const [countjobss, setcountjobs] = useState([]);
  const [countlikes, setcountlikes] = useState([]);
  const [renderpost, setrenderpost] = useState(0);
  const [filtered, setfiltered] = useState('no');

  const handleClick = async (job_id) => {
    await axios.post(
      `https://server-labour.vercel.app/like-dislike/${sessionStorage.getItem("username")}/${job_id}`
    );
    setrenderpost(!renderpost);
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
        `https://server-labour.vercel.app/get-liked-posts?username=${sessionStorage.getItem("username")}`
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
  function onfiltervalueselected(filtervalue) {
    //console.log(filtervalue);
    setfiltered(filtervalue);
  }
  console.log(filtered);
   const [filteredjobs,setfilteredjobs]=useState([]);
  useEffect(()=>{

    
      if(filtered==='no_price')
      {
        setfilteredjobs(jobs);
      }
      else if(filtered==='all_price')
      {
        setfilteredjobs(jobs);
      }
      else if(filtered==='1_price')
      {
        let arr1=[];
        for(let i=0;i<jobs.length;i++)
        {
            if(jobs[i].max_salary<1000)
            arr1.push(jobs[i]);
            setfilteredjobs(arr1);
        }

      }
      // else if(filtered.price==='2_price')
      // {
      //   let arr1=[];
      //   for(let i=0;i<jobs.length;i++)
      //   {
      //       if(jobs[i].max_salary<2000&&jobs[i].min_salary>1000)
      //       arr1.push(jobs[i]);
      //       setfilteredjobs(arr1);
      //   }

      // }
      // else if(filtered.price==='3_price')
      // {
      //   let arr1=[];
      //   for(let i=0;i<jobs.length;i++)
      //   {
      //       if(jobs[i].max_salary<3000&&jobs[i].min_salary>2000)
      //       arr1.push(jobs[i]);
      //       setfilteredjobs(arr1);
      //   }

      // }
      // else if(filtered.price==='4_price')
      // {
      //   let arr1=[];
      //   for(let i=0;i<jobs.length;i++)
      //   {
      //       if(jobs[i].max_salary<5000&&jobs[i].min_salary>4000)
      //       arr1.push(jobs[i]);
      //       setfilteredjobs(arr1);
      //   }

      // }
      // else if(filtered.price==='5_price')
      // {
      //   let arr1=[];
      //   for(let i=0;i<jobs.length;i++)
      //   {
      //       if(jobs[i].max_salary>5000)
      //       arr1.push(jobs[i]);
      //       setfilteredjobs(arr1);
      //   }
      // }

      

      // if(filtered.hours==='no_hr')
      // {
      //   setfilteredjobs(arr);
      // }
      // else if(filtered.hours==='all_hr')
      // {
      //   setfilteredjobs(arr);
      // }
      // else if(filtered.hours==='1_hr')
      // {
      //   let arr1=[]
      //   for(let i=0;i<arr.length;i++)
      //   {
      //       if(arr[i].working_hours<1)
      //       arr1.push(arr[i]);
      //       setfilteredjobs(arr1);
      //   }

      // }
      // else if(filtered.hours==='2_hr')
      // {
      //   let arr1=[];
      //   for(let i=0;i<arr.length;i++)
      //   {
      //       if(arr[i].working_hours<2&&arr[i].working_hours>1)
      //       arr1.push(arr[i]);
      //       setfilteredjobs(arr1);
      //   }

      // }
      // else if(filtered.hours==='3_hr')
      // {
      //   let arr1=[];
      //   for(let i=0;i<arr.length;i++)
      //   {
      //       if(arr[i].working_hours<3&&arr[i].working_hours>2)
      //       arr1.push(arr[i]);
      //       setfilteredjobs(arr1);
      //   }

      // }
      // else if(filtered.hours==='4_hr')
      // {
      //   let arr1=[];
      //   for(let i=0;i<arr.length;i++)
      //   {
      //       if(arr[i].working_hours>3)
      //       arr1.push(arr[i]);
      //       setfilteredjobs(arr1);
      //   }

      // }

  },[filtered]);

  console.log(filteredjobs);














  return (
    <div>
      <SimpleSidebar onfiltervalueselect={onfiltervalueselected} />
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
                    Category:{" "}
                    {item.field}
                  </Heading>
                  <Text fontSize="sm" mt={1} color="gray.600">
                    {item.job_id}
                  </Text>
                </Box>

                <Flex p={4} alignItems="center">
                  <Box>
                    <Heading fontSize="2xl" fontWeight="semibold">
                      Username:{" "}
                      {item.username}
                    </Heading>
                    <Text color="gray.500" fontSize="sm">
                    Location:{item.latitude},{item.longitude}</Text>
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
