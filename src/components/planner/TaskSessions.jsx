import React from "react";
import { Flex, Text } from "@chakra-ui/react";
import { TbSum } from "react-icons/tb";
import { CgGoogleTasks } from "react-icons/cg";
import dayjs from "dayjs";
import duration from "dayjs/plugin/duration";
dayjs.extend(duration);

function TaskSessions({ session }) {
  return (
    <Flex
      bgColor="blackAlpha.600"
      flexDir="column"
      padding={2}
      margin={2}
      borderRadius="12px"
      border="1px solid"
      borderColor="purple.800"
      borderBottom="2px solid"
      borderBottomColor="purple.500"
      cursor="pointer"
      _hover={{
        bg: "black",
        color: "white",
        borderColor: "black",
        boxShadow: "0em 0em 0.1em 0.2em #ff006b",
      }}
    >
      <Flex gap={2} fontSize="1xl" color="blue.400" alignItems="center">
        <CgGoogleTasks color="purple" />
        <Text>{session.task}</Text>
        <TbSum color="purple" size={25} />
        <Text>
          {dayjs
            .duration({
              hours: session.total.hours,
              minutes: session.total.minutes,
              seconds: session.total.seconds,
            })
            .format("HH:mm:ss")}
        </Text>
      </Flex>
      <Flex gap={1} wrap="wrap">
        {session.sessions.map((log) => (
          <Flex
            gap={2}
            border="1px solid"
            borderRadius="6px"
            borderColor="purple.800"
            px={1}
          >
            <Text color="pink.300">{log.duration}</Text>
            <Text color="pink.400">
              | {dayjs(log.startDate).format("H:mm")} -{" "}
              {dayjs(log.stopDate).format("H:mm")}
            </Text>
          </Flex>
        ))}
      </Flex>
    </Flex>
  );
}

export default TaskSessions;
