import React from "react";

import { Flex, Button, Text } from "@chakra-ui/react";

function TimeTasks({ task, timerOn, timerFunctions }) {
  return (
    <Flex
      key={task.id}
      onClick={timerFunctions}
      alignItems="center"
      justifyContent="space-between"
      bgColor="blackAlpha.500"
      p={2}
      m={1}
      borderRadius="12px"
      cursor="pointer"
      _active={{
        bg: "black",
      }}
      _hover={{
        bg: "black",
        color: "white",
        borderColor: "black",
        boxShadow: "0em 0em 0.1em 0.2em #ff006b",
      }}
      // bg="rgba(0, 0, 0, 0.4)"
      // variant="solid"

      // padding="0.5em"
      // fontSize={{ base: "100%", md: "120%" }}
      // color={color}
      // borderRadius="12px"
    >
      <Button
        isDisabled={timerOn && true}
        key={task.id}
        colorScheme="blackAlpha"
        m={1}
      >
        {task.name}
      </Button>
      <Text fontSize="1xl" pr={2}>
        {task.total.hours ? task.total.hours + "h" : ""}{" "}
        {task.total.minutes ? task.total.minutes + "m" : ""}{" "}
        {task.total.seconds ? task.total.seconds + "s" : ""}
      </Text>
    </Flex>
  );
}

export default TimeTasks;
