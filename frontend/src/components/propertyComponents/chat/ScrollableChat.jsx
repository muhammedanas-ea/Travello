import { useEffect, useRef } from 'react';
import { Avatar } from "@chakra-ui/avatar";
import { Tooltip } from "@chakra-ui/tooltip";
import { ChatState } from "./context/ChatProvider";
import {   
    isLastMessage,
    isSameSender,
    isSameSenderMargin,
    isSameUser, 
} from "./config/ChatLogic";

// eslint-disable-next-line react/prop-types
const ScrollableChat = ({ messages }) => {
  const { user } = ChatState();
  const chatContainerRef = useRef(null);
  

  // Scroll to the bottom of the container when new messages arrive
  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [messages]);

  return (
    <div
      ref={chatContainerRef}
      style={{
        maxHeight: '500px', // Set a maximum height for the scrollable container
        overflowY: 'auto',
      }}
    >
      {messages &&
        // eslint-disable-next-line react/prop-types
        messages.map((m, i) => (
          <div style={{ display: "flex" }} key={i}>
            {(isSameSender(messages, m, i, user.id) ||
              isLastMessage(messages, i, user.id)) && (
              <Tooltip label={m.sender.name} placement="bottom-start" hasArrow>
                  <Avatar
                    mt="7px"
                    mr={1}
                    width={"8"}
                    height={"8"}
                    size="2px"
                    cursor="pointer"
                    name={m.sender.name}
                    src='https://www.clipartmax.com/png/small/54-546487_a-little-over-a-month-ago-i-had-lasik-surgery-user-profile.png'
                  />
              </Tooltip>
            )}
            <span
              style={{
                backgroundColor: `${
                  m.sender.owner
                    ? m.sender.owner._id === user.id
                      ? "#BEE3F8"
                      : "#8eebb3"
                    : m.sender.user._id === user.id
                    ? "#BEE3F8"
                    : "#8eebb3"
                }`,
                marginLeft: isSameSenderMargin(messages, m, i, user.id),
                marginTop: isSameUser(messages, m, i, user.id) ? 3 : 10,
                borderRadius: "20px",
                padding: "5px 15px",
                maxWidth: "75%",
              }}
            >
              {m.content}
            </span>
          </div>
        ))}
    </div>
  );
};

export default ScrollableChat;
