"use client";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";
import useSectionStore from "@/store/section-store";

const formSchema = z.object({
  title: z.string().min(3, "Title should be at least 3 characters"),
  description: z
    .string()
    .min(10, "Description should be at least 10 characters"),
});

export const UpdateSectionForm = ({ onClose, sectionId }) => {
  const [isUpdating, setIsUpdating] = useState(false);
  const { updateSection } = useSectionStore();
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      description: "",
    },
  });

  const onSubmit = async (values) => {
    setIsUpdating(true);
    try {
      await updateSection(section.courseId, section._id, values);
      onClose(); // Close form after successful update
    } catch (error) {
      console.error(error);
    } finally {
      setIsUpdating(false);
    }
  };

  return (
    <Form {...form}>
      <FormField
        control={form.control}
        name="title"
        render={({ field }) => (
          <FormItem className="">
            <FormLabel>Title</FormLabel>
            <FormControl>
              <Input {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="description"
        render={({ field }) => (
          <FormItem className="py-4">
            <FormLabel>Description</FormLabel>
            <FormControl>
              <Input as="textarea" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <Button onClick={form.handleSubmit(onSubmit)}>
        {isUpdating ? "Updating..." : "Update Section"}
      </Button>
    </Form>
  );
};
