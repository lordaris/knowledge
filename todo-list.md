# TODO List

## High Priority

- [x] Add the Clerk API to the project.

  - [x] Add the Clerk user to the database. (Cancelled by now)

> [!NOTE]
> I'm exploring the idea of not storing the user in the database and
> instead creating a course enrollment schema to store the user id, courses id
> and enrollment date, so each time a user enrolls in a course, a new enrollment
> is created, and I can have a page to show the courses the user is enrolled in.
> I am creating a new branch to explore this idea. The same idea applies to the
> instructor, so there will be an instructor course schema with a list of the
> instructors and its courses, and with it only the instructors can modify its
> courses. I think that I'll use the role of the user directly from Clerk, so I
> don't have to store it in the database.

    - [x] Create the enrollment schema.
    - [ ] Create a page to test the enrollment idea.
    - [ ] Create a page to show the courses the user is enrolled in.

- [x] Add the Clerk user component to the navbar
      **(components/ui/site-header)**.
- [x] Modify the instructor/dashboard page to show the instructor's courses.
- [ ] Secure the whole app with Clerk.

- [x] Modify the course model to include the instructor id (createdBy)
  - [x] Include the field in the documentation.
- [x] Add an endpoint to see courses by instructor id
      **`courses/instructor/{instructorId}`**.
  - [x] Include the endpoint information in the documentation.
- [Cancelled] Add an endpoint to see courses by student id
  **(student/:id/courses)**.

  > [!IDEA]
  > I think that I'll use the enrollment schema to show the courses the
  > user is enrolled in, so I don't need to create a new endpoint for this.

- [ ] Using an accordion from Shadcn, modify the **course-item
      (components/course/course-item)** component to show its sections when
      clicked. It should have buttons to add, edit and delete the sections, each
      of them should open a modal or drawer (depending on the device) to perform
      the action.
- [ ] Modify the instructor dashboard to show the courses in a proper way.
  > [!IDEA]
  > Show the courses in a single page and the sections and lessons in
  > another page. The courses should have an accordion to show the description,
  > and the sections should have an accordion to show the lessons.

## Medium Priority

- [ ] Show the list of courses in the courses page based on the actual API data.
- [ ] Modify the model of the courses to include an "active" field, so the
      courses page can show only the active courses.

## Low Priority

- [x] Add a link to the Navbar logo to go to the home page.
