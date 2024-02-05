import React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

const DeleteSectionConfirmationModal = ({
  sectionId,
  onDelete,
  open,
  setOpen,
}) => {
  const handleDelete = async () => {
    onDelete(sectionId);
    setOpen(false); // Close the modal after deletion
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Delete Section</DialogTitle>
          <DialogDescription>
            Are you sure you want to delete this section and all of its lessons?
          </DialogDescription>
        </DialogHeader>
        <div className="flex justify-end gap-4">
          <Button variant="outline" onClick={() => setOpen(false)}>
            Cancel
          </Button>
          <Button variant="destructive" onClick={handleDelete}>
            Delete
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default DeleteSectionConfirmationModal;
