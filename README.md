# Knowledge (By Aris)

<!--toc:start-->

- [Knowledge (By Aris)](#knowledge-by-aris)
  - [Purpose](#purpose)
  - [Target Audience](#target-audience)
  - [Key Features](#key-features)
  - [Technology Stack](#technology-stack)
    - [Frontend Technologies](#frontend-technologies)
    - [Backend Technologies](#backend-technologies)
    - [Authentication](#authentication)
    - [Development Tools](#development-tools)
    - [Additional Libraries and Frameworks](#additional-libraries-and-frameworks)
  - [Database Schema Overview](#database-schema-overview)
    - [Collections](#collections)
    - [Users Collection](#users-collection)
    - [Courses Collection](#courses-collection)
    - [Sections Collection](#sections-collection)
    - [Lessons Collection](#lessons-collection)
  - [**API Documentation Overview**](#api-documentation-overview) -
  [Base URL](#base-url) -
  [User Authentication (Managed by Clerk)](#user-authentication-managed-by-clerk) -
  [Courses](#courses) - [Sections](#sections) - [Lessons](#lessons) -
  [Error Handling](#error-handling) -
  [**Notes on API Documentation**](#notes-on-api-documentation)
  <!--toc:end-->

## Purpose

Provide a comprehensive and engaging learning experience on text-based content.
Designed for self-learners who prefer reading over video lectures, offering
courses across various subjects like programming, history, science and more.

## Target Audience

- Self-learners who prefer text-based learning.
- Students and professionals looking for supplementary educational resources.

## Key Features

1. **Course catalog**. Categorized by subjects
2. **Interactive Lessons**: Text based lessons with interactive examples,
   quizzes and exercises.
3. **User Authentication**: Secure sign-up and sign-in using Clerk.
4. **Progress Tracking**: Users can track their course progress and receive
   personalized recommendations based on their learning history.
5. **Accessibility Features**: High-contrast mode, text-to-speech options, and
   adjustable text sizes for enhanced accessibility.
6. **Mobile Responsive Design**: Ensuring a seamless learning experience across
   various devices.

## Technology Stack

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

### Additional Libraries and Frameworks

- **Fetch API**: Employed for making HTTP requests from the frontend to the
  backend. The Fetch API is native to modern browsers, eliminating the need for
  additional libraries like Axios.

## Database Schema Overview

### Collections

1. **Users**
2. **Courses**
3. **Sections**
4. **Lessons**

### Users Collection

- **\_id**: MongoDB's autogenerated unique identifier.
- **clerkUserId**: Unique identifier from Clerk for user authentication linkage.
- **email**: User's email address.
- **name**: User's full name.

### Courses Collection

- **\_id**: Unique identifier for each course.
- **title**: Name of the course.
- **description**: A brief overview of the course.
- **sections**: An array of **`ObjectId`** references to the **`Section`**
  model, representing the sections within the course. course is currently active
  and available.

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

### A note on API endpoints

I don't really like the RESTful approach for this project, because it doesn't
make much sense to me to have an unnecessary path variable for some of the
endpoints, as the ids are different for each collection. I'll stick with it for
now as it's the standard and it may be useful in the future.

### Base URL

External: **`https://knowledgebyaris.com/`** Internal: **`/api/`**

### User Authentication (Managed by Clerk)

- **Sign Up**

  - Endpoint: **`/sign-up`**
  - Method: **`POST`**
  - Description: Registers a new user.
  - Request Body: **`{ email, password }`**
  - Response: **`201 Created`** with user details or **`400 Bad Request`** on
    failure.

- **Sign In**
  - Endpoint: **`/sign-in`**
  - Method: **`POST`**
  - Description: Authenticates a user.
  - Request Body: **`{ email, password }`**
  - Response: **`200 OK`** with session details or **`401 Unauthorized`** on
    failure.

### Courses

- [x] List All Courses

  - Endpoint: **`/courses`**
  - Method: **`GET`**
  - Description: Retrieves a list of all available courses.
  - Response: **`200 OK`** with an array of courses.

- [x] Get Course Details

  - Endpoint: **`/courses/{courseId}`**
  - Method: **`GET`**
  - Description: Retrieves detailed information about a specific course.
  - Path Parameter: **`courseId`**
  - Response: **`200 OK`** with course details or **`404 Not Found`** if not
    existing.

- [x] Create a new course

  - Endpoint: **`/courses`**
  - Method: **`POST`**
  - Description: Creates a new course.
  - Request Body: **`{ title, description }`**
  - Response: **`201 Created`** with course details or **`400 Bad Request`** on
    failure.

- [x] Update a course

  - Endpoint: **`/courses/{courseId}`**
  - Method: **`PUT`**
  - Description: Updates an existing course.
  - Path Parameter: **`courseId`**
  - Request Body: **`{ title, description }`**
  - Response: **`200 OK`** with course details or **`400 Bad Request`** on
    failure.

- [x] Delete a course

  - Endpoint: **`/courses/{courseId}`**
  - Method: **`DELETE`**
  - Description: Deletes an existing course.
  - Path Parameter: **`courseId`**
  - Response: **`200 OK`** or **`400 Bad Request`** on failure.

### Sections

- [x] Add a section to a course

  - Endpoint: **`/courses/{courseId}/sections`**
  - Method: **`POST`**
  - Description: Adds a new section to a specific course.
  - Path Parameter: **`courseId`**
  - Request Body: **`{ title, description }`**
  - Response: **`201 Created`** with course details or **`400 Bad Request`** on
    failure.

- [x] Get a section from a course by id

  - Endpoint: **`/courses/{courseId}/sections/{sectionId}`**
  - Method: **`GET`**
  - Description: Retrieves detailed information about a specific section.
  - Path Parameter: **`sectionId`**
  - Response: **`200 OK`** with section details or **`404 Not Found`** if not
    existing.

- [x] Update a section

  - Endpoint: **`/courses/{courseId}/sections/{sectionId}`**
  - Method: **`PUT`**
  - Description: Updates an existing section.
  - Path Parameter: **`sectionId`**
  - Request Body: **`{ title, description }`**
  - Response: **`200 OK`** with section details or **`400 Bad Request`** on
    failure.

- [x] Delete a section
  - Endpoint: **`/courses/{courseId}/sections/{sectionId}`**
  - Method: **`DELETE`**
  - Description: Deletes an existing section.
  - Path Parameter: **`sectionId`**
  - Response: **`200 OK`** or **`400 Bad Request`** on failure.

### Lessons

- [x] Add a lesson to a section

  - Endpoint: **`/courses/sections/{sectionId}/lessons`**
  - Method: **`POST`**
  - Description: Adds a new lesson to a specific section.
  - Path Parameter: **`sectionId`**
  - Request Body: **`{ title, content }`**
  - Response: **`201 Created`** with section details or **`400 Bad Request`** on
    failure.

- Get a lesson from a section by id

  - Endpoint: **`/courses/sections/{sectionId}/lessons/{lessonId}`**
  - Method: **`GET`**
  - Description: Retrieves detailed information about a specific lesson.
  - Path Parameter: **`lessonId`**
  - Response: **`200 OK`** with lesson details or **`404 Not Found`** if not
    existing.

- Update a lesson

  - Endpoint: **`/courses/sections/{sectionId}/lessons/{lessonId}`**
  - Method: **`PUT`**
  - Description: Updates an existing lesson.
  - Path Parameter: **`lessonId`**
  - Request Body: **`{ title, content }`**
  - Response: **`200 OK`** with lesson details or **`400 Bad Request`** on
    failure.

- Delete a lesson

  - Endpoint: **`/courses/sections/{sectionId}/lessons/{lessonId}`**
  - Method: **`DELETE`**
  - Description: Deletes an existing lesson.
  - Path Parameter: **`lessonId`**
  - Response: **`200 OK`** or **`400 Bad Request`** on failure.

### Error Handling

- Each endpoint should provide meaningful error messages and status codes for
  various failure scenarios, such as **`400 Bad Request`** for validation
  errors, **`401 Unauthorized`** for authentication failures, and
  **`500 Internal Server Error`** for unexpected issues.

### Notes on API Documentation

- **Versioning**: Consider versioning your API (e.g., **`/api/v1/`**) to manage
  changes and maintain backward compatibility.
- **Security**: Ensure that all endpoints are secured as needed, particularly
  those that access or modify user data.
- **Consistency**: Maintain a consistent format and naming convention across all
  API endpoints for ease of use and understanding.

### How to run the project locally (Development Mode)

1. Clone the repository `git clone git@github.com:lordaris/knowledge.git`
2. Install the dependencies by running `npm install` in the root directory.
3. Create a `.env.local` file in the root directory and add the following
   environment variables: `MONGODB_URI=<your-mongodb-uri>`
4. Run the development server using `npm run dev`.
