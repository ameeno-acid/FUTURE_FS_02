# FUTURE_FS_02
CRM Mini-Project: Full-Stack Lead Management System
Overview
A professional Full-Stack (MERN) CRM application built during my internship at Future Interns. This tool allows businesses to track leads, manage conversion statuses, and visualize lead data through a real-time analytics dashboard.

Key Features
Live Cloud Database: Integrated with MongoDB Atlas for persistent storage.

Full CRUD Functionality: Create, Read, Update, and Delete leads seamlessly.

Real-time Analytics: Dashboard that calculates total leads and conversion rates dynamically.

Lead Management: Track lead sources (Referrals, Social Media, etc.) and maintain follow-up notes.

Advanced Search: Filter leads by name and status in real-time.

Tech Stack
Frontend: React.js, Axios, CSS3

Backend: Node.js, Express.js

Database: MongoDB Atlas (Mongoose ODM)

Dev Ops: DNS-over-HTTPS routing (to bypass local ISP blocks)

Technical Challenges Solved
ISP Connectivity: Successfully bypassed local ISP DNS restrictions (querySrv ECONNREFUSED) by implementing a manual DNS-over-Google (8.8.8.8) bypass within the Node.js environment.

State Management: Synced local React state with MongoDB _id identifiers to ensure zero-latency UI updates during CRUD operations.
