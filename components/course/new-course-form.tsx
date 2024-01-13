// app/components/course/new-course-form.tsx
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
import { useForm } from "react-hook-form";
import * as z from "zod";
import { useState } from "react";
import { useCourse } from "@/app/providers/course-context-provider";

const formSchema = z.object({
  title: z.string().min(3, "Title should be at least 3 characters"),
  description: z
    .string()
    .min(10, "Description should be at least 10 characters"),
});

export const NewCourseForm = ({ onClose }) => {
  const [isCourseCreated, setIsCourseCreated] = useState(false);
  const [submissionMessage, setSubmissionMessage] = useState("");

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      description: "",
    },
  });

  const { loadCourses } = useCourse();

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      const res = await fetch("/api/courses", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });

      if (res.ok) {
        setIsCourseCreated(true);
        setSubmissionMessage(
          "Course created successfully! Please close this to continue",
        );
        setTimeout(() => {
          loadCourses();
          onClose();
        }, 2000);
      } else {
        setSubmissionMessage("Failed to create course.");
      }
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
        <Button type="submit">Create Course</Button>

        {isCourseCreated && <p>{submissionMessage}</p>}
      </form>
    </Form>
  );
};
