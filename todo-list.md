# TODO List

## High Priority

- [x] Add the Clerk API to the project.

  - [x] Add the Clerk user to the database. (Cancelled by now)

    > [!NOTE] I'm exploring the idea of not storing the user in the database and
    > instead creating a course enrollment schema to store the user id, course
    > id and enrollment date, so each time a user enrolls in a course, a new
    > enrollment is created, and I can have a page to show the courses the user
    > is enrolled in. I am creating a new branch to explore this idea. The same
    > idea applies to the instructor, so there will be an instructor course
    > schema with a list of the instructors and its courses, and with it only
    > the instructors can modify its courses. I think that I'll use the role of
    > the user directly from Clerk, so I don't have to store it in the database.

    - [ ] Integrate the withAuth HOC with Clerk.

      > [!NOTE] This will help me to get the user information from clerk and use
      > it in the endpoints to manage the creation of courses and getting the
      > courses by instructor id, and also to get the courses by student id.

    - [x] Create the enrollment schema.
    - [ ] Create a page to test the enrollment idea.
    - [ ] Create a page to show the courses the user is enrolled in.

  - [x] Add the Clerk user component to the navbar
        **(components/ui/site-header)**.
  - [ ] Modify the instructor/dashboard page to show the instructor's courses.
  - [ ] Secure the whole app with Clerk.

- [ ] Modify the course model to include the instructor id.
  - [ ] Include the field in the documentation.
- [ ] Modify the user model to include the courses array and the role.
      Instructors can be students too, so the role should be an array.
  - [ ] Include the new field in the documentation.
- [ ] Add an endpoint to see courses by instructor id
      **(instructor/:id/courses)**.
  - [ ] Include the endpoint information in the documentation.
- [ ] Add an endpoint to see courses by student id **(student/:id/courses)**.
  - [ ] Include the endpoint information in the documentation.
- [ ] Using an accordion from Shadcn, modify the **course-item
      (components/course/course-item)** component to show its sections when
      clicked. It should have buttons to add, edit and delete the sections, each
      of them should open a modal or drawer (depending on the device) to perform
      the action.
- [ ] Add a button to the course sections in the instructor/dashboard page to go
      to an specific section page where lessons can be added. The page should
      have a button to add a new lesson and a list of the lessons. Each lesson
      should have a button to edit it and a button to delete it.

## Medium Priority

- [ ] Show the list of courses in the courses page based on the actual API data.
- [ ] Modify the model of the courses to include an "active" field, so the
      courses page can show only the active courses.

## Low Priority

- [ ] Add a link to the Navbar logo to go to the home page.
