
# Extinct Animal Tracker


**Extinct Animal Tracker** is a web application that provides visual insights into **threatened species** across the globe, focusing on species that could potentially go extinct in the future. The goal is to raise awareness about endangered species and provide users with a dynamic tool to explore their geographical distribution and conservation status.

The project is built using **React.js** as the core framework, leveraging **Chart.js** and **chartjs-chart-geo** to display geographical data in an interactive, visual format. These libraries allow for seamless rendering of maps and charts, providing users with a clear understanding of the regions affected by species decline.

Currently, the application features one visualization built with Chart.js. However, we plan to expand the platform by incorporating **D3.js** in future updates, enabling even more complex and interactive visualizations, such as animated transitions, data-driven visuals, and real-time updates.

## Features

- **Interactive Map**: Visualize the regions where species have gone extinct using geographical data charts.
- **Species Data**: Display and analyze data from the IUCN Red List on extinct species.
- **Customizable Views**: Users can zoom in and out of geographical regions and filter data based on criteria like time 
  period and species type. (FUTURE)
- **Responsive Design**: Works seamlessly across various devices and screen sizes.( FUTURE)

## Tech Stack

- **Frontend**: [React.js](https://reactjs.org/) – a popular JavaScript library for building user interfaces.
- **Data Visualization**: 
  - [Chart.js](https://www.chartjs.org/) – a simple, flexible JavaScript charting library.
  - [chartjs-chart-geo](https://github.com/sgratzl/chartjs-chart-geo) – a plugin for Chart.js to plot geographic data.
  - [D3.js](https://d3js.org/) – a powerful JavaScript library for creating interactive and dynamic visualizations (planned for future updates).

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
   npm start
   ```

   The app should now be running on `http://localhost:3000`.

## Usage

- Once the app is running, users can navigate through the map and explore threatened species' distribution by region.
- Use the filters to refine the data based on specific animal categories or regions of interest.(Future)

## Key Dependencies

- **React.js**: Provides the framework for building user interfaces and managing the application's state.
- **Chart.js**: Used to render interactive charts and graphs.
- **chartjs-chart-geo**: Adds support for geographical data visualization in Chart.js.

## Contributing

If you would like to contribute to the development of this project, please follow these steps:

1. Fork the repository.
2. Create a new branch for your feature or bugfix.
3. Submit a pull request with a clear explanation of your changes.

## License

This project is licensed under the MIT License – see the [LICENSE](./LICENSE) file for details.

## Acknowledgements

- **IUCN Red List** for providing data on extinct species.
- **React.js, Chart.js, and chartjs-chart-geo** for the tools to build this project.

