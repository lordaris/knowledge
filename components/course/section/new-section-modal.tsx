"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { NewSectionForm } from "@/components/course/section/new-section-form";
import { Button } from "@/components/ui/button";

export const NewSectionModal = ({ courseId, open, setOpen }) => {
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>Create new section</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Create a new section</DialogTitle>
          <DialogDescription>
            Give your new section a title and description
          </DialogDescription>
        </DialogHeader>
        <NewSectionForm courseId={courseId} onClose={() => setOpen(false)} />
      </DialogContent>
    </Dialog>
  );
};
