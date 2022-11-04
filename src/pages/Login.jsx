import {
  Input,
  Button,
  Center,
  Box,
  Stack,
  Heading,
  Text,
  Fade,
  useDisclosure,
  Checkbox,
} from "@chakra-ui/react";
import React, { useRef, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";

import { addUser, getUsers } from "../api/user";
import { CollectionContext } from "../context/CollectionContext";
import { CurrentPageContext } from "../context/PageContext";

function Login() {
  const { setCurrentPage } = useContext(CurrentPageContext);
  const [username, setUsername] = useState("");
  const { isOpen, onToggle } = useDisclosure();
  const navigate = useNavigate();
  const { setLoggedUser } = useContext(CollectionContext);
  const [userMode, setUserMode] = useState("login");
  const formRef = useRef();

  async function handleSubmit(e) {
    e.preventDefault();
    const fetchUsers = await getUsers();
    if (userMode === "login") {
      const userChecked = fetchUsers.find((user) => user.username === username);
      if (!userChecked) return onToggle();
      setLoggedUser(userChecked);
      localStorage.setItem("userData", JSON.stringify(userChecked));
      setCurrentPage("timer");
      navigate("/");
    }
    if (userMode === "signup") {
      const userChecked = fetchUsers.find((user) => user.username === username);
      if (userChecked) return onToggle();
      const createUser = await addUser({ username: username });
      localStorage.setItem("userData", JSON.stringify(createUser));
      setLoggedUser(createUser);
      setCurrentPage("manager");
      navigate("/manager");
    }
  }

  return (
    <Center alignItems="flex-start">
      <Box flex-direction="column">
        <Box>
          <Heading
            fontWeight={600}
            fontSize={{ base: "2xl", sm: "2xl", md: "4xl" }}
            lineHeight={"110%"}
            color={"var(--chakra-colors-gray-300)"}
            padding="3"
          >
            {userMode === "login" ? "Welcome back" : "Warm welcome"}
            <br />
            <Text as={"span"} color={"green.400"}>
              fellow Goalsetter
            </Text>
          </Heading>
        </Box>
        <Stack spacing={5} direction="row" pb={1}>
          <Checkbox
            colorScheme="green"
            isChecked={userMode === "login"}
            value="login"
            onChange={(e) => {
              setUserMode(e.target.value);
            }}
            isDisabled={userMode === "login" ? true : false}
          >
            Log in
          </Checkbox>
          <Checkbox
            colorScheme="green"
            isChecked={userMode === "signup"}
            value="signup"
            onChange={(e) => {
              setUserMode(e.target.value);
            }}
            isDisabled={userMode === "signup"}
          >
            Sign up
          </Checkbox>
        </Stack>
        <form
          ref={formRef}
          onSubmit={handleSubmit}
          onKeyPress={(e) => {
            if (e.key === "Enter") handleSubmit(e);
          }}
        >
          <Stack>
            <Input
              // ref={inputRef}
              // value={username}
              isRequired
              color="white"
              name="username"
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Username"
              type="text"
            ></Input>
            <Input
              isDisabled
              textDecor="line-through"
              color="white"
              name="password"
              // value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              type="password"
            ></Input>
            <Button type="submit" colorScheme="green">
              {userMode === "login" ? "Login" : "Create user"}
            </Button>
            <Fade in={isOpen}>
              <Button
                width="100%"
                color="white"
                bg="red.600"
                rounded="md"
                shadow="md"
              >
                Incorrect username
              </Button>
            </Fade>
          </Stack>
        </form>
      </Box>
    </Center>
  );
}

export default Login;
