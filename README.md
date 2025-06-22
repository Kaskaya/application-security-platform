# Application Security Platform

This project is a modern web platform developed for application security management. It offers features for tracking, analyzing, and reporting vulnerabilities.

## 🚀 Live Demo

**Live URL:** url

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
- **Finisher.co Animations**: Dynamic background particle animation using the Finisher.co library

#### Glassmorphism Effect

- **Backdrop Blur**: Transparent cards with modern glassmorphism design
- **Border Opacity**: Subtle border effects for a sense of depth
- **Shadow System**: Layered shadow system for a 3D appearance

### State Management

- **Zustand**: Lightweight and performant state management

### Authentication

- **NextAuth.js**: Secure authentication system

### Data Visualization

- **Recharts**: Powerful charting library for React
  - Visualizing security metrics
  - Responsive charts

## 🚀 Running the Project

### Requirements

- Node.js 18+
- npm or yarn

### Setup

1. **Clone the repository:**

```bash
git clone [repository-url]
cd application-security-platform
```

2. **Install dependencies:**

```bash
npm install
# or
yarn install
```

3. **Start the development server:**

```bash
npm run dev
# or
yarn dev
```

4. **Open in your browser:**

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
- Registration information is saved to the `data/users.json` file.
- The application does not currently use a real database.

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
- All data is stored in the `data/vulnerabilities` directory.

## Vulnerability Detail Page

- Accessible from the dashboard panels or the vulnerability table.
- On this page:
  - Detailed explanations of the vulnerability
  - Edit operations can be performed.
