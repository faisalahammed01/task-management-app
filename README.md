# Task Management Application

A modern, real-time Task Management Application built using the MERN stack. This app allows users to **add**, **edit**, **delete**, **reorder**, and **categorize** tasks with a beautiful and intuitive drag-and-drop interface. Tasks are organized into three main categories: **To-Do**, **In Progress**, and **Done**.

Changes to the tasks are **instantly synced** with the backend, ensuring persistence and up-to-date data at all times.

---

## Key Features

### **1. Authentication**

- Users can sign in using **Firebase Authentication** (Google sign-in).
- Upon the first login, user details (User ID, email, and display name) are stored in the database for personalized experiences.
- Only authenticated users can access the app.

### **2. Task Management**

- Users can manage tasks across three categories:
  - **To-Do**
  - **In Progress**
  - **Done**
- Drag and drop tasks between categories or reorder tasks within each category with ease.
- Each task includes:
  - **Title** (Required, max 50 characters)
  - **Description** (Optional, max 200 characters)
  - **Timestamp** (Auto-generated upon creation)
  - **Category** (To-Do, In Progress, Done)

### **3. Real-Time Database Sync**

- Built with **MongoDB**, tasks are saved instantly to the database with real-time synchronization.
- MongoDB Change Streams or **WebSockets** are used to ensure the app always displays the most recent data, even after page reloads or reopens.
- Tasks remain in their last known order, with changes updated in the backend and reflected in real time.

### **4. Frontend UI**

- Developed using **React** and **Vite.js** for rapid performance and development.
- The app leverages the `@hello-pangea/dnd` library to enable smooth drag-and-drop functionality.
- The user interface is modern, minimalistic, and responsive, ensuring a smooth experience on both **desktop** and **mobile** devices.
- The design uses a **maximum of four colors** to keep things clean and focused.

### **5. Responsiveness**

- The app offers a **fully responsive layout**, ensuring that users can manage tasks seamlessly on any device.
- Mobile-friendly drag-and-drop interface for a smooth experience on touch devices.

### **6. Backend API**

- A RESTful API built using **Express.js** to handle CRUD operations for tasks:
  - `POST /tasks`: Add a new task
  - `GET /tasks`: Retrieve all tasks for the logged-in user
  - `PUT /tasks/:id`: Update task details (title, description, category)
  - `DELETE /tasks/:id`: Delete a task permanently from the database

### **7. Optional Enhancements**

- **Dark Mode**: Toggle between light and dark themes.
- **Task Due Dates**: Add due dates to tasks with visual indicators (e.g., overdue tasks are shown in red).
- **Activity Log**: A log that tracks task actions (e.g., "Task moved to Done").

---

## Technologies Used

### **Backend**:

- **Node.js** with **Express.js** for API development
- **MongoDB** for data storage
- **Socket.io** for real-time communication
- **Firebase Authentication** for user authentication

### **Frontend**:

- **React** with **Vite.js** for blazing fast performance
- **@hello-pangea/dnd** for drag-and-drop functionality
- **React Router** for navigation
- **React-Toastify** for delightful notifications
- **Tailwind CSS** with **DaisyUI** for a modern, responsive UI

---

## Getting Started

### **Clone the Repository**

```bash
git clone https://github.com/yourusername/task-management-app.git
cd task-management-app
```
