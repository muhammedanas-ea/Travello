import { useEffect, useRef } from "react";
import { ChatState } from "./context/ChatProvider";
import {
  isLastMessage,
  isSameSender,
  isSameSenderMargin,
  isSameUser,
} from "./config/ChatLogic";
import { Avatar, Tooltip } from "@chakra-ui/react";

// eslint-disable-next-line react/prop-types
function ScrollableChat({ messages }) {
  const { user } = ChatState();
  const chatContainerRef = useRef(null);

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop =
        chatContainerRef.current.scrollHeight;
    }
  }, [messages]);

  return (
    <div
      ref={chatContainerRef}
      style={{
        maxHeight: "500px",
        overflowY: "auto",
      }}
    >
      {console.log(user.id,'isssss')}
      {messages &&
        // eslint-disable-next-line react/prop-types
        messages.map((m, i) => (
          <div style={{ display: "flex" }} key={i}>
            {(isSameSender(messages, m, i, user.id) ||
              isLastMessage(messages, i, user.id)) && (
              <Tooltip
                label={m.sender.owner.name}
                placement="bottom-start"
                hasArrow
              >
                <Avatar
                  mt="7px"
                  mr={1}
                  size="sm"
                  width={"8"}
                  height={"8"}
                  cursor="pointer"
                  name={m.sender.name}
                  src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQanlasPgQjfGGU6anray6qKVVH-ZlTqmuTHw&usqp=CAU"
                />
              </Tooltip>
            )}
            <span
              style={{
                backgroundColor: `${
                  m.sender.user
                    ? m.sender.user?._id === user.id
                      ? "#BEE3F8"
                      : "#8eebb3"
                    : m.sender.owner?._id === user.id
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
}

export default ScrollableChat;
