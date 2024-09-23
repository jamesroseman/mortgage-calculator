# Mortgage Calculator Application

## Prerequisites

Before you can set up and run this project, ensure you have the following installed:

- **Node.js** (version 14.x or higher)
- **npm** (comes with Node.js)
- **Angular CLI** (globally installed)
  ```bash
  npm install -g @angular/cli
  ```

---

## Installation

1. **Clone the Repository**:
   ```bash
   git clone https://github.com/your-username/mortgage-calculator.git
   cd mortgage-calculator
   ```

2. **Install Dependencies**:
   After cloning the repository, install the required dependencies using `npm`:
   ```bash
   npm install
   ```

---

## Running the Application

1. **Start the Development Server**:
   Run the following command to start the application in development mode:
   ```bash
   ng serve
   ```

2. **Access the Application**:
   Once the server starts, open a web browser and navigate to:
   ```
   http://localhost:4200
   ```

---

## Running Tests

This application includes unit tests for both components and services.

1. **Run the Unit Tests**:
   To execute the unit tests, run:
   ```bash
   ng test
   ```

   This will run the tests using Karma and display the results in your default web browser.

2. **Running Specific Tests**:
   You can also filter the tests by running only the relevant test files or components. For more information, refer to the Angular testing documentation.

---

## Project Structure

Below is a brief overview of the project structure:

```
src/
  ├── app/
  │   ├── calculator/
  │   │   ├── calculator.component.ts      # Calculator logic
  │   │   ├── calculator.component.html    # Calculator UI
  │   │   ├── calculator.component.sass    # Calculator styling
  │   │   └── calculator.component.spec.ts # Unit tests for calculator
  │   ├── results/
  │   │   ├── results.component.ts         # Results logic
  │   │   ├── results.component.html       # Results UI
  │   │   ├── results.component.sass       # Results styling
  │   │   └── results.component.spec.ts    # Unit tests for results
  │   ├── mortgage.service.ts              # Shared service for managing data
  │   └── mortgage.service.spec.ts         # Unit tests for service
```

---

## Notes

- This is a development setup. For a production build, use:
  ```bash
  ng build --prod
  ```
  This will create an optimized build for deployment.
