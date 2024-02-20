import { ChatState } from "./context/ChatProvider";
import { Box } from "@chakra-ui/react";
import ChatBox from "./ChatBox";
import Mychats from "./Mychats";
import { useState } from "react";
import "./ChatList.css";

function ChatList() {
  const [fetchAgain, setFetchAgain] = useState(false);
  const { user } = ChatState();
  return (
    <div style={{ width: "100%" }}>
      <Box
        w="100%"
        h="91.5vh"
        p="25px"
        className="flex justify-between p-6 container mx-auto"
      >
        {user && <Mychats fetchAgain={fetchAgain} />}
        {user && (
          <ChatBox
            fetchAgain={fetchAgain}
            setFetchAgain={setFetchAgain}
            className="flex h-9"
          />
        )}
      </Box>
    </div>
  );
}

export default ChatList;
