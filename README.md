# Documentation

## Project overview

### Project name: Knowledge by Aris

### Purpose

Provide a comprehensive and engaging learning experience on text-based content.
Designed for self-learners who prefer reading over video lectures, offering courses
across various subjects like programming, history, science and more.

### Target Audience

- Self-learners who prefer text-based learning.
- Students and professionals looking for supplementary educational resources.

### Key Features

1. **Course catalog**. Categorized by subjects and difficulty levels.
2. **Interactive Lessons**: Text based lessons with interactive examples,
   quizzes and exercises.
3. **User Authentication**: Secure sign-up and sign-in using Clerk.
4. **Progress Tracking**: Users can track their course progress and receive
   personalized recommendations
   based on their learning history.
5. **Community Forums**: A platform for users to discuss course materials,
   share resources, and collaborate on learning.
6. **Accessibility Features**: High-contrast mode, text-to-speech options,
   and adjustable text sizes for enhanced accessibility.
7. **Mobile Responsive Design**: Ensuring a seamless learning experience
   across various devices.

### Project Goals

- To launch a beta version with 10 complete courses by [Date].
- To reach 1,000 active users within six months of launch.
- To consistently maintain a user satisfaction rate of over 90%.

### Success Metrics

- User engagement rates, including average session duration
  and course completion rates.
- User growth metrics, including sign-up rates and active user counts.
- User feedback and satisfaction surveys following course completion.

### Challenges and Considerations

- Ensuring high-quality, engaging content for text-based learning.
- Balancing technical robustness with ease of use for a diverse user base.
- Implementing effective user authentication and data security measures with Clerk.

## Technology Stack

### Frontend Technologies

- **Next.js**: Selected for its server-side rendering capabilities,
  which enhance SEO and improve performance, especially beneficial
  for a content-rich application like Learnify.
- **React**: Used for building a dynamic and interactive user interface,
  taking advantage of its component-based architecture.
- **TypeScript**: Implemented for its strong typing features,
  which enhance code quality and maintainability.
- **shadcn/ui:** As a design system.

### Backend Technologies

- **Next.js API Routes**: Leveraged for building API endpoints
  within the Next.js framework. This simplifies development by
  using a unified framework for both frontend and backend, eliminating
  the need for a separate Express.js server.
- **MongoDB Atlas**: Chosen as the database solution for its
  scalability and flexibility, particularly suitable for handling
  document-based data structures in a dynamic, text-based learning platform.
- **Mongoose**: Utilized as a MongoDB object modeling tool,
  designed to work in an asynchronous environment
  and simplify interactions with the database.

### Authentication

- **Clerk**: Integrated for robust user authentication
  and management. Clerk provides a seamless and secure
  way to handle user sign-ups, sign-ins, and profile management.
  - Pre-built UI Components: Using Clerk's customizable
    components for user authentication processes.
  - Session Management: Securely managed through Clerk's APIs,
    offering both server-side and client-side integrations.
  - User Data Management: Utilizing Clerk for storing and
    managing user profiles and authentication states.

### Development Tools

- **Git**: For version control, facilitating collaborative
  development and code versioning.
- **ESLint**: To enforce coding standards and detect
  potential issues in JavaScript/TypeScript.
- **Prettier**: An opinionated code formatter to ensure a
  consistent code style across the project.
- **Vercel**: Used for deploying the Next.js application,
  providing seamless integration, automatic deployments,
  and support for serverless functions.

### Additional Libraries and Frameworks

- **Fetch API**: Employed for making HTTP requests from the frontend
  to the backend. The Fetch API is native to modern browsers, eliminating
  the need for additional libraries like Axios.
- **React Query**: Implemented for efficient server state management
  in the frontend, handling data fetching, caching, and state synchronization.

## Authentication Flow

### Overview

This authentication flow combines Clerk's secure authentication
processes with MongoDB Atlas for storing and managing user-specific data, such as course progress, preferences, and additional user details.

### Sign Up Process

1. **User Initiates Sign Up**: The user accesses the
   sign-up page with Clerk's sign-up component.
2. **Data Submission and Validation**: User enters required
   information, which Clerk validates.
3. **Account Creation in Clerk**: Upon successful validation,
   Clerk creates a new user account.
4. **Email Verification**: Clerk sends a verification email.
5. **MongoDB Atlas Integration**:
   - After the account creation in Clerk, a corresponding user
     document is created in the MongoDB Atlas database.
   - This document includes the Clerk user ID and initializes
     fields for user progress and other app-specific data.
6. **Completion**: Post email verification, the user is directed
   to a welcome page or dashboard.

### Sign In Process

1. **Credential Input and Authentication**: The user logs
   in using Clerk's sign-in component.
2. **Session Creation and User Data Retrieval**:
   - Upon successful login, Clerk
     creates a user session.
   - The application fetches user-specific
     data from MongoDB Atlas using the Clerk user ID,
     populating the user's profile, progress, and personalized settings.

### User Session and Data Management

- **Session Handling**: Managed by Clerk for secure authentication.
- **Data Synchronization**: User interactions and progress are regularly updated in MongoDB Atlas, ensuring data consistency between Clerk and the database.
- **Logout Process**: Logging out terminates the session in Clerk and updates the final state in the database.

### Profile and Progress Management

- **Profile Updates**: Users can edit their profiles, with changes reflected in both Clerk and MongoDB Atlas.
- **Progress Tracking**: As users progress through courses, their milestones are recorded in MongoDB Atlas, providing a personalized learning experience.

### Security and Data Integrity

- **Data Encryption and Security**: Sensitive information is encrypted and securely handled by Clerk. MongoDB Atlas also provides robust security features for data storage.
- **Consistency between Systems**: Regular synchronization ensures data consistency between Clerk and MongoDB Atlas.

## Database Schema Overview

### Collections

1. **Users**
2. **Courses**
3. **Sections**
4. **Lessons**
5. **Quizzes**

### Users Collection

- **\_id**: MongoDB's autogenerated unique identifier.
- **clerkUserId**: Unique identifier from Clerk for user authentication linkage.
- **email**: User's email address.
- **name**: User's full name.
- **progress**: An array of objects detailing the user's progress in various courses, sections, and lessons.
- **preferences**: An object to store user-specific settings and preferences.

### Courses Collection

- **\_id**: Unique identifier for each course.
- **title**: Name of the course.
- **description**: A brief overview of the course.
- **sections**: An array of **`ObjectId`** references to
  the **`Section`** model, representing the sections
  within the course.
- **isActive**: Boolean field to indicate whether the
  course is currently active and available.

### Sections Collection

- **\_id**: Unique identifier for each section.
- **title**: Title of the section.
- **description**: A brief overview of the section.
- **courseId**: **`ObjectId`** reference to the corresponding **`Course`**.
- **lessons**: An array of **`ObjectId`** references to the **`Lesson`** model, representing the lessons within the section.

### Lessons Collection

- **\_id**: Unique identifier for each lesson.
- **title**: Title of the lesson.
- **content**: The main textual content of the lesson.

### Quizzes Collection TODO: Add later

- **\_id**: Unique identifier for each quiz.
- **lessonId**: **`ObjectId`** reference to the corresponding **`Lesson`**.
- **questions**: An array of objects, each representing a quiz question with fields for the question text, options, and the correct answer.
- **passingScore**: The minimum score required to pass the quiz.

### **Notes on Schema**

- **Flexibility and Scalability**: This schema is designed to be flexible and scalable, allowing for easy addition of new features or content types in the future.
- **User Progress Tracking**: The **`progress`** field in the Users collection is pivotal for tracking each user's journey through the courses, enabling personalized learning experiences.
- **Referential Integrity**: The use of **`ObjectId`** references ensures referential integrity between different entities, enabling efficient data retrieval and updates.

### **API Documentation Overview**

### Base URL

External: **`https://knowledgebyaris.com/`**
Internal: **`/api/`**

### User Authentication (Managed by Clerk)

- **Sign Up**
  - Endpoint: **`/sign-up`**
  - Method: **`POST`**
  - Description: Registers a new user.
  - Request Body: **`{ email, password }`**
  - Response: **`201 Created`** with user details or **`400 Bad Request`** on failure.
- **Sign In**
  - Endpoint: **`/sign-in`**
  - Method: **`POST`**
  - Description: Authenticates a user.
  - Request Body: **`{ email, password }`**
  - Response: **`200 OK`** with session details or **`401 Unauthorized`** on failure.

### Courses

- **List All Courses**
  - Endpoint: **`/courses`**
  - Method: **`GET`**
  - Description: Retrieves a list of all available courses.
  - Response: **`200 OK`** with an array of courses.
- **Get Course Details**
  - Endpoint: **`/courses/{courseId}`**
  - Method: **`GET`**
  - Description: Retrieves detailed information about a specific course.
  - Path Parameter: **`courseId`**
  - Response: **`200 OK`** with course details or **`404 Not Found`** if not existing.

### Sections

- **Get Sections of a Course**
  - Endpoint: **`/courses/{courseId}/sections`**
  - Method: **`GET`**
  - Description: Retrieves sections of a specific course.
  - Path Parameter: **`courseId`**
  - Response: **`200 OK`** with an array of sections or **`404 Not Found`** if course not found.

### Lessons

- **Get Lessons of a Section**
  - Endpoint: **`/sections/{sectionId}/lessons`**
  - Method: **`GET`**
  - Description: Retrieves lessons in a specific section.
  - Path Parameter: **`sectionId`**
  - Response: **`200 OK`** with an array of lessons or **`404 Not Found`** if section not found.

### User Progress

- **Update User Progress**
  - Endpoint: **`/users/{userId}/progress`**
  - Method: **`PUT`**
  - Description: Updates the progress of a user in a course or lesson.
  - Path Parameter: **`userId`**
  - Request Body: **`{ courseId, lessonId, progress }`**
  - Response: **`200 OK`** on successful update or **`404 Not Found`** if user/course not found.

### Error Handling

- Each endpoint should provide meaningful error messages and status codes for various failure scenarios, such as **`400 Bad Request`** for validation errors, **`401 Unauthorized`** for authentication failures, and **`500 Internal Server Error`** for unexpected issues.

### **Notes on API Documentation**

- **Versioning**: Consider versioning your API (e.g., **`/api/v1/`**) to manage changes and maintain backward compatibility.
- **Security**: Ensure that all endpoints are secured as needed, particularly those that access or modify user data.
- **Consistency**: Maintain a consistent format and naming convention across all API endpoints for ease of use and understanding.

## Development Roadmap

### Phase 1: Planning and Design (Duration: X Weeks)

1. **Requirements Gathering**
   - Define project scope and objectives.
   - Identify key features and functionalities.
2. **Technology Stack Decision**
   - Finalize the choice of technologies for frontend, backend, and database.
3. **UI/UX Design**
   - Create wireframes and mockups for the user interface.
   - Design user flow and experience.
4. **Database Schema Design**
   - Define the database models and relationships.
5. **API Design**
   - Outline the structure of the RESTful API.
6. **Project Setup**
   - Initialize the code repository and set up development environments.

### Phase 2: Development (Duration: Y Months)

1. **Frontend Development**
   - Implement UI components.
   - Integrate Clerk for authentication.
   - Develop client-side logic.
2. **Backend Development**
   - Set up Next.js API routes.
   - Implement business logic for courses, lessons, and user progress.
   - Integrate with MongoDB Atlas.
3. **Testing**
   - Write unit and integration tests.
   - Perform manual testing and bug fixing.
4. **Documentation**
   - Document the codebase and API usage.

### Phase 3: Testing and Deployment (Duration: Z Weeks)

1. **User Testing**
   - Conduct beta testing with a selected user group.
   - Gather feedback and iterate on the product.
2. **Deployment**
   - Set up the production environment.
   - Deploy the application to a hosting platform (e.g., Vercel).
3. **Final Testing**
   - Perform final round of testing in the production environment.

### Phase 4: Launch and Post-Launch Activities (Duration: Post-Launch)

1. **Launch**
   - Officially release the application to the public.
   - Monitor for any immediate issues.
2. **Marketing and Promotion**
   - Execute marketing and promotional strategies.
3. **Post-Launch Support**
   - Monitor application performance.
   - Provide user support and address any issues.
4. **Iterative Improvements**
   - Plan for regular updates based on user feedback.
   - Continuously improve and add new features.

### Milestones and Tasks Tracking

- Each phase should have specific deadlines and responsible team members.
- Regular meetings and updates to track progress and address challenges.
- Use project management tools (e.g., Jira, Trello) for task assignments and progress tracking.

### **Considerations**

- **Flexibility**: The roadmap should be flexible to accommodate changes and unforeseen challenges.
- **Stakeholder Involvement**: Regularly update and involve stakeholders in major decisions and progress reviews.
- **Quality Assurance**: Emphasize on testing and quality assurance throughout the development process.

## Testing Plan for "Knowledge by Aris"

### 1. Unit Testing

- **Objective**: To test individual components or functions in isolation to ensure they work correctly.
- **Tools**: Utilize testing frameworks like Jest for JavaScript/TypeScript.
- **Scope**:
  - Frontend: Test individual React components, utility functions, and hooks.
  - Backend: Test API route handlers, middleware, and helper functions.
- **Methodology**:
  - Write tests that cover expected outputs for given inputs.
  - Include edge cases and error handling scenarios.
- **Execution**:
  - Integrate unit tests into the development process.
  - Run tests continuously during development to catch issues early.

### 2. Integration Testing

- **Objective**: To test the interaction between integrated units/modules to detect interface defects.
- **Tools**: Use Jest along with testing libraries like React Testing Library for frontend integration tests.
- **Scope**:
  - Test interactions between different React components.
  - Test integration between frontend components and backend API routes.
- **Methodology**:
  - Create tests that mimic user interactions and data flow through the application.
  - Focus on critical paths that users are most likely to follow.
- **Execution**:
  - Perform integration testing after completing related unit tests.
  - Ensure that the integrated units work together as expected.

### 3. End-to-End Testing

- **Objective**: To test the entire application flow from start to finish in an environment that simulates real user scenarios.
- **Tools**: Utilize tools like Cypress or Playwright for browser-based end-to-end testing.
- **Scope**:
  - Test the complete flow of critical features like user registration, course enrollment, lesson progression, and quiz completion.
- **Methodology**:
  - Create test scripts that simulate real user actions and interactions with the application.
  - Test both happy paths and user error scenarios.
- **Execution**:
  - Conduct end-to-end testing after integration tests are stable.
  - Test in an environment that closely resembles the production setup.

### 4. Performance Testing (Optional, but recommended)

- **Objective**: To ensure the application performs well under expected load conditions.
- **Tools**: Use tools like Lighthouse for frontend performance and load testing tools for backend/API performance.
- **Scope**:
  - Test load times, response times, and resource usage under varying load conditions.
- **Methodology**:
  - Determine performance benchmarks and thresholds.
  - Simulate different levels of user traffic and interactions.
- **Execution**:
  - Perform performance testing in the later stages of development or during the release candidate phase.

### 5. Accessibility Testing

- **Objective**: To ensure the application is accessible to users with disabilities.
- **Tools**: Utilize tools like Axe or Wave for automated accessibility testing.
- **Scope**:
  - Test for compliance with WCAG (Web Content Accessibility Guidelines) standards.
- **Methodology**:
  - Conduct both automated and manual testing for accessibility.
  - Focus on key areas like navigation, content readability, and interactive elements.
- **Execution**:
  - Integrate accessibility testing into the development and QA process.

### Testing Best Practices

- **Automate Where Possible**: Automate repetitive tests to save time and reduce human error.
- **Continuous Testing**: Integrate testing into the CI/CD pipeline for continuous feedback.
- **Documentation**: Document all tests, including their purpose and outcomes.
- **Regular Reviews**: Regularly review and update test cases to reflect changes in the application.
