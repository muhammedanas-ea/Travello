import { Drawer, Typography, Input, Card } from "@material-tailwind/react";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { useState } from "react";
import { ChatState } from "./context/ChatProvider";
import { OwnerChatSearch } from "../../../api/PropertyApi";
import userRequest from '../../../utils/UserMiddleware'

export default function SideDrawer() {
  const [open, setOpen] = useState(false);
  const openDrawer = () => setOpen(true);
  const closeDrawer = () => setOpen(false);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);
  const [searchResult, setSearchResult] = useState([]);
  const [loadingChat, setLoadingChat] = useState(false);
  const { setChats, user, chats, setSelectedChat } = ChatState();


  const handleSearch = async () => {
    if (!search) {
      console.log("Please Enter something in search");
      return;
    }
    try {
      setLoading(true);
      const { data } = await OwnerChatSearch(search);
      setLoading(false);
      setSearchResult(data);
    } catch (err) {
      console.log(err);
    }
  };

  const accessChat = async (userId) => {
    try {
      setLoadingChat(true);
      const ownerId = user.id;
      const { data } = await userRequest.post(`/accesschat`, { ownerId, userId });
      
      // const { data } = await Accesschat(ownerId, userId);

      if (!chats.find((c) => c._id === data._id)) {
        console.log("nothing");
        setChats([data, ...chats]);
      }

      setSelectedChat(data);
      setLoadingChat(false);
      setOpen(!open);
    } catch (error) {
      console.log("Error fetching the chat");
    }
  };

  return (
    <>
      <>
        <div
          onClick={openDrawer}
          className="flex bg-blue-gray-400 p-1 rounded-3xl cursor-pointer"
        >
          <Typography className="mx-3 ">search</Typography>
          <MagnifyingGlassIcon className="h-6 w-6 me-3" />
        </div>
        <Drawer open={open} onClose={closeDrawer}>
          <div className="p-5">
            <Input
              className=""
              label="Search by name or email:"
              type="text"
              variant="standard"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />

            <button onClick={handleSearch}>Go</button>
          </div>
          {loading ? (
            <div>Loading...</div>
          ) : (
            <div>
              {searchResult?.map((user) => (
                <Card key={user._id} className="bg-blue-gray-200">
                  <button onClick={() => accessChat(user._id)}>
                    {user.name}
                  </button>
                </Card>
              ))}
            </div>
          )}
          {loadingChat && <div>Loading chat...</div>}
        </Drawer>
      </>
    </>
  );
}
