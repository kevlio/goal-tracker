import React, { useContext, useEffect, useState } from "react";

import { Flex, Link, Text } from "@chakra-ui/react";

import { TfiTimer } from "react-icons/tfi";
import { SlCalender } from "react-icons/sl";
import { BsListTask } from "react-icons/bs";
import { BiPowerOff } from "react-icons/bi";
import { FaUserNinja } from "react-icons/fa";

import { CurrentPageContext } from "../../context/PageContext";
import { CollectionContext } from "../../context/CollectionContext";

import dayjs from "dayjs";

export const NavLink = ({ children, color, path, page }) => {
  const { setCurrentPage } = useContext(CurrentPageContext);

  return (
    <Link
      href={path}
      onClick={() => {
        setCurrentPage(page);
        localStorage.setItem("currentPage", page);
      }}
      _active={{
        bg: "black",
      }}
      _hover={{
        bg: "black",
        color: "white",

        border: "1px solid green",
        boxShadow: "0 0 1em 0.5em #6b46c1",
      }}
      bg="rgba(0, 0, 0, 0.4)"
      variant="solid"
      boxShadow="0em 0em 6em 0.1em #4D00A3"
      padding="0.5em"
      fontSize={{ base: "100%", md: "140%" }}
      color={color}
      borderRadius="12px"
      borderColor="green"
    >
      {children}
    </Link>
  );
};

function Navbar() {
  const { currentPage } = useContext(CurrentPageContext);
  const { loggedUser, setLoggedUser } = useContext(CollectionContext);

  const [currentTime, setCurrentTime] = useState(
    dayjs().format("YYYY-MM-DD HH:mm")
  );

  useEffect(() => {
    function updateTime() {
      setCurrentTime(dayjs().format("YYYY-MM-DD HH:mm"));
    }
    const intervalId = setInterval(updateTime, 1000);
    return () => clearInterval(intervalId);
  }, []);

  return (
    <Flex
      position="sticky"
      bottom="0"
      left="0"
      right="0"
      zIndex="2"
      flexDir="column"
      gap={1}
      justifyContent="center"
      padding={2}
      alignItems="center"
      backdropFilter="auto"
      backdropBlur="4px"
    >
      <Flex flexDir="row" gap={4} justifyContent="center" alignItems="center">
        <NavLink
          path="/"
          color={currentPage === "timer" ? "green" : "purple"}
          page="timer"
        >
          <TfiTimer size={40} />
        </NavLink>
        <NavLink
          path="/calendar"
          color={currentPage === "calendar" ? "green" : "purple"}
          page="calendar"
        >
          <SlCalender size={40} />
        </NavLink>
        <NavLink
          path="/manager"
          color={currentPage === "manager" ? "green" : "purple"}
          page="manager"
        >
          <BsListTask size={40} />
        </NavLink>
        {loggedUser?.id === "anonymous" ? (
          <NavLink path="/login" color="red" page="login">
            <FaUserNinja size={40} />
          </NavLink>
        ) : (
          <NavLink path="/login" color="red" page="login">
            <BiPowerOff
              size={40}
              color="red"
              onClick={() => {
                setLoggedUser({ username: "anonymous", id: "anonymous" });
                localStorage.setItem("userData", "");
                localStorage.setItem("currentTimer", "");
              }}
            />
          </NavLink>
        )}
      </Flex>
      <Text
        color="purple.200"
        _active={{
          bg: "black",
        }}
        _hover={{
          bg: "black",
          borderColor: "#4D00A3",
          boxShadow: "0 0 1em 0.5em #ff006b",
          borderRadius: "12px",
        }}
        padding="0.5em"
        fontSize={{ base: "100%", md: "120%" }}
      >
        {currentTime}
      </Text>
    </Flex>
  );
}

export default Navbar;
