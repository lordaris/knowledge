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
import useCourseStore from "@/store/course-store";
import { categories } from "@/utils/constants/categories";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const formSchema = z.object({
  title: z.string().min(3, "Title should be at least 3 characters"),
  description: z
    .string()
    .min(10, "Description should be at least 10 characters"),
  category: z.enum(categories),
});

export const NewCourseForm = ({ onClose }) => {
  const [isCourseCreated, setIsCourseCreated] = useState(false);
  const [submissionMessage, setSubmissionMessage] = useState("");
  const { addCourse } = useCourseStore();

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
      await addCourse(values);

      setIsCourseCreated(true);
      setSubmissionMessage(
        "Course created successfully! Please close this to continue.",
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

        <FormField
          control={form.control}
          name="category"
          render={({ field }) => (
            <FormItem className="pb-4">
              <FormLabel>Category</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <SelectTrigger as="button" className="w-full">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((category) => (
                    <SelectItem key={category} value={category}>
                      {category}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        ></FormField>
        <Button type="submit">Create Course</Button>

        {isCourseCreated && <p>{submissionMessage}</p>}
      </form>
    </Form>
  );
};
