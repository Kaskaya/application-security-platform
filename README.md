# Application Security Platform

This project is a modern web platform developed for application security management. It offers features for tracking, analyzing, and reporting vulnerabilities.

## 🚀 Live Demo

**Live URL:** https://application-security-platform.vercel.app/

## 🛠️ Technology Choices

### Frontend Framework

- **Next.js 15**: React-based full-stack framework
  - Server-side rendering (SSR) and static site generation (SSG) support
  - Automatic code splitting and optimization
  - Modern routing system with App Router

### UI/UX Libraries

- **Tailwind CSS**
  - Fast development and consistent design
  - Responsive design support
- **Lucide React**: Modern icon library
- **React Icons**: Large icon collection
- **Finisher.co Animations**: Dynamic background particle animation using the Finisher library

#### Glassmorphism Effect

- **Backdrop Blur**: Transparent cards with modern glassmorphism design
- **Border Opacity**: Subtle border effects for a sense of depth
- **Shadow System**: Layered shadow system for a 3D appearance

### State Management

- **Zustand**: Lightweight and performant state management

### Authentication

- **NextAuth.js**: Secure authentication system

### Database

- **Supabase**: PostgreSQL-based backend-as-a-service
  - Real-time database with automatic API generation
  - Built-in authentication and authorization
  - Row Level Security (RLS) for data protection

### Data Visualization

- **Recharts**: Powerful charting library for React
  - Visualizing security metrics
  - Responsive charts

## 🚀 Running the Project

### Requirements

- Node.js 18+
- npm or yarn
- Supabase account and project

### Setup

1. **Clone the repository:**

```bash
git clone https://github.com/Kaskaya/application-security-platform.git
cd application-security-platform
```

2. **Install dependencies:**

```bash
npm install
# or
yarn install
```

```bash
npm run dev
# or
yarn dev
```

6. **Open in your browser:**

```
http://localhost:3000
```

## 🚀 How the Project Works

- The entire project is protected with `next-auth`.
- On first load, a sign-in form is displayed.
- Authentication methods:
  - Credentials (username and password)
  - GitHub
  - Google

## Sign Up

- You can switch to the registration form by clicking the **Sign Up** button on the login form.
- User data is stored securely in the Supabase database.

## Dashboard

- After registering or logging in, the user is automatically redirected to the **dashboard** page.
- On the dashboard screen:
  - General statistics
  - Charts
  - Recently fixed vulnerabilities
  - Vulnerabilities by severity
- You can navigate to the vulnerability detail page from these panels.

## Vulnerabilities Page

- Accessible from the **Vulnerabilities** tab in the left menu.
- On this page:
  - Vulnerability table
  - Search, sort, add, delete, and edit operations
  - Data import from JSON and CSV files
- All data is stored in the Supabase database.

## Vulnerability Detail Page

- Accessible from the dashboard panels or the vulnerability table.
- On this page:
  - Detailed explanations of the vulnerability
  - Edit operations can be performed.
