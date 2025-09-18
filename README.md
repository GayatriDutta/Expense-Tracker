# Full-Stack Expense Tracker

A comprehensive **full-stack Expense Tracker** application built with **React (frontend)** and **NestJS (backend)**.  
Track, visualize, and manage your expenses with real-time updates, budgets, recurring payments, and beautiful interactive dashboards.

---

## 🚀 Core Features

### Authentication & User Management
- JWT-based authentication with login/register
- User profiles with name and email
- Secure password hashing using **bcrypt**

### Expense Management
- Add, edit, delete expenses (amount, category, date, notes)
- Filter by date range and category
- Real-time expense tracking

### Categories
- 9 predefined categories (Food, Travel, Shopping, etc.)
- Custom category creation
- Color-coded categorization

### Analytics & Dashboard
- Interactive **pie charts** for category breakdown
- **Bar charts** for spending trends over time
- Top 3 spending categories highlighted
- Monthly, weekly, and daily summaries

### Budget Features
- Set monthly budgets with progress tracking
- Green/yellow/red alerts for budget status
- Visual progress bars

### Recurring Expenses
- Auto-add rent, subscriptions, etc.
- Daily/weekly/monthly/yearly frequencies
- Automated processing with **cron jobs**

### Additional Features
- **Dark Mode** toggle
- Export data as CSV
- Mobile responsive design
- Real-time data synchronization

---

## 🛠 Tech Stack

### Frontend
- **React 18** with TypeScript  
- **Tailwind CSS** for styling  
- **React Router** for navigation  
- **Axios** for API calls  
- **Chart.js** for data visualization  

### Backend
- **NestJS** with TypeScript  
- **SQLite** database with TypeORM  
- JWT authentication with Passport  
- Scheduled tasks for recurring expenses  
- RESTful API design  

---

## 🎨 Design Highlights
- Apple-level aesthetics with a **clean, modern interface**  
- Consistent **8px spacing system**  
- Comprehensive **color system** with proper contrast ratios  
- Smooth animations and micro-interactions  
- Responsive grid layouts for all screen sizes  

---

## 🚀 Running the Application

### Backend
```bash
cd backend
npm install
npm run start:dev
