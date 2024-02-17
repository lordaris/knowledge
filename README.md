# Knowledge (By Aris)

<!--toc:start-->

- [Knowledge (By Aris)](#knowledge-by-aris)
  - [Purpose](#purpose)
  - [Target Audience](#target-audience)
  - [Technology stack](#technology-stack)
    - [Frontend Technologies](#frontend-technologies)
    - [Backend Technologies](#backend-technologies)
    - [Authentication](#authentication)
    - [Development Tools](#development-tools)
    - [Additional Libraries and Frameworks](#additional-libraries-and-frameworks)
  - [Database Schema Overview](#database-schema-overview)
    - [Collections](#collections)
    - [Courses Collection](#courses-collection)
    - [Sections Collection](#sections-collection)
    - [Lessons Collection](#lessons-collection)
  - [API Documentation Overview](#api-documentation-overview)
    - [Base URL](#base-url)
    - [User Authentication (Managed by Clerk)](#user-authentication-managed-by-clerk)
    - [Courses](#courses)
    - [Sections](#sections)
    - [Lessons](#lessons)
    - [Error Handling](#error-handling)
    - [Notes on API Documentation](#notes-on-api-documentation)
  - [How to run the project locally (Development Mode)](#how-to-run-the-project-locally-development-mode)
  <!--toc:end-->

## Purpose

Provide a comprehensive and engaging learning experience on text-based content.
Designed for self-learners who prefer reading over video lectures, offering
courses across various subjects like programming, history, science and more.

## Target Audience

- Self-learners who prefer text-based learning.
- Students and professionals looking for supplementary educational resources.

## Technology stack

### Frontend Technologies

- **Next.js**: Selected for its server-side rendering capabilities, which
  enhance SEO and improve performance, especially beneficial for a content-rich
  application like Knowledge by Aris
- **React**: Used for building a dynamic and interactive user interface, taking
  advantage of its component-based architecture.
- **TypeScript**: Implemented for its strong typing features, which enhance code
  quality and maintainability.
- **shadcn/ui:** As a design system for building the user interface.

### Backend Technologies

- **Next.js API Routes**: Leveraged for building API endpoints within the
  Next.js framework. This simplifies development by using a unified framework
  for both frontend and backend, eliminating the need for a separate Express.js
  server.
- **MongoDB Atlas**: Chosen as the database solution for its scalability and
  flexibility, particularly suitable for handling document-based data structures
  in a dynamic, text-based learning platform.
- **Mongoose**: Utilized as a MongoDB object modeling tool, designed to work in
  an asynchronous environment and simplify interactions with the database.

### Authentication

- **Clerk**: Integrated for robust user authentication and management. Clerk
  provides a seamless and secure way to handle user sign-ups, sign-ins, and
  profile management.
  - Pre-built UI Components: Using Clerk's customizable components for user
    authentication processes.
  - Session Management: Securely managed through Clerk's APIs, offering both
    server-side and client-side integrations.
  - User Data Management: Utilizing Clerk for storing and managing user profiles
    and authentication states.

### Development Tools

- **Git**: For version control, facilitating collaborative development and code
  versioning.
- **ESLint**: To enforce coding standards and detect potential issues in
  JavaScript/TypeScript.
- **Prettier**: An opinionated code formatter to ensure a consistent code style
  across the project.
- **Vercel**: Used for deploying the Next.js application, providing seamless
  integration, automatic deployments, and support for serverless functions.
- **Zustand**: For state management.
- **Zod**: For data validation.

### Additional Libraries and Frameworks

- **Fetch API**: Employed for making HTTP requests from the frontend to the
  backend. The Fetch API is native to modern browsers, eliminating the need for
  additional libraries like Axios.

## Database Schema Overview

### Collections

1. **Courses**
2. **Sections**
3. **Lessons**

### Courses Collection

- **\_id**: Unique identifier for each course.
- **title**: Name of the course.
- **description**: A brief overview of the course.
- **category**: The subject category of the course (e.g., programming, history,
  science).
- **sections**: An array of **`ObjectId`** references to the **`Section`**
  model, representing the sections within the course. course is currently active
  and available.
- **createdBy**: **`ObjectId`** reference to the **`User`** who created the
  course.

### Sections Collection

- **\_id**: Unique identifier for each section.
- **title**: Title of the section.
- **description**: A brief overview of the section.
- **courseId**: **`ObjectId`** reference to the corresponding **`Course`**.
- **lessons**: An array of **`ObjectId`** references to the **`Lesson`** model,
  representing the lessons within the section.

### Lessons Collection

- **\_id**: Unique identifier for each lesson.
- **title**: Title of the lesson.
- **content**: The main textual content of the lesson.
- **sectionId**: **`ObjectId`** reference to the corresponding **`Section`**

## API Documentation Overview

### Base URL

External: **`https://knowledgebyaris.com/`** Internal: **`/api/`**

### User Authentication (Managed by Clerk)

- **Sign Up**
- **Sign In**

### Courses

- `/api/courses/:courseId`
  - `GET`: Get a course by course Id
  - `PUT`: Update a course by course Id
  - `DELETE`: Delete a course.
- `/api/courses`
  - `GET`: Get a list of courses.
  - `POST`: Create a new course.
- `/api/courses/instructor/:instructorId`
  - `GET`: Get a list of courses by instructor Id.

### Sections

- `/api/courses/:courseId/sections`
  - `POST`: Create a section for a course.
- `/api/sections/:sectionId`
  - `GET`: Get a section with its lessons
  - `PUT`: Update a section
  - `DELETE`: Delete a section

### Lessons

- `/api/sections/:sectionId/lessons`
  - `POST`: Create a lesson for a section.
  - `GET`: Get a list of lessons for a section.
- `/api/lessons/:lessonId`
  - `GET`: Get a lesson from Id
  - `PUT`: Update a lesson
  - `DELETE`: Delete a lesson

### Error Handling

- Each endpoint should provide meaningful error messages and status codes for
  various failure scenarios, such as **`400 Bad Request`** for validation
  errors, **`401 Unauthorized`** for authentication failures, and
  **`500 Internal Server Error`** for unexpected issues.

### Notes on API Documentation

- **Security**: Ensure that all endpoints are secured as needed, particularly
  those that access or modify user data.
- **Consistency**: Maintain a consistent format and naming convention across all
  API endpoints for ease of use and understanding.

## How to run the project locally (Development Mode)

1. Clone the repository `git clone git@github.com:lordaris/knowledge.git`
2. Install the dependencies by running `npm install` in the root directory.
3. Create a `.env.local` file in the root directory and add the following
   environment variables: `MONGODB_URI=<your-mongodb-uri>`
   NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY= `<your-clerk-publishable-key>`
   CLERK_SECRET_KEY=`<your-clerk-secret-key>`
4. Run the development server using `npm run dev`.
