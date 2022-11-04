import React from "react";

import { Flex, Text, Input } from "@chakra-ui/react";

import dayjs from "dayjs";

function RangeSelector({ timeRange, setTimeRange }) {
  return (
    <Flex
      gap={2}
      flexDir={{ base: "column", sm: "row" }}
      color="gray.200"
      minW="90%"
      px="1em"
      justifyContent={{ md: "center" }}
    >
      <Flex
        gap={2}
        flexDir={{ base: "row", sm: "column" }}
        alignItems={{ base: "center", sm: "flex-start" }}
      >
        <Text minW="15%">Start</Text>
        <Input
          backgroundColor="blackAlpha.700"
          borderColor="purple.800"
          borderRadius="6px"
          name="start"
          onChange={(e) =>
            setTimeRange((prevValues) => {
              return {
                ...prevValues,
                start: dayjs(e.target.value).format("YYYY-MM-DD HH:mm"),
              };
            })
          }
          placeholder="Select Date and Time"
          size="sm"
          type="datetime-local"
          value={timeRange.start}
        />
      </Flex>
      <Flex
        gap={2}
        flexDir={{ base: "row", sm: "column" }}
        alignItems={{ base: "center", sm: "flex-start" }}
      >
        <Text minW="15%">End</Text>
        <Input
          backgroundColor="blackAlpha.700"
          borderColor="purple.800"
          borderRadius="6px"
          onChange={(e) =>
            setTimeRange((prevValues) => {
              return {
                ...prevValues,
                end: dayjs(e.target.value).format("YYYY-MM-DD HH:mm"),
              };
            })
          }
          value={timeRange.end}
          name="end"
          placeholder="Select Date and Time"
          size="sm"
          type="datetime-local"
        />
      </Flex>
    </Flex>
  );
}

export default RangeSelector;
