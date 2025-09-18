# Portfolio Website

## Overview

A modern portfolio website built as a full-stack application using React with TypeScript on the frontend and Express.js on the backend. The project showcases a software developer's work, skills, and experience through an elegant, responsive design inspired by modern developer portfolios like Linear and Vercel. The application features smooth animations, a contact form system, and follows a professional design approach with emphasis on visual appeal and user experience.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **Framework**: React with TypeScript and Vite for fast development and building
- **Component Library**: Radix UI components with shadcn/ui for consistent, accessible UI elements
- **Styling**: Tailwind CSS with custom design system implementing a light theme with neutral base colors and blue accents
- **Animations**: Framer Motion for smooth page transitions and interactive elements
- **State Management**: React hooks for local state, TanStack Query for server state management
- **Routing**: Wouter for lightweight client-side routing
- **Typography**: Inter font from Google Fonts for modern, clean text rendering

### Backend Architecture
- **Runtime**: Node.js with Express.js server framework
- **Language**: TypeScript with ES modules for type safety and modern JavaScript features
- **API Design**: RESTful endpoints with structured error handling and request logging
- **Session Management**: Express session handling with connect-pg-simple for PostgreSQL session storage
- **Validation**: Zod schemas for runtime type validation and error formatting

### Data Layer
- **Database**: PostgreSQL with Neon serverless database hosting
- **ORM**: Drizzle ORM for type-safe database operations and schema management
- **Schema**: Two main entities - users table for authentication and contact_messages table for form submissions
- **Migrations**: Drizzle Kit for database schema migrations and management

### Development Environment
- **Build System**: Vite for fast development server and optimized production builds
- **Development Server**: Hot module replacement with Vite middleware integration
- **Code Quality**: TypeScript strict mode with comprehensive type checking
- **Asset Management**: Vite handles static assets with optimized bundling

### External Dependencies

- **Database**: Neon PostgreSQL serverless database for data persistence
- **UI Components**: Radix UI primitives for accessible, unstyled components
- **Fonts**: Google Fonts (Inter) for typography
- **Development Tools**: Replit integration for development environment and error overlay
- **Session Storage**: PostgreSQL-backed session storage via connect-pg-simple
- **Validation**: Zod for schema validation and error handling
- **Animation**: Framer Motion for smooth animations and transitions
- **Icons**: Lucide React for consistent iconography
- **Date Handling**: date-fns for date manipulation and formatting