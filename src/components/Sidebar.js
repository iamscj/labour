import React, { useState } from "react";
import {
  IconButton,
  Box,
  CloseButton,
  Flex,
  useColorModeValue,
  Drawer,
  DrawerContent,
  Text,
  useDisclosure,
  Select,
} from "@chakra-ui/react";
import { FiMenu } from "react-icons/fi";

let SimpleSidebar = ({ onfiltervalueselected, t }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <Box minH="" bg={useColorModeValue("gray.100", "gray.900")}>
      <SidebarContent
        pro={onfiltervalueselected}
        onClose={() => onClose}
        display={{ base: "none", md: "block" }}
        t={t}
      />
      <Drawer
        autoFocus={false}
        isOpen={isOpen}
        placement="left"
        onClose={onClose}
        returnFocusOnClose={false}
        onOverlayClick={onClose}
        size="full"
      >
        <DrawerContent>
          <SidebarContent pro={onfiltervalueselected} onClose={onClose} t={t} />
        </DrawerContent>
      </Drawer>
      {/* mobilenav */}
      <MobileNav display={{ base: "flex", md: "none" }} onOpen={onOpen} />
      <Box ml={{ base: 0, md: 60 }} p="4"></Box>
    </Box>
  );
};

const inputss = {
  price: "no_price",
  hours: "no_hours",
  distance: "no_distance",
};

const SidebarContent = ({ t = { t }, pro, onClose, ...rest }) => {
  const [filters, setfilters] = useState(inputss);

  function onFilterValueChange(e) {
    pro({ ...filters, [e.target.name]: e.target.value });
    setfilters({ ...filters, [e.target.name]: e.target.value });
  }
  // console.log(filters)
  return (
    <Box
      bg={useColorModeValue("white", "gray.900")}
      borderRight="1px"
      borderRightColor={useColorModeValue("gray.200", "gray.700")}
      w={{ base: "full", md: 60 }}
      pos="fixed"
      h="full"
      {...rest}
    >
      <Flex h="20" alignItems="center" mx="8" display={"flex"} justifyContent="center">
        <Text fontSize="2xl" fontFamily="monospace" fontWeight="bold">
            {t("Filter")}
        </Text>
        <CloseButton display={{ base: "flex", md: "none" }} onClick={onClose} />
      </Flex>
      <Text
        fontSize="2xl"
        fontFamily="monospace"
        fontWeight="bold"
        textAlign={"center"}
      >
        {t('Price')}
      </Text>
      <div>
        <Select
          onChange={onFilterValueChange}
          placeholder={t("Choose Feild")}
          size="md"
          name="price"
        >
          <option value="all_price">{t('All')}</option>
          <option value="1_price"> {"< 1000Rs"}</option>
          <option value="2_price">1000-2000Rs</option>
          <option value="3_price">2000-3000Rs</option>
          <option value="4_price">3000-4000Rs</option>
          <option value="5_price">{">5000Rs"}</option>
        </Select>
      </div>

      <Text
        fontSize="2xl"
        fontFamily="monospace"
        fontWeight="bold"
        textAlign={"center"}
      >
        {t('Hours')}
      </Text>
      <div>
        <Select
          onChange={onFilterValueChange}
          placeholder={t("Choose Feild")}
          size="md"
          name="hours"
        >
          <option value="all_hr">{t('All')}</option>
          <option value="1_hr"> {"< 1hr"}</option>
          <option value="2_hr">1-2hr</option>
          <option value="3_hr">2-3hr</option>

          <option value="4_hr">{">3hr"}</option>
        </Select>
      </div>

      <Text
        fontSize="2xl"
        fontFamily="monospace"
        fontWeight="bold"
        textAlign={"center"}
      >
        {t('Distance')}
      </Text>
      <div>
        <Select
          onChange={onFilterValueChange}
          placeholder={t("Choose Feild")}
          size="md"
          name="distance"
        >
          <option value="all_distance">{t('All')}</option>
          <option value="1_distance"> {"< 5km"}</option>
          <option value="2_distance">5-20km</option>
          <option value="3_distance">20-50km</option>

          <option value="4_distance">{">50km"}</option>
        </Select>
      </div>
    </Box>
  );
};

const MobileNav = ({ onOpen, ...rest }) => {
  return (
    <Flex
      ml={{ base: 0, md: 60 }}
      px={{ base: 4, md: 24 }}
      height="20"
      alignItems="center"
      bg={useColorModeValue("white", "gray.900")}
      borderBottomWidth="1px"
      borderBottomColor={useColorModeValue("gray.200", "gray.700")}
      justifyContent="flex-start"
      {...rest}
    >
      <IconButton
        variant="outline"
        onClick={onOpen}
        aria-label="open menu"
        icon={<FiMenu />}
      />

      <Text fontSize="2xl" ml="8" fontFamily="monospace" fontWeight="bold">
        Logo
      </Text>
    </Flex>
  );
};

export default SimpleSidebar;
