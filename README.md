# Threadloom Frontend

This is the frontend client for the Threadloom E-Commerce platform. It provides a modern, highly responsive user interface for exploring products, managing the shopping cart, and authenticated dashboard controls.

## Tech Stack
- **Next.js** (React Framework)
- **TypeScript** (Static Typing)
- **Tailwind CSS** (Styling)
- **Zustand** (State Management)
- **React Hook Form** & **Zod** (Form Handling & Validation)
- **Recharts** (Data Visualization)
- **Lucide React** (Icons)

## Features
- **Responsive Design**: Flawless experience on Mobile, Tablet, and Desktop.
- **Authentication**: Seamless email/password and Google OAuth integrations using `better-auth`.
- **Filtering & Sorting**: Robust search, category filtering, price filtering, and sorting capabilities.
- **Seller Dashboard**: Visual overview of listed products using Recharts.
- **Cart Management**: Real-time shopping cart updates using Zustand state.

## Getting Started

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Environment Setup:**
   Create a `.env.local` file in the root of the `ecommerce-frontend` directory and define your backend API URL. If your backend is running locally on port 5000, it should look like this:
   ```env
   NEXT_PUBLIC_API_URL=http://localhost:5000
   ```

3. **Run the development server:**
   ```bash
   npm run dev
   ```
   Open [http://localhost:3000](http://localhost:3000) in your browser to view the application.

## Build for Production
To create an optimized production build:
```bash
npm run build
```

To start the production server after building:
```bash
npm start
```
