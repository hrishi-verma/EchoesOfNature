
# Extinct Animal Tracker


**Extinct Animal Tracker** is a web application that provides visual insights into **threatened species** across the globe, focusing on species that could potentially go extinct in the future. The goal is to raise awareness about endangered species and provide users with a dynamic tool to explore their geographical distribution and conservation status.

The project is built using **React.js** as the core framework, leveraging**D3** && **Chart.js** to display geographical data in an interactive, visual format. These libraries allow for seamless rendering of maps and charts, providing users with a clear understanding of the regions affected by species decline.

There are total 5 visualizations in the Project

## Features

- **Interactive Map**: Visualize the regions where species have gone extinct using geographical data charts.
- **Line Chart**: The line chart provides a detailed view of the historical extinction rates of species over time. .
- **Bar chart**: The bar graph visualizes the extinction rates of species over time, helping users understand the trends in species extinction and the critical need for conservation action. 
- **pie chart**: The pie chart visualization provides a detailed breakdown of the different types of animal species at risk in a selected country.
- **Stacked Bar chart**: This graph provides a stacked bar chart visualization of the number of threatened species across various biological categories (e.g., Mammals, Birds, Reptiles) for selected countries.

## Tech Stack

- **Frontend**: [React.js](https://reactjs.org/) – a popular JavaScript library for building user interfaces.
- **Data Visualization**: 
  - [D3.js](https://d3js.org/) – a powerful JavaScript library for creating interactive and dynamic visualizations (used for 3 visualizations).
  - [Chart.js](https://www.chartjs.org/) – a simple, flexible JavaScript charting library. (used for 2 visualizayions)

- **Backend**:
  - [Node.js](https://nodejs.org/en/) – JavaScript runtime required to run the application locally and manage dependencies.

## Installation

1. **Clone the repository**:

   ```bash
   git clone https://github.com/dataviscourse2024/group-project-extinct-animal-tracker.git
   cd group-project-/extinct-animal-tracker
   ```

2. **Install dependencies**:

   Ensure that you have Node.js installed. Run the following command to install the required packages:

   ```bash
   npm install
   ```

3. **Start the development server**:

   After installation, start the local development server:

   ```bash
   npm run start
   ```

   The app should now be running on `http://localhost:3000`.

## Usage

- Once the app is running, users can navigate through the map and explore threatened species' distribution by region.
- Use the filters to refine the data based on specific animal categories or regions of interest.(Future)

## Key Dependencies

- **React.js**: Provides the framework for building user interfaces and managing the application's state.
- **Chart.js**: Used to render interactive charts and graphs.

## Contributing

If you would like to contribute to the development of this project, please follow these steps:

1. Fork the repository.
2. Create a new branch for your feature or bugfix.
3. Submit a pull request with a clear explanation of your changes.

## Data Files

If you want to view the data have a look at a file by the name datajson.js in src folder.

## Acknowledgements

- **IUCN Red List** for providing data on threatened species.
- **United nations SDG Goal 15.5.1** for providing data on threatened species for their rate of extinction.

