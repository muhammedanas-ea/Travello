import React from "react";
import {
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
} from "@material-tailwind/react";
import { PropertyBlock } from "../../../api/AdminApi";

// eslint-disable-next-line react/prop-types
export default function PropertyBlockDialog({ id, onDataUpdate }) {
  // eslint-disable-next-line react/prop-types
  const { PropertyName, _id } = id;
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(!open);

  const handleSubmit = async () => {
    try {
      const response = await PropertyBlock({ _id });
      if (response.data.status) {
        onDataUpdate(true);
        handleOpen();
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <Button
        className="bg-red-500 rounded-md font-medium"
        size="sm"
        onClick={handleOpen}
      >
        Block
      </Button>
      <Dialog open={open} handler={handleOpen}>
        <DialogHeader>Its a property block confirm dialog.</DialogHeader>
        <DialogBody>
          Are you sure you want to blog property {PropertyName} ?
        </DialogBody>
        <DialogFooter>
          <Button
            variant="text"
            color="red"
            onClick={handleOpen}
            className="mr-1"
          >
            <span>Cancel</span>
          </Button>
          <Button variant="gradient" color="green" onClick={handleSubmit}>
            <span>Confirm</span>
          </Button>
        </DialogFooter>
      </Dialog>
    </>
  );
}
