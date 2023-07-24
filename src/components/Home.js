import React, { useEffect } from "react";
import "animate.css";

import { Box, Center, Heading, Button, Flex } from "@chakra-ui/react";
import {
  MdComputer,
  MdBuild,
  MdHome,
  MdFlashOn,
  MdBrush,
  MdLocalHospital,
  MdRestaurant,
  MdFitnessCenter,
  MdGolfCourse,
  MdMusicNote,
  MdMovie,
  MdCamera,
  MdShoppingCart,
  MdEvent,
  MdFlight,
  MdLocalShipping,
  MdBusinessCenter,
  MdChildCare,
} from "react-icons/md";
import { useNavigate } from "react-router-dom";
import Navbar from "./Navbar";
import axios from "axios";

const AnimatedButton = ({ category, isLeft, navigate, t }) => (
  <Flex
    direction="column"
    align="center"
    mb="4"
    key={category.label}
    className={`animate__animated ${isLeft ? "animate__slideInLeft" : "animate__slideInRight"
      }`}
  >
    <Button
      size={{ base: "md", md: "lg" }}
      colorScheme={category.colorScheme}
      variant="solid"
      leftIcon={<category.icon />}
      onClick={() => navigate(`/findjob/${category.label}`)}
    >
      {t(category.label)}
    </Button>
  </Flex>
);
const categories = [
  {
    label: "Computer-Service",
    colorScheme: "blue",
    icon: MdComputer,
  },
  {
    label: "Plumbing",
    colorScheme: "teal",
    icon: MdBuild,
  },
  {
    label: "Housekeeping",
    colorScheme: "purple",
    icon: MdHome,
  },
  {
    label: "Electrician",
    colorScheme: "yellow",
    icon: MdFlashOn,
  },
  {
    label: "Painting",
    colorScheme: "green",
    icon: MdBrush,
  },
  {
    label: "Massage",
    colorScheme: "red",
    icon: MdLocalHospital,
  },
  {
    label: "Restaurant",
    colorScheme: "orange",
    icon: MdRestaurant,
  },
  {
    label: "Fitness",
    colorScheme: "pink",
    icon: MdFitnessCenter,
  },
  {
    label: "Golf-Course",
    colorScheme: "green",
    icon: MdGolfCourse,
  },
  {
    label: "Music",
    colorScheme: "purple",
    icon: MdMusicNote,
  },
  {
    label: "Movie",
    colorScheme: "red",
    icon: MdMovie,
  },
  {
    label: "Camera",
    colorScheme: "gray",
    icon: MdCamera,
  },
  {
    label: "Shopping",
    colorScheme: "pink",
    icon: MdShoppingCart,
  },
  {
    label: "Event",
    colorScheme: "blue",
    icon: MdEvent,
  },
  {
    label: "Flight",
    colorScheme: "teal",
    icon: MdFlight,
  },
  {
    label: "Shipping",
    colorScheme: "yellow",
    icon: MdLocalShipping,
  },
  {
    label: "Business",
    colorScheme: "purple",
    icon: MdBusinessCenter,
  },
  {
    label: "Childcare",
    colorScheme: "pink",
    icon: MdChildCare,
  },
];
const Home = ({ t }) => {
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

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const latitude = position.coords.latitude;
          const longitude = position.coords.longitude;
          sessionStorage.setItem("latitude", latitude);
          sessionStorage.setItem("longitude", longitude);
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
  });
  return (
    <>
      <Navbar t={t} />
      <Box
        p={{ base: "2", md: "10" }}
        bgGradient="linear(to-r, #1A202C, #2D3748)" // modified background gradient
        minH="90vh"
        display="flex"
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
        position="relative"
      >
        <Box
          position="absolute"
          top="0"
          left="0"
          h="100%"
          w="100%"
          bgGradient="linear(to-r, #1A202C, #2D3748)" // modified background gradient
          opacity="0.2"
          zIndex="-1"
        />

        <Box
          position="absolute"
          top="0"
          left="0"
          h="100%"
          w="100%"
          bgGradient="linear(to-r, #FC8181, #F56565)" // added flowing gradient
          opacity="0.4"
          animation="flowing-gradient 20s linear infinite"
          zIndex="-1"
        />

        <Center>
          <Heading
            mb={{ base: "4", md: "10" }}
            size={{ base: "3xl", md: "5xl" }}
            textAlign="center"
            color="white"
            textShadow="2px 2px 4px rgba(0, 0, 0, 0.4)"
            fontSize={{ base: "4xl", md: "5xl" }}
            animation="move-in 1s ease-in-out"
            bgGradient="linear(to-r, #FBBF24, #F87171)" // modified gradient
            bgClip="text"
          >
            {t("Find the Right Labour for Your Job...")}
          </Heading>
        </Center>

        <Flex
          flexWrap="wrap"
          justifyContent="space-around"
          alignItems="center"
          width="90vw"
        >
          {categories.slice(0, categories.length / 2).map((category) => (
            <AnimatedButton
              key={category.label}
              category={category}
              isLeft
              navigate={navigate}
              t={t}
            />
          ))}
          {categories.slice(categories.length / 2).map((category) => (
            <AnimatedButton
              key={category.label}
              category={category}
              navigate={navigate}
              t={t}
            />
          ))}
        </Flex>
      </Box>

      <style jsx="true">{`
        @keyframes flowing-gradient {
          0% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
          100% {
            background-position: 0% 50%;
          }
        }
        @keyframes move-in {
          from {
            transform: translateX(-100%);
          }
          to {
            transform: translateX(0);
          }
        }
      `}</style>
    </>
  );
};

export default Home;
