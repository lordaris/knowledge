import { Button } from "@/components/ui/button";
import { TrashIcon } from "@radix-ui/react-icons";

const CourseItem = ({ course, onCourseUpdated }) => {
  // Function to handle delete (with confirmation)
  const handleDelete = async () => {
    // Logic to delete course
    const response = await fetch(`/api/courses/${course._id}`, {
      method: "DELETE",
    });
    if (response.ok) {
      onCourseUpdated();
    }

    onCourseUpdated(); // Reload the courses list
  };

  return (
    <div className="flex flex-wrap items-center gap-2 p-2">
      <h1>{course.title}</h1>
      <Button variant={"outline"}>Add Section</Button>
      <Button
        size={"icon"}
        variant={"destructive"}
        onClick={handleDelete}
        className="text-foreground"
      >
        <TrashIcon />
      </Button>
    </div>
  );
};

export default CourseItem;
