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

export const NewSectionForm = ({ courseId, onClose }) => {
  const [isSectionCreated, setIsSectionCreated] = useState(false);
  const [submissionMessage, setSubmissionMessage] = useState("");

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      description: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      // Call the addCourse method from useCourseStore
      await useSectionStore.getState().addSection(courseId, values);

      setIsSectionCreated(true);
      setSubmissionMessage(
        "Section created successfully! Please close this to continue.",
      );
      setTimeout(() => {
        onClose();
      }, 1000);
    } catch (error) {
      console.error(error);
      setSubmissionMessage("An error occurred.");
    }
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="m-4 flex flex-col"
      >
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
        <Button type="submit">Create Section</Button>

        {isSectionCreated && <p>{submissionMessage}</p>}
      </form>
    </Form>
  );
};
