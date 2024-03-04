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
import { Textarea } from "@/components/ui/textarea";
import useCourseStore from "@/store/course-store";
import { zodResolver } from "@hookform/resolvers/zod";
import dynamic from "next/dynamic";
import { useRouter } from "next/navigation";
import { Suspense, useState } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { useRef } from "react";
import {
  toolbarPlugin,
  headingsPlugin,
  listsPlugin,
  quotePlugin,
  thematicBreakPlugin,
  linkDialogPlugin,
  imagePlugin,
  tablePlugin,
  markdownShortcutPlugin,
  BoldItalicUnderlineToggles,
  InsertTable,
  BlockTypeSelect,
  CodeToggle,
  CreateLink,
  InsertImage,
} from "@mdxeditor/editor";

const formSchema = z.object({
  title: z.string().min(3, "Title should be at least 3 characters"),
  content: z.string().min(10, "Content should be at least 10 characters"),
});

const MDXEditor = dynamic(
  () => import("@mdxeditor/editor").then((mod) => mod.MDXEditor),
  {
    ssr: false,
  },
);

export const NewLessonForm = ({ sectionId, courseId }) => {
  const [isLessonCreated, setIsLessonCreated] = useState(false);
  const [submissionMessage, setSubmissionMessage] = useState("");
  const { addLesson, loadLessons } = useCourseStore();

  const editorRef = useRef(null);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      content: "",
    },
  });
  const router = useRouter();

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      // Call the addLesson method from useCourseStore
      await addLesson(sectionId, values);

      setIsLessonCreated(true);
      setSubmissionMessage("Lesson created successfully!");
      await loadLessons(sectionId);
      setTimeout(() => {
        router.push(`/instructor/courses/${courseId}`);
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
          name="content"
          render={({ field }) => (
            <FormItem className="py-4">
              <FormLabel>Content</FormLabel>
              <FormControl>
                <MDXEditor
                  markdown={field.value}
                  onChange={(newMarkdown) =>
                    form.setValue("content", newMarkdown)
                  }
                  plugins={[
                    toolbarPlugin({
                      toolbarContents: () => (
                        <>
                          <BoldItalicUnderlineToggles />
                          <BlockTypeSelect />
                          <CodeToggle />
                          <CreateLink />
                          <InsertImage />
                          <InsertTable />
                        </>
                      ),
                    }),
                    headingsPlugin(),
                    linkDialogPlugin(),
                    listsPlugin(),
                    quotePlugin(),
                    thematicBreakPlugin(),
                    imagePlugin(),
                    tablePlugin(),
                    markdownShortcutPlugin(),
                  ]}
                  ref={editorRef}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Create Lesson</Button>

        {isLessonCreated && <p>{submissionMessage}</p>}
      </form>
    </Form>
  );
};
