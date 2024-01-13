// app/components/course/create-course.tsx
"use client";
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

export const NewCourseDrawer = ({ setOpen }) => {
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
