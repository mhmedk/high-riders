# High Riders

> A community platform connecting extreme sports enthusiasts across France

**[View Live Application →](https://high-riders.vercel.app)**

<details>
<summary>📸 View Screenshot</summary>

![High Riders Homepage](screenshot.png)

</details>

## About

High Riders is a React-based web application that serves as a centralized hub for the extreme sports community in France. It enables riders of mountain biking, BMX, skateboarding, scootering, and rollerblading to discover riding spots, organize events, and connect with fellow enthusiasts.

This project was successfully restored and modernized with the assistance of **Claude Code**, resolving deployment issues, updating build configurations, and bringing the application back online after being inactive.

## The Problem

Extreme sports communities face several challenges:
- **Fragmented information**: Riding spots and events are scattered across social media, forums, and word-of-mouth
- **Discovery difficulties**: Travelers and beginners struggle to find quality locations to practice
- **Event coordination**: Organizing group sessions requires managing multiple communication channels
- **Community isolation**: Local rider groups remain disconnected from each other

## The Solution

High Riders centralizes the entire extreme sports ecosystem in one platform:

- **Interactive Map-Based Discovery**: Comprehensive database of riding spots across all French departments with photos, ratings, difficulty levels, and user reviews
- **Event Management System**: Create and join events (competitions, jam sessions, training courses) with participant tracking and spot linking
- **Community Profiles**: User profiles showcasing preferred sports, equipment, favorite spots, and participation history
- **Advanced Search & Filtering**: Find spots and events by location, sport type, difficulty level, date, and keywords
- **Engagement Features**: Comment system, spot ratings, and reviews to share knowledge and experiences

## Tech Stack

- **React** - Component-based UI architecture
- **Webpack** - Module bundling and build optimization
- **RESTful API Integration** - Consumes backend API at [high-riders-backend.vercel.app](https://high-riders-backend.vercel.app)
- **JWT Authentication** - Client-side authentication flow and token management
- **Responsive Design** - Mobile-first approach for seamless cross-device experience
- **Vercel** - Automated deployment and hosting

## Key Features Demonstrated

- **React Development**: Component-based architecture with hooks and modern React patterns
- **State Management**: Complex state handling for user authentication, map interactions, and data filtering
- **API Integration**: RESTful API consumption with asynchronous data fetching, error handling, and loading states
- **Responsive UI/UX**: Mobile-optimized interface with intuitive navigation
- **Build & Deployment**: Webpack configuration, environment management, and production deployment to Vercel

## Project Architecture

This repository contains the **frontend application only**. The complete system follows a client-server architecture:

- **Frontend (This Repo)**: React SPA handling UI rendering, user interactions, and client-side routing
- **Backend API** (External): Manages data persistence, business logic, and authentication
- **Communication**: RESTful API endpoints with JSON data exchange

## Impact

High Riders successfully addresses the needs of multiple user groups:
- **Beginners**: Find approachable spots and mentorship opportunities
- **Experienced Riders**: Share knowledge and organize community events
- **Travelers**: Quickly locate riding spots in unfamiliar regions
- **Event Organizers**: Reach targeted audiences and manage participation

---

**Live Demo**: https://high-riders.vercel.app

*Built as a final training project showcasing frontend development with React* 🛹 🚴 🛴
