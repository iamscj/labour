import React, { useState } from 'react';
import {
  IconButton,
  Box,
  CloseButton,
  Flex,
  Icon,
  useColorModeValue,
  Link,
  Drawer,
  DrawerContent,
  Text,
  useDisclosure,
  Select

} from '@chakra-ui/react';
import {

  FiMenu,
} from 'react-icons/fi';






let SimpleSidebar = (props) => {
  //console.log(props);
  // props.onfiltervalueselect("ameyaa");

  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <Box minH="" bg={useColorModeValue('gray.100', 'gray.900')}>
      <SidebarContent
        pro={props.onfiltervalueselected}
        onClose={() => onClose}
        display={{ base: 'none', md: 'block' }}

      />
      <Drawer
        autoFocus={false}
        isOpen={isOpen}
        placement="left"
        onClose={onClose}
        returnFocusOnClose={false}
        onOverlayClick={onClose}
        size="full">
        <DrawerContent>
          <SidebarContent pro={props.onfiltervalueselected} onClose={onClose} />
        </DrawerContent>
      </Drawer>
      {/* mobilenav */}
      <MobileNav display={{ base: 'flex', md: 'none' }} onOpen={onOpen} />
      <Box ml={{ base: 0, md: 60 }} p="4">

      </Box>
    </Box>
  );
}

const inputss = {
  price: "no_price",
  hours: "no_hours"
};

const SidebarContent = ({ pro, onClose, ...rest }) => {
  const [filters, setfilters] = useState(inputss);


  function onFilterValueChange(e) {

    pro({ ...filters, [e.target.name]: e.target.value });
    setfilters({ ...filters, [e.target.name]: e.target.value });
  }
  // console.log(filters)
  return (
    <Box
      bg={useColorModeValue('white', 'gray.900')}
      borderRight="1px"
      borderRightColor={useColorModeValue('gray.200', 'gray.700')}
      w={{ base: 'full', md: 60 }}
      pos="fixed"
      h="full"
      {...rest}>
      <Flex h="20" alignItems="center" mx="8" justifyContent="space-between">
        <Text fontSize="2xl" fontFamily="monospace" fontWeight="bold">
          Logo
        </Text>
        <CloseButton display={{ base: 'flex', md: 'none' }} onClick={onClose} />
      </Flex>
      <Text fontSize="2xl" fontFamily="monospace" fontWeight="bold" textAlign={'center'}>Price</Text>
      <div>
        <Select
          onChange={onFilterValueChange}
          placeholder="Choose Feild"
          size="md"
          name="price"
        >
          <option value="all_price">All</option>
          <option value="1_price"> {'< 1000Rs'}</option>
          <option value="2_price">1000-2000Rs</option>
          <option value="3_price">2000-3000Rs</option>
          <option value="4_price">3000-4000Rs</option>
          <option value="5_price">{'>5000Rs'}</option>



        </Select>

      </div>

      <Text fontSize="2xl" fontFamily="monospace" fontWeight="bold" textAlign={'center'}>Hours</Text>
      <div>
        <Select
          onChange={onFilterValueChange}
          placeholder="Choose Feild"
          size="md"
          name="hours"
        >
          <option value="all_hr">All</option>
          <option value="1_hr"> {'< 1hr'}</option>
          <option value="2_hr">1-2hr</option>
          <option value="3_hr">2-3hr</option>

          <option value="4_hr">{'>3hr'}</option>



        </Select>

      </div>

    </Box>
  );
};


const NavItem = ({ icon, children, ...rest }) => {
  return (
    <Link href="#" style={{ textDecoration: 'none' }} _focus={{ boxShadow: 'none' }}>
      <Flex
        align="center"
        p="4"
        mx="4"
        borderRadius="lg"
        role="group"
        cursor="pointer"
        _hover={{
          bg: 'cyan.400',
          color: 'white',
        }}
        {...rest}>
        {icon && (
          <Icon
            mr="4"
            fontSize="16"
            _groupHover={{
              color: 'white',
            }}
            as={icon}
          />
        )}
        {children}
      </Flex>
    </Link>
  );
};


const MobileNav = ({ onOpen, ...rest }) => {
  return (
    <Flex
      ml={{ base: 0, md: 60 }}
      px={{ base: 4, md: 24 }}
      height="20"
      alignItems="center"
      bg={useColorModeValue('white', 'gray.900')}
      borderBottomWidth="1px"
      borderBottomColor={useColorModeValue('gray.200', 'gray.700')}
      justifyContent="flex-start"
      {...rest}>
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