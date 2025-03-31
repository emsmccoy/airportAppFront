# Airport App

## Overview

This document serves as a guide and log for the full-stack development of the **Airport App** project. It outlines the tasks completed, testing performed, estimated and actual time spent on tasks, impediments encountered, and new concepts learned.

**Unsplash API** has been used for fetching images for the airports. Documentation regarding this can be found below.

# **Tasks**

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
| Create components          | -              | 7 hours     |             |              |
| Implement ApiContext       | 2 hours        |             |             |              |
| Develop custom hooks       | 3 hours        |             |             |              |
| Create layout components   | 2 hours        | 1 hour      |             |              |
| Set up routing             | 1 hour         | 1 hour      |             |              |
| **Total**                  | **11 hours**   |             |             |              |

# Error Documentation and Solutions

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

# **Unsplash API Documentation**

## **1. Overview**

- **Purpose**: The Unsplash API has been integrated into the project to fetch high-quality images for each airport listed in the application, enhancing the visual appeal and user experience.

## **2. Getting Started**

- **Register as a Developer**:
  
  - Visit the Unsplash website and sign up as a developer to gain access to the API.

- **Register Your Application**:
  
  - After logging in, navigate to the Developers page and click "New Application" to register your application. Initially, your application will be in **Demo Mode** with a limit of 50 requests per hour. To increase this limit, you'll need to request approval by providing screenshots of your application's use of Unsplash photos.

## **3. Environment Setup**

- **Create `.env` File**:
  
  - In your project, create an `.env` file to store sensitive information like API keys. For Vite, the environment variable should be named `VITE_UNSPLASH_ACCESS_KEY`.

- **Include Access Key**:
  
  - Add your Unsplash API access key to the `.env` file:
    
    text
    
    `VITE_UNSPLASH_ACCESS_KEY=YOUR_ACCESS_KEY`

## **4. API Integration**

- **Fetching Images**:
  
  - Use the `useEffect` hook to fetch images when the airports data changes:
    
    ```jsx
      useEffect(() => {
        const fetchImages = async () => {
          const images = await Promise.all(airports.map(airport => fetchUnsplashImage(airport.city)));
          setAirportImages(images);
        };
        if (airports.length > 0) {
          fetchImages();
        }
      }, [airports]);
    ```
  
  - **Function to Fetch Images**:
    
    - Define a function to fetch images from Unsplash.
    
    ```jsx
      const fetchUnsplashImage = async (searchTerm) => {
        try {
          const response = await axios.get(
            `https://api.unsplash.com/search/photos`,
            {
              params: { query: searchTerm, per_page: 1 },
              headers: {
                Authorization: `Client-ID ${import.meta.env.VITE_UNSPLASH_ACCESS_KEY}`
              }
            }
          );
          return response.data.results[0]?.urls?.regular || '';
        } catch (error) {
          console.error('Error fetching image from Unsplash:', error);
          return ''; 
        }
      };
    ```

- **Using Images in Render**:
  
  - In the render method, use the correct image URL from the `airportImages` state array by matching the index with the airport:
    
    ```jsx
    
      return (
        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2, p: 3 }}>
          {airports.map((airport, index) => (
            <Box key={airport.id} sx={{ flex: '1 1 calc(33.333% - 16px)', maxWidth: 'calc(33.333% - 16px)' }}>
              <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
                <CardMedia
                  component="img"
                  height="200"
                  image={airportImages[index] || ''}
                  alt={`${airport.name} image`}
                  sx={{ objectFit: 'cover' }}
                />
    
      
              {/* rest of the render */}
    
      
              </Card>
            </Box>
          ))}
        </Box>
      );
    ```
