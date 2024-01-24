# TODO List

## High Priority

- [ ] Add the Clerk API to the project.
  - [ ] Add the Clerk user to the database.
  - [ ] Add the Clerk user component to the navbar
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
