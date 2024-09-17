
# TicketFlow

TicketFlow is a web application featuring a Spring Boot backend with a PostgreSQL database and a Vite React frontend using TypeScript, also uses Github-actions.

## Table of Contents

- [About the project](#about-the-project)
- [Built with](#built-with)
- [Prerequisites](#prerequisites)
- [Setup and Configuration](#setup-and-configuration)
- [Running the Backend](#running-the-backend)
- [Running the Frontend](#running-the-frontend)
- [Usage](#usage)
- [Contact](#contact)

## About the project

This project is a personal endeavor that I've been working on since completing my studies at Codecool. It represents my first significant application developed entirely from scratch on my own. The application is a ticketing system designed with a focus on a user-friendly interface, utilizing symbols and emojis for an intuitive and visually appealing experience. I'm excited to share this work as a demonstration of my learning and development journey.

https://github.com/user-attachments/assets/721172b3-6088-4bb2-946e-4a2a70465a30

https://github.com/user-attachments/assets/be94c2e0-b673-4103-9a5e-7f58eb966ecc

## Built With
* [![React][React.js]][React-url]
* [![TS][Typescript]][Typescript-url]
* [![Node][NodeJs]][NodeJs-url]
* [![Postgres][PostgreSQL]][Postgres-url]
* [![SpringBoot][Spring]][SpringBoot-url]
* [![Java][Java]][Java-url]

## Prerequisites

Ensure you have the following installed:
- [Node.js](https://nodejs.org/) (v14.0.0 or later)
- [npm](https://www.npmjs.com/) or [Yarn](https://classic.yarnpkg.com/) (optional, if you prefer Yarn)
- [Java JDK](https://www.oracle.com/java/technologies/javase-jdk11-downloads.html) (for running Spring Boot)
- [PostgreSQL](https://www.postgresql.org/) (for the database)

## Setup and Configuration

1. **Clone the Repository:**

   ```bash
   git clone https://github.com/grindlevi/ticketflow.git
   ```


2. **Set Environment Variables:**

   You need to configure environment variables for the Spring Boot application. Open your terminal and set the following environment variables:

   - `DB_URL`: The URL of your PostgreSQL database (e.g., `jdbc:postgresql://localhost:5432/mydatabase`)
   - `DB_USERNAME`: The username for your PostgreSQL database
   - `DB_PASSWORD`: The password for your PostgreSQL database
   - `JWT_SECRET`: A secret key for JWT authentication, the secret should at least be 32 characters long, but the longer the better.

   **For Windows Command Prompt:**

   ```cmd
   set DB_URL=jdbc:postgresql://localhost:5432/mydatabase
   set DB_USERNAME=myusername
   set DB_PASSWORD=mypassword
   set JWT_SECRET=myverysecretkey
   ```

   **For Windows PowerShell:**

   ```powershell
   $env:DB_URL="jdbc:postgresql://localhost:5432/mydatabase"
   $env:DB_USERNAME="myusername"
   $env:DB_PASSWORD="mypassword"
   $env:JWT_SECRET="myverysecretkey"
   ```

   **For Unix-based Systems (macOS/Linux):**

   ```bash
   export DB_URL=jdbc:postgresql://localhost:5432/mydatabase
   export DB_USERNAME=myusername
   export DB_PASSWORD=mypassword
   export JWT_SECRET=myverysecretkey
   ```

## Running the Backend

1. **Navigate to the Backend Directory:**

   ```bash
   cd ticketflow/backend
   ```

2. **Build the Spring Boot Application:**

   ```bash
   mvn clean package
   ```

3. **Run the Application:**

   ```bash
   java -jar target/ticketflow-0.0.1-SNAPSHOT.jar
   ```

   Ensure that your PostgreSQL server is running and accessible.

## Running the Frontend

1. **Navigate to the Frontend Directory:**

   ```bash
   cd ticketflow\frontend\ticketflow-frontend>
   ```

2. **Install Dependencies:**

   Using `npm`:

   ```bash
   npm install
   ```

   Or using `Yarn`:

   ```bash
   yarn install
   ```

3. **Start the Development Server:**

   Using `npm`:

   ```bash
   npm run dev
   ```

   Or using `Yarn`:

   ```bash
   yarn dev
   ```

4. **Open Your Browser:**

   Visit `http://localhost:5173`

## Usage

TicketFlow is designed to streamline ticket management, providing a user-friendly interface to create, organize, and manage tasks efficiently. Here's a quick guide on how to use the app:

Register and Log In:

Start by registering an account or logging in if you already have one. The authentication system ensures that your tickets and data are secure.

Create Tickets:

Once logged in, you can easily create new tickets. Each ticket can be given a title, description, and priority level. This allows you to keep track of tasks, issues, or any work that needs attention.

Organize Tickets:

Tickets can be sorted by creation date or priority, helping you stay organized and focused on what matters most.

Drag and Drop:

TicketFlow features a drag-and-drop system, allowing you to easily move tickets between different containers or statuses. Simply click and drag the ticket to its appropriate location (e.g., To Do, In Progress, Finished).

Log Out:

When you're finished managing your tickets, you can securely log out of your account to protect your data and privacy. Just click on the "Logout" button to end your session.

## Contact

Feel free to contact me with any issues.

grindlevi@gmail.com


<!-- MARKDOWN LINKS & IMAGES -->
<!-- https://www.markdownguide.org/basic-syntax/#reference-style-links -->
[React.js]: https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB
[React-url]: https://reactjs.org/
[PostgreSQL]:https://img.shields.io/badge/postgres-%23316192.svg?style=for-the-badge&logo=postgresql&logoColor=white
[Postgres-url]:https://www.postgresql.org/
[Spring]:https://img.shields.io/badge/spring-%236DB33F.svg?style=for-the-badge&logo=spring&logoColor=white
[SpringBoot-url]:https://spring.io/projects/spring-boot
[NodeJs]:https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white
[NodeJs-url]:https://nodejs.org/en
[Java]:https://img.shields.io/badge/Java-ED8B00?style=for-the-badge&logo=openjdk&logoColor=white
[Java-url]:https://www.java.com/en/
[TypeScript]:https://badges.frapsoft.com/typescript/code/typescript.png?v=101
[Typescript-url]:https://www.typescriptlang.org/
