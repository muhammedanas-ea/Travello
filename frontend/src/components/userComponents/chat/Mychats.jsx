import { useEffect } from "react";
import { AllChats } from "../../../api/UserApi";
import { ChatState } from "./context/ChatProvider";
import { Box, Stack, Text } from "@chakra-ui/react";
import SideDrawer from "./SideDrawer";
import "./Style.css";

// eslint-disable-next-line react/prop-types
export default function Mychats({ fetchAgain }) {
  const { setChats, user, selectedChat, chats, setSelectedChat } = ChatState();
  const userId = user.id;

  const fetchChats = async () => {
    try {
      const response = await AllChats(userId);
      setChats(response.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchChats();
  }, [fetchAgain]);

  return (
    <Box
      display={{ base: selectedChat ? "none" : "flex", md: "flex" }}
      flexDir="column"
      alignItems="center"
      p={2}
      w={{ base: "100%", md: "31%" }}
      borderRadius="md"
      borderWidth="1px"
      bg="#ededed"
    >
      <Box
        display="flex"
        w="100%"
        alignItems="center"
        justifyContent="space-around"
        pb={2}
        px={2}
      >
        <Box
          fontSize={{ base: "28px", md: "30px" }}
          fontFamily="Work sans"
          display="flex"
          w="100%"
          justifyContent="space-between"
          alignItems="center"
        >
          My Chats
        </Box>
        <Box>{user && <SideDrawer />}</Box>
      </Box>
      <Box
        display="flex"
        flexDir="column"
        bg="#ededed"
        w="100%"
        h="100%"
        borderRadius="lg"
        overflowY="hidden"
      >
        {chats ? (
          <Stack className="newClass" overflowY="scroll" h="100%">
            {chats.map((chat) => {
              return (
                <Box
                  onClick={() => setSelectedChat(chat)}
                  key={chat._id}
                  cursor="pointer"
                  bg={selectedChat === chat ? "#3882ac" : "#ffff"}
                  color={selectedChat === chat ? "white" : "black"}
                  px={2}
                  py={2}
                >
                  <Box display="flex" alignItems="center" gap="2">
                    <img
                      src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQanlasPgQjfGGU6anray6qKVVH-ZlTqmuTHw&usqp=CAU"
                      className="h-10 w-10 rounded-full me-2 mt-2"
                    />
                    <div>
                      <Text>{chat.users?.owner?.name}</Text>
                      {chat.latestMessage && (
                        <Text fontSize="xs">
                          {chat.latestMessage.content.length > 50
                            ? chat.latestMessage.content.substring(0, 51) +
                              "..."
                            : chat.latestMessage.content}
                        </Text>
                      )}
                    </div>
                  </Box>
                </Box>
              );
            })}
          </Stack>
        ) : (
          <>loding....</>
        )}
      </Box>
    </Box>
  );
}
