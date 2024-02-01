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
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";
import useCourseStore from "@/store/course-store";

const formSchema = z.object({
  title: z.string().min(3, "Title should be at least 3 characters"),
  description: z
    .string()
    .min(10, "Description should be at least 10 characters"),
});

export const EditCourseForm = ({ courseId }) => {
  const { updateCourse, loadSingleCourse, singleCourse } = useCourseStore();
  const [updateSuccess, setUpdateSuccess] = useState(false);
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      description: "",
    },
  });

  useEffect(() => {
    if (courseId) {
      loadSingleCourse(courseId);
    }
  }, [courseId, loadSingleCourse]);

  useEffect(() => {
    if (singleCourse._id === courseId) {
      form.reset({
        title: singleCourse.title,
        description: singleCourse.description,
      });
    }
  }, [singleCourse, courseId, form.reset]);

  const onSubmit = async (values) => {
    try {
      await updateCourse(courseId, values);
      setUpdateSuccess(true);
      setTimeout(() => setUpdateSuccess(false), 3000); // Message disappears after 3 seconds
    } catch (error) {
      console.error(error);
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
            <FormItem>
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
        <Button type="submit">Save Changes</Button>
        {updateSuccess && (
          <p className="text-green-500">Course updated successfully!</p>
        )}
      </form>
    </Form>
  );
};
