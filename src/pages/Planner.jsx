import React, { useState, useContext, useEffect } from "react";
import Calendar from "react-calendar";

import "./Planner.css";

import { CollectionContext } from "../context/CollectionContext";

import dayjs from "dayjs";
import duration from "dayjs/plugin/duration";
import customParseFormat from "dayjs/plugin/customParseFormat";
import isBetween from "dayjs/plugin/isBetween";
import utc from "dayjs/plugin/utc";
dayjs.extend(customParseFormat);
dayjs.extend(duration);
dayjs.extend(utc);
dayjs.extend(isBetween);

import { Flex, Container, Text } from "@chakra-ui/react";
import TaskSessions from "../components/planner/TaskSessions";
import RangeSelector from "../components/planner/RangeSelector";

function Planner() {
  const [value, onChange] = useState(new Date());
  const { taskTimes } = useContext(CollectionContext);
  const [dateSession, setDateSession] = useState([]);

  const [timeRange, setTimeRange] = useState({
    start: dayjs(value).format("YYYY-MM-DD") + " " + "00:00",
    end: dayjs(value).format("YYYY-MM-DD") + " " + "23:59",
  });

  const dateTimeRange = () => {
    const filterDateRange = taskTimes.map((task) => {
      const filter = task.sessions.filter((t) => {
        if (
          dayjs(t.startDate).isBetween(timeRange.start, timeRange.end) &&
          dayjs(t.stopDate).isBetween(timeRange.start, timeRange.end)
        ) {
          return t;
        }
      });
      return { task: task.name, total: task.total, sessions: filter };
    });
    setDateSession(filterDateRange);
  };

  useEffect(() => {
    dateTimeRange();
  }, [timeRange, taskTimes]);

  return (
    <Container
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
    >
      <Text
        fontSize="4xl"
        textAlign="center"
        color="pink.400"
        fontWeight="bolder"
      >
        Calendar
      </Text>
      <Calendar
        goToRangeStartOnSelect={true}
        selectRange={true}
        onChange={(e) => {
          onChange();

          if (e.length === 2) {
            setTimeRange({
              start:
                dayjs(e[0]).format("YYYY-MM-DD HH:mm").substring(0, 10) +
                timeRange.start.slice(10, 16),
              end:
                dayjs(e[1]).format("YYYY-MM-DD HH:mm").substring(0, 10) +
                timeRange.end.slice(10, 16),
            });
          }
        }}
        value={value}
      />
      <RangeSelector timeRange={timeRange} setTimeRange={setTimeRange} />
      <Flex
        flexDir="column"
        pt={2}
        gap={1}
        minW="90%"
        // maxHeight={{ base: "30vh" }}
        overflowY="scroll"
        scrollBehavior="smooth"
        css={{
          "&::-webkit-scrollbar": {
            display: "none",
          },
          "&::-webkit-scrollbar-track": {
            display: "none",
          },
          "&::-webkit-scrollbar-thumb": {
            display: "none",
          },
        }}
      >
        {dateSession &&
          dateSession.map(
            (session) =>
              session.sessions.length > 0 && <TaskSessions session={session} />
          )}
      </Flex>
    </Container>
  );
}

export default Planner;
