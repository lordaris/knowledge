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
import { NewSectionForm } from "@/components/course/section/new-section-form";
import { Button } from "@/components/ui/button";

export const NewSectionDrawer = ({ courseId, setOpen }) => {
  return (
    <Drawer>
      <DrawerTrigger asChild>
        <Button>Create new section</Button>
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>Create a new course</DrawerTitle>
          <DrawerDescription>
            Give your new course a title and description
          </DrawerDescription>
        </DrawerHeader>
        <NewSectionForm
          // OnClose does not work here
          // TODO: Fix this
          courseId={courseId}
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
