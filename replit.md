# replit.md

## Overview

This is a full-stack resume builder application built with a React frontend and Express backend. The application allows users to create, edit, and optimize resumes with ATS (Applicant Tracking System) compatibility analysis. It provides real-time feedback on resume quality and generates downloadable versions in multiple formats.

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript
- **Build Tool**: Vite for fast development and optimized builds
- **UI Library**: Radix UI components with Tailwind CSS for styling
- **State Management**: TanStack Query for server state management
- **Routing**: Wouter for lightweight client-side routing
- **Form Management**: React Hook Form with Zod validation

### Backend Architecture
- **Runtime**: Node.js with Express.js framework
- **Language**: TypeScript with ES modules
- **Database**: PostgreSQL with Drizzle ORM
- **Database Provider**: Neon Database serverless PostgreSQL
- **Session Management**: Connect-pg-simple for PostgreSQL session storage
- **Development**: Development server with hot module replacement via Vite

### Component Structure
- **Design System**: Shadcn/ui components with New York style
- **Component Organization**: Atomic design principles with reusable UI components
- **Styling**: Tailwind CSS with CSS custom properties for theming
- **Icons**: Lucide React for consistent iconography

## Key Components

### Core Features
1. **Resume Builder Forms**
   - Personal Information (contact details, professional summary)
   - Work Experience (job history with achievements)
   - Education (degrees, institutions, GPAs)
   - Skills (technical skills, frameworks, tools)

2. **ATS Analysis Engine**
   - Real-time compatibility scoring
   - Keyword optimization analysis
   - Format compatibility checks
   - Section structure evaluation
   - Actionable improvement suggestions

3. **Resume Generation**
   - PDF export functionality
   - DOCX format support
   - Plain text generation for ATS compatibility
   - Multiple template formats (ATS-optimized, Professional, Minimal)

4. **Preview System**
   - Real-time resume preview
   - Format switching capabilities
   - Responsive design preview

## Data Flow

1. **User Input**: Forms capture resume data with real-time validation
2. **State Management**: TanStack Query manages server state and caching
3. **Data Persistence**: Resume data stored in PostgreSQL via Drizzle ORM
4. **ATS Analysis**: Background processing analyzes resume content for optimization
5. **Generation**: Server-side resume generation in multiple formats
6. **Download**: File generation and download handling

## External Dependencies

### Frontend Dependencies
- **UI Components**: Radix UI primitives for accessible components
- **Styling**: Tailwind CSS for utility-first styling
- **Date Handling**: date-fns for date manipulation
- **Form Validation**: Zod for schema validation
- **HTTP Client**: Built-in fetch with TanStack Query

### Backend Dependencies
- **Database**: Neon Database for serverless PostgreSQL
- **ORM**: Drizzle ORM for type-safe database operations
- **Session Storage**: connect-pg-simple for PostgreSQL session management
- **Development Tools**: tsx for TypeScript execution, esbuild for production builds

### Development Tools
- **Build System**: Vite with React plugin
- **TypeScript**: Full TypeScript support across frontend and backend
- **Development Experience**: Replit integration with hot reload and error overlays

## Deployment Strategy

### Development Environment
- **Local Development**: Vite dev server with Express backend
- **Hot Reload**: Automatic reloading for both frontend and backend changes
- **Error Handling**: Runtime error overlays and comprehensive error boundaries

### Production Build
- **Frontend**: Vite production build with optimized assets
- **Backend**: esbuild compilation to optimized JavaScript
- **Database**: Drizzle migrations for schema management
- **Environment**: Environment variables for database and external service configuration

### Database Management
- **Schema**: Centralized schema definitions in shared directory
- **Migrations**: Drizzle Kit for database schema migrations
- **Connection**: Neon Database with connection pooling

## User Preferences

Preferred communication style: Simple, everyday language.

## Changelog

```
Changelog:
- July 07, 2025. Initial setup
```