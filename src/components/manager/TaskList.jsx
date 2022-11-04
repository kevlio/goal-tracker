import React, { useContext, useEffect } from "react";

import { Flex } from "@chakra-ui/react";
import SingleTask from "./SingleTask";

import { CollectionContext } from "../../context/CollectionContext";

function TaskList() {
  const { tasks } = useContext(CollectionContext);
  const { getTasks, loggedUser } = useContext(CollectionContext);

  useEffect(() => {
    async () => {
      getTasks(loggedUser.id);
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
      {tasks && tasks.map((task) => <SingleTask key={task.id} task={task} />)}
    </Flex>
  );
}

export default TaskList;
