import { Box, FormControl, IconButton, Spinner, Text } from "@chakra-ui/react";
import { Input } from "@chakra-ui/input";
import { ArrowBackIcon } from "@chakra-ui/icons";
import { useState } from "react";
import io from "socket.io-client";
import { useEffect } from "react";
import ScrollableChat from "./ScrollableChat";
import { ChatState } from "./context/ChatProvider";
import { MessageSend } from "../../../api/UserApi";
import userRequest from '../../../utils/UserMiddleware';
var socket, selectedChatCompare;
const ENDPOINT = import.meta.env.VITE_BACKENDURL;
import './Style.css'

// eslint-disable-next-line react/prop-types
const SingleChat = ({ fetchAgain, setFetchAgain }) => {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [istyping, setIsTyping] = useState(false);
  const [newMessage, setNewMessage] = useState("");
  const [socketConnected, setSocketConnected] = useState(false);
  const [typing, setTyping] = useState(false);

  const { selectedChat, setSelectedChat, user, notification, setNotification } =
    ChatState();

  const fetchMessages = async () => {
    if (!selectedChat) return;
    try {
      setLoading(true);
      const chatId = selectedChat._id;
      const data = await userRequest.get(`/message/${chatId}`);
      setMessages(data.data);
      setLoading(false);

      socket.emit("join chat", selectedChat._id);
    } catch (error) {
      console.log("Failed to Load the Messages");
    }
  };

  const sendMessage = async (event) => {
    if (event.key === "Enter" && newMessage) {
      socket.emit("stop typing", selectedChat._id);
      try {
        setNewMessage("");
        const userId = user.id;
        const { data } = await MessageSend(newMessage, selectedChat, userId);
        socket.emit("new message", data);
        setMessages([...messages, data]);
      } catch (error) {
        console.log("Failed to send the Message");
      }
    }
  };

  useEffect(() => {
    socket = io(ENDPOINT);
    socket.emit("setup", user);
    socket.on("connected", () => setSocketConnected(true));
    socket.on("typing", () => setIsTyping(true));
    socket.on("stop typing", () => setIsTyping(false));
  }, []);

  useEffect(() => {
    fetchMessages();
    selectedChatCompare = selectedChat; 
  }, [selectedChat]);

  useEffect(() => {
    const handleNewMessageReceived = (newMessageReceived) => {
      console.log("New message received:", newMessageReceived);
      console.log("Selected chat compare:", selectedChatCompare);

      if (
        !selectedChatCompare || // If chat is not selected or doesn't match the current chat
        selectedChatCompare._id !== newMessageReceived.chat._id
        ) {
          if (!notification.includes(newMessageReceived)) {
            setFetchAgain(!fetchAgain);
            setNotification([newMessageReceived, ...notification]);
        }
      } else {
        // Update the messages state to include the new message while preserving previous messages
        setMessages([...messages, newMessageReceived]);
      }
    };

    // Register the event listener
    socket.on("message received", handleNewMessageReceived);
    console.log("message received", handleNewMessageReceived);

    // Cleanup: Remove the event listener when the component unmounts
    return () => {
      // Unregister the event listener
      socket.off("message received", handleNewMessageReceived);
    };
  }, [selectedChatCompare, notification, fetchAgain, messages]);

  const typingHandler = (e) => {
    setNewMessage(e.target.value);

    if (!socketConnected) return;

    if (!typing) {
      setTyping(true);
      socket.emit("typing", selectedChat._id);
    }
    let lastTypingTime = new Date().getTime();
    var timerLength = 3000;
    setTimeout(() => {
      var timeNow = new Date().getTime();
      var timeDiff = timeNow - lastTypingTime;
      if (timeDiff >= timerLength && typing) {
        socket.emit("stop typing", selectedChat._id);
        setTyping(false);
      }
    }, timerLength);
  };

  const isMessageSender = (currentUser, selectedChat) => {
    return (
      selectedChat.sender && currentUser.user.id === selectedChat.sender.id
    );
  };
  return (
    <>
      {selectedChat ? (
        <>
          <Text
            fontSize={{ base: "28px", md: "30px" }}
            pb={3}
            px={2}
            w="100%"
            fontFamily="Work sans"
            display="flex"
            justifyContent={{ base: "start" }}
            alignItems="center"
            bg="#ffff"
          >
            <IconButton
              display={{ base: "flex", md: "none" }}
              icon={<ArrowBackIcon />}
              onClick={() => setSelectedChat("")}
            />
            <img
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQanlasPgQjfGGU6anray6qKVVH-ZlTqmuTHw&usqp=CAU"
              className="h-10 w-10 rounded-full me-2 mt-2"
            />

            {selectedChat.users.owner && selectedChat.users.owner.name}
          </Text>
          <Box
            display="flex"
            flexDir="column"
            justifyContent="flex-end"
            p={3}
            bg="#E8E8E8"
            w="100%"
            h="90%"
            borderRadius="lg"
            overflowY="hidden"
          >
            {loading ? (
              <Spinner
                size="xl"
                w={20}
                h={20}
                alignSelf="center"
                margin="auto"
              />
            ) : (
              <div className="messages overflow-hidden">
                <ScrollableChat messages={messages} user={user} />
              </div>
            )}
            {istyping && !isMessageSender(user, selectedChat) ? (
              <div>
                <p style={{ marginBottom: 8, marginLeft: 0, color: "gray" }}>
                  Typing...
                </p>
              </div>
            ) : (
              <></>
            )}
            <FormControl className="w-full pt-3" id="first-name" isRequired>
              <div className="relative flex w-full">
                <Input
                  className="w-full"
                  borderRadius={10}
                  variant="filled"
                  bg="#fff"
                  placeholder="Enter a message..."
                  value={newMessage}
                  onChange={typingHandler}
                  onKeyDown={sendMessage}
                />
              </div>
            </FormControl>
          </Box>
        </>
      ) : (
        <Box
          display="flex"
          alignItems="center"
          justifyContent="center"
          h="100%"
        >
          <Text fontSize="3xl" pb={3} fontFamily="Work sans">
            Click on a user to start chatting
          </Text>
        </Box>
      )}
    </>
  );
};

export default SingleChat;
