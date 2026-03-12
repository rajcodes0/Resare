# Resare — File Sharing Platform
visit here :https://rajcodes0.github.io/Resare/

Resare is a modern web application for sharing files and resources with others in a simple and organized way. It allows users to upload files, manage their content, explore creators, and download useful resources. The goal of the project is to make sharing digital resources smooth, clean, and accessible.

This project was built as a full-stack web application with authentication, protected routes, and a modern UI.

---

## About the Application

Resare works as a small creator-focused file sharing platform.
Users can upload resources and share them publicly, privately, or restrict them to followers.

The platform focuses on simplicity while still supporting useful features such as creator profiles, file browsing, and direct downloads.

---

## Main Features

### User Authentication

* Register a new account
* Secure login system
* Logout functionality
* Password reset support

### File Upload System

* Upload documents and resources
* Supports different file types

  * PDF
  * Images
  * ZIP archives
  * External links
* File metadata including name, size, and upload date

### File Management

* Download uploaded files
* View file details
* Copy shareable links
* File visibility settings

### Creator Profiles

* Public creator pages
* Creator statistics
* List of uploaded files
* Follow / unfollow creators

### File Access Types

Files can have different access rules:

* **Public** – anyone with the link can download
* **Private** – only the owner can access
* **Follow to unlock** – users must follow the creator

### Search System

* Search files by keyword
* Quick navigation through resources

### Modern UI

* Responsive design
* Clean dashboard layout
* Animated components
* Dark modern theme

---

## Application Pages

The application currently includes:

* Home page
* Login page
* Register page
* Dashboard
* Upload page
* Creator profile page
* File detail page
* Search page
* Password reset pages

All sensitive pages are protected by authentication.

---

## Tech Stack

### Frontend

* React
* React Router
* TailwindCSS
* Lucide Icons
* React Hot Toast

### Backend

* Node.js
* Express
* MongoDB
* JWT Authentication

### Other Tools

* Axios for API communication
* Local storage for session persistence

---

## Project Structure (Frontend)

```
src
 ├ components
 │  ├ Navbar
 │  ├ Layout
 │  ├ ProtectedRoute
 │
 ├ pages
 │  ├ Home
 │  ├ Login
 │  ├ Register
 │  ├ Dashboard
 │  ├ Upload
 │  ├ CreatorProfile
 │  ├ FileDetail
 │  ├ Search
 │
 ├ context
 │  ├ AuthContext
 │
 ├ utils
 │  ├ api
```

---

## Running the Project

Since you are a developer, you already know how to run a React application.
Feel free to set it up the way you prefer and run it locally in your environment.

Make sure the backend API is running and properly configured before starting the frontend.

---

## Current Status

The application currently supports:

* authentication system
* protected routes
* file uploads
* creator profiles
* file browsing
* download system
* search functionality

Additional features such as comments, advanced analytics, and social interactions may be added in future versions.

---

## Purpose of the Project

This project was created as a full-stack learning project and a portfolio application. It demonstrates skills in:

* React architecture
* API integration
* authentication flows
* file handling
* routing and protected pages
* modern UI development

---

## Author

Developed by **Raj**.

This project reflects an ongoing effort to build practical full-stack applications and improve system design skills.

---

## Notes

This project is still evolving and improvements will continue over time as new features and optimizations are added.
