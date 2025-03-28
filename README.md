## # Airport App

## Overview

This document serves as a guide and log for the full-stack development of the **Airport App** project. It outlines the tasks completed, testing performed, estimated and actual time spent on tasks, impediments encountered, and new concepts learned.

## PR Submission Checklist

## **Completed Tasks**:

### Backend

- [x]  Set up the Spring Boot project using Spring Initializr.

- [x]  Create entity classes (`Airport`, `Flight`, `Plane`) with JPA annotations.

- [x]  Implement repository interfaces (`AirportRepository`, `FlightRepository`, `PlaneRepository`).

- [x]  Develop service classes (`AirportService`, `FlightService`, `PlaneService`) for business logic.

- [x]  Implement controllers for RESTful API endpoints.
  
  ### Frontend

- [x]  Set up the React project using `create-react-app`.

- [x]  Install necessary dependencies like Material UI, Axios, and React Router DOM.

- [x]  Organize the project structure into folders like `components`, `pages`, `context`, `hooks`, and `services`.

- [ ]  Implement an `ApiContext` to manage API requests, loading states, and errors.

- [ ]  Develop custom hooks like `useAirports`, `useFlights`, and `usePlanes`.

- [x]  Create layout components like `Header`, `Sidebar`, and `Footer` using Material UI.

- [x]  Set up routing using React Router DOM.

## **Testing**:

- [ ]  Unit testing for backend services.

- [ ]  Integration testing for API interactions.

- [ ]  UI testing for frontend components.

## Estimated Time for Tasks

## Backend Part

| Task                            | Estimated Time | Actual Time        | Impediments                                                                         | New Concepts |
| ------------------------------- | -------------- | ------------------ | ----------------------------------------------------------------------------------- | ------------ |
| Set up Spring Boot project      | 1 hour         | 15 min             |                                                                                     |              |
| Create entity classes           | 2 hours        | 2 hours            | Not able to load data through data.sql or create tables automatically from entities |              |
| Implement repository interfaces | 1 hour         | 10 min             |                                                                                     |              |
| Develop service classes         | 2 hours        | 1 hour             |                                                                                     |              |
| Implement controllers           | 2 hours        | 1 hour             |                                                                                     |              |
| **Total**                       | **8 hours**    | **4 hours 25 min** |                                                                                     |              |

## Frontend Part

| Task                       | Estimated Time | Actual Time | Impediments | New Concepts |
| -------------------------- | -------------- | ----------- | ----------- | ------------ |
| Set up React project       | 1 hour         | 1 hour      |             |              |
| Install dependencies       | 30 minutes     | 15 min      |             |              |
| Organize project structure | 1 hour         | 1 hour      |             |              |
| Create components          | -              | 5 hours     |             |              |
| Implement ApiContext       | 2 hours        |             |             |              |
| Develop custom hooks       | 3 hours        |             |             |              |
| Create layout components   | 2 hours        | 1 hour      |             |              |
| Set up routing             | 1 hour         | 1 hour      |             |              |
| **Total**                  | **11 hours**   |             |             |              |

## Error Documentation and Solutions

## Error: `Each child in a list should have a unique "key" prop`

**Corresponding Task:** Rendering airport list items  
**Description:** React throws a warning when rendering array elements without unique keys, impacting component re-renders and DOM stability

**Error Trace:**

- **Component:** AirportList

- **File:** AirportList.js

- **Line:** 67 (airports.map() call)

- **Stack Trace:**
  
  - at div (AirportList.js:67)
  
  - at Box (MUI Container)
  
  - at Paper (MUI Wrapper)

**Causes:** Incorrect data structure handling from API response

**Solution:**

1. **Airports API Response**:
   
   ```js
   const response = await axios.get("/airports"); const responseData = response.data.content || response.data; // Checks for nested data
   ```
   
   - The airports API returns a **paginated response**:
     
     ```json
     { "content": [ { "id": 1, "name": "LAX", "city": "Los Angeles", ... }, { "id": 2, "name": "JFK", "city": "New York", ... } ], "pageable": { ... }, "totalElements": 10, "last": true }
     ```
   
   - The actual array is nested under `content`
   
   - **This requires extracting `response.data.content`**
