// app/components/course/create-course.tsx
"use client";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { NewCourseForm } from "@/components/course/new-course-form";
import { Button } from "@/components/ui/button";

export const NewCourseModal = ({ open, setOpen }) => {
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>Create new course</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Create a new course</DialogTitle>
          <DialogDescription>
            Give your new course a title and description
          </DialogDescription>
        </DialogHeader>
        <NewCourseForm onClose={() => setOpen(false)} />
      </DialogContent>
    </Dialog>
  );
};
