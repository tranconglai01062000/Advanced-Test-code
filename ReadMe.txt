1. Page 1: Filter Data and User Details Popup
Function:
Displays a list of users.
Filters data with custom search conditions.
Sorts data by column.
Popup displays user details when clicking on a name or data row.
Technology:
React Table: To display and sort the data table.
Material-UI Dialog/Modal: To display the details popup.
2. Page 2: Analyze data with charts
Function:
Filter data with search conditions (gender, age, region).
Displays three types of charts:
Gender chart: Number of users by gender (male/female).
Age chart: Age distribution by age group (10–19, 20–29, etc.).
Area chart: Distribution of users by geographic region.
Technology:
Recharts or Chart.js: To draw charts.
Material-UI Select or Checkbox: To select data filters.
3. Page 3: User Map
Function:
Show users on Google Maps based on coordinates (latitude, longitude).
When zooming out the map: Show total number of users in the area.
When zooming in: Show points representing each user.
Show details when hovering over a point on the map.
Technology:
Google Maps API: To show map and markers.
Material-UI Tooltip: To show user details when hovering.