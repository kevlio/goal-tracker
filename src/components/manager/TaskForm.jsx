import { useState, useRef, useContext } from "react";
import { CollectionContext } from "../../context/CollectionContext";
import * as api_ta from "../../api/task";

import { Input, Button, Select } from "@chakra-ui/react";

const initialTask = {
  name: "",
  projectId: "",
  description: "",
  deadline: "",
  color: "#000000",
};

function TaskForm({ editTask, setEdit }) {
  const [taskInput, setTaskInput] = useState(editTask || initialTask);
  const { projects, getTasks, loggedUser } = useContext(CollectionContext);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (taskInput && !editTask) {
      await api_ta.addTask(taskInput, loggedUser.id);
      await getTasks(loggedUser.id);
    }
    if (taskInput && editTask) {
      await api_ta.editTask(taskInput.id, taskInput);
      setEdit(false);
      await getTasks(loggedUser.id);
    }
  };

  function handleChange(e) {
    const inputName = e.target.name;
    const inputValue = e.target.value;
    setTaskInput((prevState) => ({
      ...prevState,
      [inputName]: inputValue,
    }));
  }

  const inputRef = useRef();
  return (
    <form
      required
      ref={inputRef}
      onSubmit={(e) => {
        handleSubmit(e);
        inputRef.current?.blur();
      }}
      onKeyPress={(e) => {
        if (e.key === "Enter") handleSubmit(e);
      }}
    >
      <Input
        required
        name="name"
        value={taskInput.name}
        placeholder="Task"
        type="text"
        onChange={handleChange}
      />

      <Select
        name="projectId"
        value={taskInput.projectId}
        onChange={handleChange}
        textTransform="uppercase"
      >
        <option></option>
        {projects &&
          projects.map((project) => (
            <option
              key={project.id}
              value={project.id}
              style={{ backgroundColor: "black" }}
            >
              {project.name}
            </option>
          ))}
      </Select>
      <Input
        name="deadline"
        value={taskInput.deadline}
        placeholder="deadline"
        type="date"
        onChange={handleChange}
      />
      <Input
        name="color"
        value={taskInput.color}
        type="color"
        onChange={handleChange}
      />
      <Button
        width="100%"
        type="submit"
        colorScheme="blackAlpha"
        isDisabled={!taskInput.projectId && true}
      >
        {!editTask ? "Add Task" : "Edit Task"}
      </Button>
    </form>
  );
}

export default TaskForm;
