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
