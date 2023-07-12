import {
  Box,
  FormControl,
  FormLabel,
  Input,
  Button,
  Grid,
  InputLeftAddon,
  InputGroup,
  Text,
  Select,
  useToast,
} from "@chakra-ui/react";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverHeader,
  PopoverBody,
  PopoverArrow,
  PopoverCloseButton,
} from "@chakra-ui/react";
import MapComponent from "./Search_map";

// import { useEffect } from "react";

const inputss = {
<<<<<<< HEAD
  username:sessionStorage.getItem("username"),
=======
  username: sessionStorage.getItem("username"),
>>>>>>> 30770f598ff8d09d643870cabe966b547752fc7a
  phonenumber: sessionStorage.getItem("phoneno"),
  field: "",
  max_salary: "",
  min_salary: "",
  expected_distance_range: "",
  working_hours: "",
  description: "",
  latitude: "",
  longitude: "",
};

function Post() {
  const [inputfeild, setFeild] = useState(inputss);
  console.log(inputss);

  const toast = useToast();
  const navigate = useNavigate();

  const onInputChange = (e) => {
    setFeild({ ...inputfeild, [e.target.name]: e.target.value });
  };

  const handleLocation = async (e) => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const latitude = position.coords.latitude;
          const longitude = position.coords.longitude;
          inputfeild.latitude = latitude;
          inputfeild.longitude = longitude;
          console.log("Latitude:", latitude);
          console.log("Longitude:", longitude);
        },
        (error) => {
          console.error("Error:", error.message);
        }
      );
    } else {
      console.error("Geolocation is not supported by this browser.");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(inputfeild);
    let res;
    try {
      res = await axios.post(
        "https://server-labour.vercel.app/create-job",
        inputfeild
      );

      if (res.data.error === "Check username") {
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
      console.log(res.data);
      toast({
        title: res,
        status: "error",
        duration: 4000,
        isClosable: true,
        position: "bottom",
      });
    }
    console.log(res.data.error);
  };

  return (
    <Box
      display="flex"
      alignItems="center"
      justifyContent="Center"
      marginTop={"4vh"}
      bg="linear-gradient(135deg, rgb(50, 70, 50), rgb(60, 90, 100))"
    >
      <Box width="650px" p={6} bg="white" boxShadow="lg" borderRadius="lg">
        <form>
          <Grid
            templateColumns="repeat(2, 1fr)"
            templateRows="repeat(3, 1fr)"
            gap={4}
            position="relative"
          >
            <FormControl gridColumn="span 2">
              <FormLabel color="gray.800" fontWeight="bold">
                Username
              </FormLabel>
              <Input
                type="text"
                name="username"
                borderRadius="md"
                bg=""
                _focus={{ borderColor: "black.500", bg: "" }}
                border={"none"}
                borderBottom={"1px"}
                value={sessionStorage.getItem("username")}
                required
              />
            </FormControl>

            <FormControl gridColumn="span 2">
              <FormLabel color="gray.800" fontWeight="bold">
                Phone No
              </FormLabel>
              <InputGroup>
                <InputLeftAddon children="+91" />
                <Input
                  onChange={(e) => onInputChange(e)}
                  type="number"
                  placeholder="phone number"
                  value={sessionStorage.getItem("phoneno")}
                  bg=""
                  name="phonenumber"
                  _focus={{ borderColor: "black.500", bg: "" }}
                  border={"none"}
                  borderBottom={"1px"}
                  required
                />
              </InputGroup>
            </FormControl>

            <FormControl gridColumn="span 2" isRequired>
              <FormLabel>Feild</FormLabel>
              <Select
                onChange={(e) => onInputChange(e)}
                placeholder="Choose Feild"
                size="md"
                name="field"
              >
                <option value="computer-service">Computer-Service</option>
                <option value="plumbing">Plumbing</option>
                <option value="housekeeping">Housekeeping</option>
                <option value="electrician"> Electrician </option>
                <option value="painting"> Painting</option>
                <option value="massage">Massage</option>
                <option value="restaurant">Restaurant</option>
                <option value="fitness">Fitness</option>
                <option value="golf course">Golf Course</option>
                <option value="music">Music</option>
                <option value="movie">Movie</option>
                <option value="camera">Camera</option>
                <option value="shopping">Shopping</option>
                <option value="event">Event</option>
                <option value="flight">Flight</option>
                <option value="shipping">Shipping</option>
                <option value="bussiness">Business</option>
                <option value="childcare">Childcare</option>
              </Select>
            </FormControl>

            <FormControl gridColumn="span 2" isRequired>
              <FormLabel color="gray.800" fontWeight="bold">
                Salary
              </FormLabel>

              <InputGroup>
                <InputLeftAddon children="min" />
                <Input
                  onChange={(e) => onInputChange(e)}
                  type="number"
                  name="min_salary"
                  borderRadius="md"
                  bg=""
                  placeholder="Salary In Rs"
                  _focus={{ borderColor: "black.500", bg: "" }}
                  border={"none"}
                  borderBottom={"1px"}
                  width={"50%"}
                />

                <InputLeftAddon children="max" />
                <Input
                  onChange={(e) => onInputChange(e)}
                  type="number"
                  name="max_salary"
                  borderRadius="md"
                  bg=""
                  placeholder="Salary In Rs"
                  _focus={{ borderColor: "black.500", bg: "" }}
                  border={"none"}
                  borderBottom={"1px"}
                  width={"50%"}
                />
              </InputGroup>
            </FormControl>

            <FormControl isRequired>
              <FormLabel color="gray.800" fontWeight="bold">
                Available Distance
              </FormLabel>
              <Input
                onChange={(e) => onInputChange(e)}
                type="number"
                name="expected_distance_range"
                borderRadius="md"
                placeholder="Distance Kms"
                _focus={{ borderColor: "purple.500", bg: "white" }}
                bg=""
                border={"none"}
                borderBottom={"1px"}
              />
            </FormControl>

            <FormControl isRequired>
              <FormLabel color="gray.800" fontWeight="bold">
                Available Hours
              </FormLabel>
              <Input
                onChange={(e) => onInputChange(e)}
                type="number"
                name="working_hours"
                borderRadius="md"
                placeholder="Hour"
                _focus={{ borderColor: "purple.500", bg: "white" }}
                bg=""
                border={"none"}
                borderBottom={"1px"}
              />
            </FormControl>

            <FormControl isRequired gridColumn="span 2">
              <FormLabel color="gray.800" fontWeight="bold">
                Description
              </FormLabel>
              <Input
                onChange={(e) => onInputChange(e)}
                type="text"
                name="description"
                borderRadius="md"
                placeholder="description"
                _focus={{ borderColor: "purple.500", bg: "white" }}
                bg=""
                border={"none"}
                borderBottom={"1px"}
              />
            </FormControl>

            <FormControl isRequired gridColumn="span 2">
              <FormLabel color="gray.800" fontWeight="bold">
                Location
              </FormLabel>
              <Box display={"flex"} justifyContent={"space-around"}>
                <Popover placement="top" closeOnBlur={false}>
                  <PopoverTrigger>
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
                      Select Location
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent>
                    <PopoverArrow />
                    <PopoverCloseButton />
                    <PopoverHeader>Select Your Location</PopoverHeader>
                    <PopoverBody>
                      <MapComponent setlat={setFeild} />
                    </PopoverBody>
                  </PopoverContent>
                </Popover>
                <Text textAlign={"center"} fontSize={"2xl"}>
                  OR
                </Text>
                <Button
                  loadingText="Submitting"
                  size="lg"
                  bg={"black"}
                  color={"white"}
                  _hover={{
                    bg: "blue.500",
                  }}
                  width={"200px"}
                  onClick={handleLocation}
                >
                  Current Location
                </Button>
              </Box>
            </FormControl>
          </Grid>

          <Button
            type="submit"
            colorScheme="red"
            mt={6}
            size="lg"
            width="100%"
            onClick={handleSubmit}
          >
            Submit
          </Button>
        </form>
      </Box>
    </Box>
  );
}
export default Post;