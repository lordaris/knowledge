# TODO List

## High Priority

- [ ] Add a login page and a register page.
- [ ] Add a page to show the user profile.
- [ ] Add a page to edit the user profile.
- [ ] Add a page to show the user courses.

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
