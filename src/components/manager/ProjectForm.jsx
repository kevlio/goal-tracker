import React, { useContext, useState, useRef } from "react";
import { CollectionContext } from "../../context/CollectionContext";
import * as api_pr from "../../api/project";

// import dayjs from "dayjs";
import { Flex, Input, Button, FormLabel } from "@chakra-ui/react";
const initialProject = {
  name: "",
  description: "",
  deadline: "",
  color: "#000000",
};

function ProjectForm({ editProject, setEdit }) {
  const { getProjects, loggedUser } = useContext(CollectionContext);

  const [projectInput, setProjectInput] = useState(
    editProject || initialProject
  );
  const formRef = useRef();

  function handleChange(e) {
    const inputName = e.target.name;
    const inputValue = e.target.value;
    setProjectInput((prevState) => ({ ...prevState, [inputName]: inputValue }));
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (projectInput && !editProject) {
      await api_pr.addProject(projectInput, loggedUser.id);
      await getProjects(loggedUser.id);
    }
    if (projectInput && editProject) {
      await api_pr.editProject(projectInput.id, projectInput);
      setEdit(false);
      await getProjects(loggedUser.id);
    }
  };

  return (
    <form
      required
      ref={formRef}
      onSubmit={handleSubmit}
      onKeyPress={(e) => {
        if (e.key === "Enter") handleSubmit(e);
      }}
    >
      <Input
        required
        name="name"
        value={projectInput.name}
        placeholder="Project"
        type="text"
        onChange={handleChange}
      />
      <Input
        name="description"
        value={projectInput.description}
        placeholder="Description"
        type="text"
        onChange={handleChange}
      />
      <Input
        name="color"
        value={projectInput.color}
        type="color"
        onChange={handleChange}
      />
      <Flex justifyContent="space-between">
        <FormLabel alignSelf="center">Deadline</FormLabel>
        <Input
          name="deadline"
          maxWidth="50%"
          value={projectInput.deadline}
          placeholder="Description"
          type="date"
          onChange={handleChange}
        />
      </Flex>
      <Button width="100%" type="submit" colorScheme="blackAlpha">
        {!editProject ? "Add project" : "Edit Project"}
      </Button>
    </form>
  );
}

export default ProjectForm;
