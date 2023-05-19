import { Box, IconButton, useDisclosure, Collapse, Flex } from "@chakra-ui/react";
import { HamburgerIcon, CloseIcon } from "@chakra-ui/icons";
import { useState } from "react";

const Sidebar = () => {
  const { isOpen, onToggle } = useDisclosure();
  const [isCollapsed, setCollapsed] = useState(false);

  const handleToggleCollapse = () => {
    setCollapsed(!isCollapsed);
  };

  return (
    <Flex>
      <IconButton
        icon={isCollapsed ? <HamburgerIcon /> : <CloseIcon />}
        onClick={() => {
          handleToggleCollapse();
          onToggle();
        }}
        aria-label={isCollapsed ? "Open sidebar" : "Close sidebar"}
        variant="outline"
        display={{ base: "block", md: "none" }}
        zIndex={10}
        position="fixed"
        top={4}
        left={4}
      />

      <Collapse in={!isCollapsed} animateOpacity>
        <Flex
          direction="column"
          width={{ base: "full", md: "1/3" }}
          bg="gray.200"
          p={4}
          color="gray.700"
          position="fixed"
          top={0}
          bottom={0}
          left={0}
          zIndex={9}
          boxShadow="md"
          display={{ base: isOpen ? "block" : "none", md: "block" }}
        >
          <div>gdiugsfiuhew</div>
        </Flex>
      </Collapse>

      {!isCollapsed && (
        <Box
          as="div"
          position="fixed"
          top={0}
          left={0}
          right={0}
          bottom={0}
          bg="rgba(0, 0, 0, 0.3)"
          onClick={() => {
            handleToggleCollapse();
            onToggle();
          }}
          zIndex={8}
          display={{ base: isOpen ? "block" : "none", md: "none" }}
        />
      )}
    </Flex>
  );
};

export default Sidebar;
