import React, { useEffect, useContext } from "react";
import { Flex } from "@chakra-ui/react";
import SingleProject from "./SingleProject";
import { CollectionContext } from "../../context/CollectionContext";

function ProjectList() {
  const { projects, getProjects, loggedUser } = useContext(CollectionContext);

  useEffect(() => {
    async () => {
      getProjects(loggedUser.id);
    };
  }, []);

  return (
    <Flex
      flexDir="column"
      // maxHeight={{ base: "70vh" }}
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
      {projects &&
        projects.map((project) => (
          <SingleProject key={project.id} project={project} />
        ))}
    </Flex>
  );
}

export default ProjectList;
