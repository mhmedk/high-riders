# High Riders - Frontend Application

**Live Application**: https://high-riders.vercel.app

## About This Project

This is a final training project that was successfully restored and deployed with the assistance of Claude Code. After some time, the application needed updates and fixes to get it working again, and Claude Code helped modernize the build configuration, resolve deployment issues, and get it back online.

## Overview

High Riders is a community platform designed to connect extreme sports enthusiasts across France. It serves as a central hub where riders—whether they practice mountain biking, BMX, skateboarding, scootering, or rollerblading—can discover places to practice, share their favorite spots, organize events, and build a vibrant community around their passion.

## Purpose

The platform addresses several key challenges faced by extreme sports communities:

### Problems It Solves

1. **Spot Discovery**: Riders often struggle to find quality locations to practice their sport, especially when traveling to new cities or regions. High Riders creates a centralized database of riding spots across all departments of France, complete with descriptions, difficulty ratings, and user reviews.

2. **Community Fragmentation**: Extreme sports communities are often scattered across different social media platforms, forums, and local groups. High Riders brings everyone together in one dedicated space where they can connect based on shared interests and geographic proximity.

3. **Event Organization**: Organizing group sessions, competitions, or training events typically requires coordinating through multiple channels. The platform simplifies this by providing dedicated event creation and participation tools.

4. **Knowledge Sharing**: New riders need guidance on where to start, what equipment to use, and how to progress. Experienced riders want to share their knowledge and favorite spots. High Riders facilitates this exchange through user profiles, comments, and spot ratings.

## Who It Helps

- **Beginners**: Find beginner-friendly spots, connect with experienced riders who can mentor them, and discover local events to participate in
- **Experienced Riders**: Share their favorite hidden spots, organize events, build their reputation in the community, and discover new locations to explore
- **Travelers**: Quickly find riding spots when visiting new cities or regions across France
- **Event Organizers**: Promote their competitions, training sessions, or jam sessions to a targeted audience of enthusiasts
- **Local Communities**: Strengthen bonds between riders in the same area, organize regular meetups, and grow their local scene

## Core Functionality

### Discover Riding Spots
Browse an interactive map of riding locations across France, filtered by sport type (VTT, BMX, Skateboard, Trottinette, Roller), difficulty level, and geographic region. Each spot includes photos, detailed descriptions, user ratings, and comments from the community.

### Organize and Join Events
Create events linked to specific spots or regions, set dates and difficulty levels, and let other riders sign up to participate. Whether it's a casual practice session, a jam session, a training course, or a formal competition, the platform makes it easy to bring people together.

### Build Your Profile
Create a rider profile showcasing your preferred sports, equipment, favorite spots, and participation history. Connect with other riders who share your interests and build your network within the community.

### Search and Filter
Quickly find exactly what you're looking for using powerful search and filtering tools. Search by location, sport type, event date, difficulty level, or keyword to discover relevant spots and events.

### Engage with the Community
Comment on spots to share tips and experiences, rate locations to help others make informed decisions, and participate in discussions about events and techniques.

## How the Frontend Fits Into the System

The High Riders application consists of two main components working together:

### Frontend (This Repository)
The user-facing web application that riders interact with through their browsers. It provides the visual interface, handles user interactions, manages the display of maps and spot information, and ensures a smooth, responsive experience across desktop and mobile devices.

### Backend API
A separate service that manages all data storage, user authentication, and business logic. The frontend communicates with this API to retrieve spot information, submit new events, process user registrations, and handle all other data operations. The backend is hosted at `https://high-riders-api.onrender.com`.

Together, these components create a seamless experience where users can discover, share, and engage with the extreme sports community across France.

## Project Goals

1. **Centralize Information**: Create the most comprehensive database of extreme sports spots in France
2. **Foster Community**: Enable riders to connect, share knowledge, and organize together
3. **Lower Barriers**: Make it easier for beginners to get started and for travelers to find spots
4. **Celebrate the Culture**: Showcase the diversity and vibrancy of extreme sports communities across the country
5. **Drive Participation**: Increase attendance at events and sessions through better visibility and organization

## Getting Started

### For Users
Simply visit https://high-riders.vercel.app to start exploring spots and events. Create an account to unlock features like adding your own spots, organizing events, commenting, and building your rider profile.

### For Developers

#### Prerequisites
- Node.js (version 14 or higher)
- npm or yarn package manager

#### Installation

```bash
# Clone the repository
git clone https://github.com/mhmedk/high-riders.git
cd high-riders

# Install dependencies
npm install

# Set up environment configuration
# Create .env.development for local development
echo "API_BASE_URL=http://localhost:3000/api/v1" > .env.development

# Start the development server
npm start
```

The application will open at `http://localhost:8080`

#### Building for Production

```bash
# Build the production bundle
npm run build

# The optimized files will be in the dist/ directory
```

#### Environment Configuration

The application uses environment-specific configuration:

- **Development** (`.env.development`): Points to a local backend server
- **Production** (`.env.production`): Points to the production API at https://high-riders-api.onrender.com/api/v1

## Deployment

The frontend is automatically deployed to Vercel when changes are pushed to the repository. The production environment is configured with the appropriate API endpoint and optimizations for performance.

**Production URL**: https://high-riders.vercel.app

## Contributing

Contributions are welcome! Whether it's reporting bugs, suggesting features, improving documentation, or submitting code, we appreciate all help in making High Riders better for the community.

## Architecture Overview

This is a single-page application (SPA) built with modern web technologies. It communicates with a RESTful API backend to fetch and submit data, handles user authentication through JWT tokens, and provides an interactive map-based interface for discovering spots across France.

The application is designed to be responsive, working seamlessly on desktop computers, tablets, and mobile phones, ensuring riders can access the platform wherever they are.

## License

This project is part of the High Riders community platform initiative.

## Support

For questions, issues, or feedback:
- Create an issue in the GitHub repository
- Contact the development team through the platform's contact form

---

**Built with passion for the extreme sports community** 🛹 🚴 🛴
