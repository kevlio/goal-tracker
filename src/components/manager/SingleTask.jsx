import { useState, useContext } from "react";
import * as api_ta from "../../api/task";
import { CollectionContext } from "../../context/CollectionContext";

import TaskForm from "./TaskForm";
import InputModal from "./InputModal";

import { Flex, Text, Box, useDisclosure } from "@chakra-ui/react";
import { BsThreeDotsVertical, BsCheck2Square } from "react-icons/bs";
import { RiDeleteBackLine } from "react-icons/ri";

function SingleTask({ task }) {
  const { getTasks, loggedUser } = useContext(CollectionContext);
  const [edit, setEdit] = useState(false);
  const { isOpen, onOpen, onClose } = useDisclosure();

  const deleteTask = async (id) => {
    await api_ta.deleteTask(id);
    await getTasks(loggedUser.id);
  };

  const completeTask = async (id, status) => {
    await api_ta.completeTask(id, status);
    await getTasks(loggedUser.id);
  };

  return (
    <>
      <Flex
        borderBottom="0.2px solid white"
        borderRadius="6px"
        textDecor={task.isDone && "line-through"}
        gap={4}
        flexDir="row"
        justifyContent="space-between"
        padding="0.5em"
        alignItems="center"
      >
        <Flex gap={2}>
          <Box width="10px" bgColor={task.color}></Box>
          <Flex flexDir="column">
            <Text>{task.name}</Text>
            <Text>{task.deadline}</Text>
            {/* <Text fontWeight="bold">{task.project}</Text> */}
          </Flex>
        </Flex>
        <Flex gap={2} alignItems="center">
          <RiDeleteBackLine
            size={30}
            color="red"
            onClick={() => deleteTask(task.id)}
          />
          <BsCheck2Square
            color="green"
            size={30}
            onClick={() => completeTask(task.id, !task.isDone)}
          />
          <BsThreeDotsVertical
            size={40}
            onClick={() => {
              onOpen();
              setEdit(true);
            }}
          />
        </Flex>
      </Flex>
      <InputModal
        task={task}
        onOpen={onOpen}
        isOpen={isOpen}
        onClose={() => {
          onClose();
        }}
      >
        <TaskForm editTask={task} setEdit={setEdit} />
      </InputModal>
    </>
  );
}

export default SingleTask;
