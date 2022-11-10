import React, {
  useState,
  useEffect,
  useReducer,
  useContext,
  useRef,
} from "react";
import { CollectionContext } from "../context/CollectionContext";
import { timeReducer, initialState } from "../reducer/timeReducer";
import * as api_ti from "../api/time";

import { RiDeleteBackLine } from "react-icons/ri";

import { Flex, Container, Text, useDisclosure } from "@chakra-ui/react";

import dayjs from "dayjs";
import duration from "dayjs/plugin/duration";
import utc from "dayjs/plugin/utc";
dayjs.extend(duration);
dayjs.extend(utc);

import { useLocation } from "react-router-dom";

import { Timer } from "timer-node";
import TimeTasks from "../components/timer/TimeTasks";
import TimerPanel from "../components/timer/TimerPanel";

function TaskTimer() {
  const [state, dispatch] = useReducer(timeReducer, initialState);
  const { getTimes, taskTimes, loggedUser } = useContext(CollectionContext);
  const [sessionBackup, setSessionBackup] = useState(() => {
    const localData = localStorage.getItem("currentTimer");
    return localData ? JSON.parse(localData) : "";
  });
  const { isOpen, onToggle } = useDisclosure();

  let location = useLocation();

  const [taskTimer, setTaskTimer] = useState({
    id: "",
    name: "",
    sessions: [],
  });

  const timer = useRef(new Timer());
  const intervalRef = useRef();

  const saveBackUpSession = () => {
    localStorage.setItem("currentTimer", JSON.stringify({ state, taskTimer }));
  };

  useEffect(() => {
    if (location.pathname === "/") return;
    saveBackUpSession();
  }, [location]);

  window.onbeforeunload = function () {
    saveBackUpSession();
  };
  window.onunload = function () {
    saveBackUpSession();
  };

  useEffect(() => {
    if (sessionBackup) {
      const timeNow = dayjs();
      const backupStartDate = dayjs(sessionBackup.state.startDate);
      const backupDuration = dayjs.duration(timeNow.diff(backupStartDate))[
        "$ms"
      ];

      setTaskTimer(sessionBackup.taskTimer);
      dispatch({
        type: "backup",
        backupStartDate: sessionBackup.state.startDate,
        formattedDuration: sessionBackup.state.timerOn
          ? ""
          : sessionBackup.state.formattedDuration,
        backupDuration: sessionBackup.state.timerOn
          ? backupDuration
          : sessionBackup.state.duration,
      });
      if (sessionBackup.state.timerOn) handleStart();
      else onToggle();
    } else {
      const filterSessions = taskTimes.filter((task) => {
        return task.id === taskTimer?.id;
      });
      setTaskTimer(...filterSessions);
    }
  }, [taskTimes]);

  useEffect(() => {
    handleTick();
    return () => clearInterval(intervalRef.current);
  }, [state.timerOn]);

  const handleStart = () => {
    if (isOpen) onToggle();
    if (!state.duration) timer.current.start();
    else if (state.duration) timer.current.resume();

    let startDate;
    if (!state.startDate) {
      startDate = dayjs();
    }
    if (state.startDate) {
      startDate = state.startDate;
    }
    if (sessionBackup?.state?.startDate) {
      startDate = sessionBackup.state.startDate;
    }

    dispatch({
      type: "start",
      userId: loggedUser.id,
      taskId: taskTimer.id,
      projectId: taskTimer.projectId,
      startDate: startDate,
    });
  };

  const handleTick = () => {
    if (!state.timerOn) return;
    const id = setInterval(() => {
      const duration = !sessionBackup
        ? timer.current.ms()
        : timer.current.ms() + state?.backupDuration;

      const formattedDuration = dayjs(duration).utc().format("HH:mm:ss");
      dispatch({
        type: "tick",
        duration,
        formattedDuration,
      });
    }, 1000);
    intervalRef.current = id;
  };

  const handleStop = () => {
    timer.current.pause();
    dispatch({
      type: "stop",
      stopDate: dayjs(),
    });
    if (!isOpen) onToggle();
  };

  const handleReset = () => {
    timer.current.clear();
    dispatch({ type: "reset" });
    localStorage.setItem("currentTimer", "");
    setSessionBackup("");
  };

  const handleSave = async () => {
    timer.current.clear();
    dispatch({ type: "reset" });
    await api_ti.addTime(state);
    await getTimes(loggedUser.id);

    localStorage.setItem("currentTimer", "");
    setSessionBackup("");
  };

  const deleteTime = async (id) => {
    await api_ti.deleteTime(id);
    await getTimes(loggedUser.id);
  };

  return (
    <Container>
      <Flex flexDir="column" alignItems="center">
        <Text
          fontSize={{ base: "3xl", md: "4xl" }}
          textAlign="center"
          color="pink.400"
          fontWeight="bolder"
        >
          {state.timerOn
            ? `Let's go ${loggedUser?.username}!`
            : `Ready for a session ${loggedUser?.username}?`}
        </Text>
        <Flex
          fontSize="4xl"
          textAlign="center"
          color="blue.400"
          fontWeight="700"
          flexDir="column"
        >
          <Text color="green.200">{taskTimer?.name}</Text>
          <Text>{state.formattedDuration}</Text>
        </Flex>
        {taskTimer?.id && (
          <Flex alignItems="center" flexDir="column" pb={2}>
            <TimerPanel
              handleStart={handleStart}
              handleStop={handleStop}
              handleReset={handleReset}
              handleSave={handleSave}
              isOpen={isOpen}
              onToggle={onToggle}
              timerOn={state.timerOn}
            />
            <Text fontSize="2xl" color="gray.300" letterSpacing="wide">
              Total:
              {taskTimer.total.hours ? taskTimer.total.hours + "h" : ""}{" "}
              {taskTimer.total.minutes ? taskTimer.total.minutes + "m" : ""}{" "}
              {taskTimer.total.seconds ? taskTimer.total.seconds + "s" : ""}
            </Text>
            <Flex
              flexDir="row"
              gap={1}
              wrap="wrap"
              justifyContent="flex-start"
              pb={2}
              // maxH="5em"
              // overflowY="scroll"
              // scrollBehavior="smooth"
            >
              {taskTimer.sessions?.reverse().map((sess) => (
                <Flex alignItems="center" gap={1} key={sess.id}>
                  <RiDeleteBackLine
                    onClick={() => deleteTime(sess.id, sess.taskId)}
                    size={25}
                    color="red"
                  />
                  <Text fontSize="1xl" minW="70px" color="gray.200">
                    {sess.duration}
                  </Text>
                </Flex>
              ))}
            </Flex>
          </Flex>
        )}
        {!taskTimer?.id && (
          <Text fontSize="2xl" color="pink.300">
            Select a task
          </Text>
        )}
        <Flex
          flexDir="column"
          minWidth="100%"
          // maxHeight={{ base: "50vh" }}
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
          {taskTimes &&
            taskTimes.map((task) => (
              <TimeTasks
                key={task.id}
                task={task}
                timerOn={state.timerOn}
                timerFunctions={() => {
                  setTaskTimer(task);
                  dispatch({ type: "reset" });
                  handleReset();
                }}
              />
            ))}
        </Flex>
      </Flex>
    </Container>
  );
}

export default TaskTimer;
