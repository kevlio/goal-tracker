import { useState } from "react";
import TaskList from "../components/manager/TaskList";
import ProjectList from "../components/manager/ProjectList";
import TaskForm from "../components/manager/TaskForm";
import ProjectForm from "../components/manager/ProjectForm";
import InputModal from "../components/manager/InputModal";

import { Flex, Container, Button, Text, useDisclosure } from "@chakra-ui/react";

function Manager() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [mode, setMode] = useState("project");

  return (
    <Container>
      <Flex flexDir="column" gap="0.5em">
        <Text
          fontSize="4xl"
          textAlign="center"
          color="pink.400"
          fontWeight="bolder"
        >
          Manage {mode}s
        </Text>
        <Flex gap="0.5em">
          <Button
            value="project"
            onClick={(e) => setMode(e.target.value)}
            color={"project" === mode && "green.400"}
            width="50%"
            bgColor="rgba(255, 255, 255, 0.08)"
          >
            Projects
          </Button>
          <Button
            value="task"
            onClick={(e) => setMode(e.target.value)}
            color={"task" === mode && "green.400"}
            width="50%"
            bgColor="rgba(255, 255, 255, 0.08)"
          >
            Tasks
          </Button>
        </Flex>
        <Button onClick={onOpen} bgColor="rgba(255, 255, 255, 0.08)">
          Add {mode}
        </Button>
      </Flex>
      <InputModal mode={mode} onOpen={onOpen} isOpen={isOpen} onClose={onClose}>
        {mode === "project" ? <ProjectForm /> : <TaskForm />}
      </InputModal>
      {mode === "project" ? <ProjectList /> : <TaskList />}
    </Container>
  );
}

export default Manager;
