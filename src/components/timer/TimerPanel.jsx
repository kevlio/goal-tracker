import React from "react";

import { Flex, Button, Collapse } from "@chakra-ui/react";

import { BiStop } from "react-icons/bi";
import { VscDebugStart, VscDebugRestart } from "react-icons/vsc";
import { HiSaveAs } from "react-icons/hi";

function TimerPanel({
  handleStart,
  handleStop,
  handleReset,
  handleSave,
  isOpen,
  onToggle,
  timerOn,
}) {
  return (
    <Flex alignItems="center" flexDir="column">
      <Flex flexDir="row" alignItems="center" position="relative">
        <VscDebugStart size={40} onClick={handleStart} />
        <BiStop
          size={50}
          onClick={() => {
            if (timerOn) handleStop();
          }}
        />
        <VscDebugRestart size={30} onClick={handleReset} />
      </Flex>
      <Collapse in={isOpen}>
        <Button
          mr="0"
          colorScheme="blackAlpha"
          alignSelf="end"
          minW="50%"
          onClick={() => {
            handleSave();
            onToggle();
          }}
          leftIcon={<HiSaveAs />}
          mx={2}
        >
          Save
        </Button>
      </Collapse>
    </Flex>
  );
}

export default TimerPanel;
