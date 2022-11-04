import { useState, useContext } from "react";
import * as api_pr from "../../api/project";
import { CollectionContext } from "../../context/CollectionContext";

import ProjectForm from "./ProjectForm";
import InputModal from "./InputModal";

import { Flex, Text, Box, useDisclosure } from "@chakra-ui/react";
import { BsThreeDotsVertical, BsCheck2Square } from "react-icons/bs";
import { RiDeleteBackLine } from "react-icons/ri";

function SingleProject({ project }) {
  const { getProjects, getTasks, loggedUser } = useContext(CollectionContext);
  const [edit, setEdit] = useState(false);
  const { isOpen, onOpen, onClose } = useDisclosure();

  const deleteProject = async (id) => {
    await api_pr.deleteProject(id);
    await getProjects(loggedUser.id);
    await getTasks(loggedUser.id);
  };

  const completeProject = async (id, status) => {
    await api_pr.completeProject(id, status);
    await getProjects(loggedUser.id);
  };

  return (
    <>
      <Flex
        borderBottom="0.2px solid white"
        borderRadius="6px"
        textDecor={project.isDone && "line-through"}
        gap={4}
        flexDir="row"
        justifyContent="space-between"
        padding="0.5em"
        alignItems="center"
      >
        <Flex gap={2}>
          <Box width="10px" bgColor={project.color}></Box>
          <Flex flexDir="column">
            <Text>{project.name}</Text>
            <Text>{project.deadline}</Text>
            <Text fontWeight="bold">{project.project}</Text>
          </Flex>
        </Flex>
        <Flex gap={2} alignItems="center">
          <RiDeleteBackLine
            size={30}
            color="red"
            onClick={() => deleteProject(project.id)}
          />
          <BsCheck2Square
            color="green"
            size={30}
            onClick={() => completeProject(project.id, !project.isDone)}
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
        onOpen={onOpen}
        isOpen={isOpen}
        onClose={() => {
          onClose();
        }}
      >
        <ProjectForm editProject={project} setEdit={setEdit} />
      </InputModal>
    </>
  );
}

export default SingleProject;
