# Goal Tracker
- Course: Web/mobile Development 
- Assignement 1: Time Tracking App

## Getting started

```bash
git clone git@github.com/kevlio/goal-tracker
cd goal-tracker
npm install
npm start
```

## Available Scripts

### Run application

```bash
npm start
```

Runs client on [http://localhost:5173](http://localhost:5173) and development server on [http://localhost:3000](http://localhost:3000)

### Run client

```bash
npm run dev
```

Runs app in the development mode on [http://localhost:5173](http://localhost:5173)

### Run development server

```bash
npm run server
```

Runs development server ([json-server](https://github.com/typicode/json-server)) on [http://localhost:3000](http://localhost:3000)


### Dependencies

- [chakra-ui](https://github.com/chakra-ui/chakra-ui) - ui library
- [react-icons](https://github.com/react-icons/react-icons) - icon components
- [dayjs](https://github.com/iamkun/dayjs/) - date parsing and formatting
- [timer-node](https://github.com/eyas-ranjous/timer-node) - timestamp recording
- [axios](https://github.com/axios/axios) - http requests

### DevDependencies

- [vite](https://github.com/vitejs/vite)
- [json-server](https://github.com/typicode/json-server)


### Library motivations

A) I have chosen [chakra-ui](https://chakra-ui.com/) as my ui-component library because:

1. Fast to set up a decent UI-experience
2. Intuitive inline styling and nice components
3. Useful hooks ex. useDisclosure for open/close scenarios
4. Drawbacks: customisation styling is a challenge =)  

B) I started this project without any utility libraries, writing functions for formatting, parsing dates/times etc. I realised somewhere in the middle that:
1) Working with dates is not as easy as I thought =)
2) Value of libraries such as [dayjs](https://github.com/iamkun/dayjs/), which basically does whatever you want with dates, and improves overall code quality and readability
3) [timer-node](https://github.com/eyas-ranjous/timer-node) provides really nice functionalites to work with elapsed time

### Types

Data is stored in the following format:

#### Users

```ts
id: string;             // uuidv4()
username: string;       // Project name
```

#### Projects

```ts
id: string;             // uuidv4()
name: string;           // Project name
user_id: string;        // Current userID/anonymous
description: string;    // Project description
color: string;          // CSS hex color
isDone: boolean         // Project completion(initial value false)
deadline: string;       // Project deadline (not fully implemented)

```

#### Tasks

```ts
id: string;             // uuidv4()
name: string;           // Task name
projectId: string;      // id of parent Project
user_id: string;        // Current userID/anonymous
color: string;          // CSS hex color
isDone: boolean         // Task completion
deadline: string;       // Project deadline (not fully implemented)
```

#### Timelogs

```ts
id: string;             // uuidv4()
taskId: string;         // id of parent Task
project_id: string;     // id of parent Project
user_id: string;        // Current userID/anonymous
startDate: string;      // start time, ISO 8601
stopDate: string;       // stop time, ISO 8601 
```

#### Requirements (General)

- Mobile First
- Pages: Timer, Calendar, Overview
- Overview" page should contain two "tabs", one for projects and one for tasks
- Main navigation menu fixed at the bottom and show page active 
- React Router for routing
- Projects/Tasks should be added from a separate page (ex. modal)
- Time displayed on the timing page should "tick" when active.
- Include a README.md where you redo your (1) way of styling the application, as well as any npm packages you chose to use and why.

#### Requirements (Tech Stack)
- React
- React Context
- Use "[json-server](https://github.com/typicode/json-server)" (full fake REST API with a json file as a database, super awesome work by  [typicode](https://github.com/typicode)) 

#### Requirements (Pass)
- Create a project
- Create a task linked to a project
- Start a timer for a task
- Stop a timer
- See a list of timelogs for a specific date
- See a list of projects
- See a list of tasks
- Delete a timer
- Delete a task
- Delete a project

#### Requirements (Pass with distinction)
- Be able to select a time span instead of just a specific date in the Calendar/History view. (Date & Time)
- Be able to create a user and store user timelogs/tasks/projects
- If a timer is active and the page is reloaded/closed and reopened later, it should resume showing the time from when it was first started.

### Future improvements
- Admin site
- Auth User, routes
- Improvement of Timer page 
- Different calender modes
- Deadlines, format, sorting
- Sort Tasks by Project
- Set time goals
- Data structure
- Try more json-server functionalities
- Filters
- UI, general, calender
- Linter

