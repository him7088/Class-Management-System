Class Management System
A full-stack MERN application designed to streamline and automate key administrative tasks for educational institutions. This platform provides a centralized hub for managing student attendance, marks, grievances, and school-wide notices, with role-based access for students and teachers.

Key Features
Authentication & Authorization: Secure user registration and login system using JSON Web Tokens (JWT).

Role-Based Dashboards: Custom dashboards for Student and Teacher roles, providing access to relevant features.

Attendance Tracking: Teachers can view student lists and mark daily attendance (Present/Absent).

Marks Management: Teachers can add and update student marks for various subjects. Students can log in to view their own academic performance.

Grievance System: Students can submit grievances through the platform, which can be reviewed by staff.

Notice Board: A central place for the administration to post notices visible to all users.

Tech Stack
Frontend: React.js, Tailwind CSS, React Router, Axios

Backend: Node.js, Express.js

Database: MongoDB (with Mongoose)

Authentication: bcrypt.js (for password hashing), JSON Web Token (JWT)

Local Setup & Installation
Follow these steps to run the project on your local machine.

Prerequisites
Node.js installed

MongoDB (local instance or a free MongoDB Atlas cluster)

1. Backend Setup
# 1. Navigate to the server directory
cd server

# 2. Install dependencies
npm install

# 3. Create a .env file in the /server directory
#    and add the following variables:
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_super_secret_jwt_key

# 4. Start the backend server
npm run dev

The server will be running on http://localhost:5001.

2. Frontend Setup
# 1. Navigate to the client directory from the root
cd client

# 2. Install dependencies
npm install

# 3. Start the React development server
npm start

The client will be running on http://localhost:3000.