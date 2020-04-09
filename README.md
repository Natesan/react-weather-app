## Weather Now

### Description

- Weather application which lists a set of cities in the United States
- App should be able to provide the weather information for the next 10 days of a selected city (this has been limited to 5 days due to API limitation apart from the current date)
- Selected city should maintain stickiness across the browser sessions
- App should be responsive with the cards being stacked on portrait mode and placed horizontally when in landscape mode

### High Level Design:

- Components used in the app are Title, Form, Cities, WeatherInfoContainer and WeatherInfoCard
- API for the weather information was provided by Open Weather Map this provides forecast details for the upcoming 5 days along with the current date
- Forecasted city would be retained in the browser storage and retrieved on subsequent visits

### Detailed Design:

- Built the app using react functional components with hooks to handle state and other life cycle methods
- App component acts as the core parent component of application, it takes care of loading the initial state, data communication and also handles how the data gets propagated to various underlying components
- Functionalities are built in a plug and play fashion where the WeatherInfoCard is only responsible to render the forecast information of a particular day and nothing else
- Initial state of the application is set by looking up the browser storage for any pre-selected city for which the forecast can be fetched
- Every successful forecast is then updated back to the storage so that the subsequent visits would be handled accordingly
- Error handling is in place to address various scenarios like weather information for a given city is not available, or if no selection has been made et cetera.
- Bootstrap was used to style the page based on the requirement and it was kept light weight without adding any additional resources
- Kept the layout of the application simple to have any modification or enhancement in future to evolve the layout as required

### Front End Implementation:

- HTML
- CSS
- React

### API Details:

- https://api.openweathermap.org/data/2.5/forecast

### Application Link:

Link to the Application hosted on Netlify [react-weather-now-app.netlify.com](https://react-weather-now-app.netlify.com/)

### How to Run the Application:

Clone the repo and setup the application

```shell
# clone the git repo
git clone https://github.com/Natesan/react-weather-app.git

cd metadata-driven-portfolio/
npm install
npm start

```

### Advanced Features (To be built):

- Advanced search for cities
- Geo Location API integration
- Celsius to Fahrenheit Conversion
- Sharable Content
- Offline Mode
- Include middleware to store the cities which the user accessed frequently
