# TODO List

## Ideas to test before starting a new TODO item

- To have a button to add a new lesson in every section in the course edition
  page.
- Clicking the button should redirect to a new page to add a new lesson. The
  page should have a form to add the lesson title, the lesson content.
- In the course edition page, there should be an edit button for the lessons, so
  the user can edit the lesson title and the lesson content in a new page. Also
  there should be a delete button for the lessons.
- Add a counter for the sections in the course edition page.

## High Priority

- [ ] Move the delete button of the course edition page to the course list page,
      next to the edit button.
- [ ] Add a button to add a new section in the course edition page.
- [ ] Add a button to delete a section in the course edition page.
- [ ] Add a button to create a new lesson in the course edition page, it should
      redirect to a new page to create the lesson.
- [ ] Add a button to edit the lesson in the course edition page, it should
      redirect to a new page to edit the lesson.
- [ ] Add a button to delete the lesson in the course edition page.
- [ ] Add a login page and a register page.
- [ ] Add a page to show the user profile.
- [ ] Add a page to edit the user profile.
- [ ] Add a page to show the user courses.
- [ ] Add the new endpoint to the documentation
      `**/api/courses/sections/[sectionId]/lessons**`
- [ ] Include zustand and zod in the documentation.
- [ ] Remove the check list items in the documentation as this is the TODO list
      now.
- [ ] Remove the accessibility features from the documentation by now.

- [ ] Secure the whole app with Clerk.

## Medium Priority

- [ ] Show the list of courses in the courses page based on the actual API data.
- [ ] Modify the model of the courses to include an "active" field, so the
      courses page can show only the active courses.

## Low Priority

- [x] Add a link to the Navbar logo to go to the home page.

## Changes to include in the documentation

Date (MM/dd/YYYY): 02/01/2024

- Now the course model includes the instructor id, so the courses can be
  filtered
- Now the course model includes the active field, so the courses can be filtered
- There are a new endpoint to see the courses by instructor id
- There are a new schema for presenting the courses. The courses are now shown
  in a page with a card, and have an edit button to go to the course edition
  page.
- The course edition page is now a form to edit the course. It have some side
  effects to be handled, as the fact that going to the course edition page with
  an invalid course id doesn't show any error message nor redirect to the
  courses page. The course edition page should show an error message and
  redirect to the courses page if the course id is invalid.
- The user is not stored in the database, and the user id is used to create the
  enrollment schema. The same applies to the instructor, so the instructor id is
  used to create the instructor course schema. The user role and user Id are
  used directly from Clerk, so it's not stored in the database.
- Sections and Lessons are shown in the course edition page. Sections can be
  edited directly from the course edition page, but the lessons are not editable
  yet. There's a delete button for the sections, but it doesn't work yet.
- There's a new endpoint to see the lessons by section id.
