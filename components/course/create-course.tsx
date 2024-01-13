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
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";

import { NewCourseForm } from "@/components/course/new-course-form";
import { Button } from "@/components/ui/button";
import { useMediaQuery } from "@/hooks/use-media-query";
import { useState } from "react";

export const NewCourse = ({ onCourseCreated }) => {
  const [open, setOpen] = useState(false);
  const desktop = "(min-width: 768px)";
  const isDesktop = useMediaQuery(desktop);

  const CourseCreationUI = isDesktop ? (
    <NewCourseModal
      open={open}
      setOpen={setOpen}
      onCourseCreated={onCourseCreated}
    />
  ) : (
    <NewCourseDrawer setOpen={setOpen} onCourseCreated={onCourseCreated} />
  );

  return CourseCreationUI;
};

const NewCourseModal = ({ open, setOpen, onCourseCreated }) => {
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
        <NewCourseForm
          onCourseCreated={onCourseCreated}
          onClose={() => setOpen(false)}
        />
      </DialogContent>
    </Dialog>
  );
};

const NewCourseDrawer = ({ setOpen, onCourseCreated }) => {
  return (
    <Drawer>
      <DrawerTrigger asChild>
        <Button>Create new course</Button>
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>Create a new course</DrawerTitle>
          <DrawerDescription>
            Give your new course a title and description
          </DrawerDescription>
        </DrawerHeader>
        <NewCourseForm
          onCourseCreated={onCourseCreated}
          // OnClose does not work here
          // TODO: Fix this
          onClose={() => setOpen(false)}
        />
        <DrawerFooter>
          <DrawerClose>
            <Button variant="outline">Cancel</Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
};
