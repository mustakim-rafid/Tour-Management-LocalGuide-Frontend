# 🧭 Tour Management – Local Guide (Frontend)

This is the **frontend application** for the **Local Guide Platform**. It provides a user-friendly interface for **Admins**, **Guides**, and **Tourists** to explore and manage tours, bookings, payments, and reviews. The frontend interacts seamlessly with the backend to deliver a smooth and interactive travel experience.

---

## 🚀 Project Overview

The frontend is built with **Next.js 16**, providing a modern, performant, and SEO-friendly framework for server-side rendering and client-side interactivity. Users can register, login, manage tours and bookings, leave reviews, and view dashboards according to their roles.

Key highlights:

- **Dynamic role-based interface** for Admin, Guide, and Tourist
- **Secure JWT-based authentication**
- **Responsive design** for desktop and mobile
- **Real-time interaction** with backend API

---

## 🔍 Features Overview

### 🔐 Authentication & User Roles
- Login, logout, and token refresh
- Role-based routing and component rendering
- Protected routes for Admin, Guide, and Tourist

### 👤 User Management
- Profile viewing and editing
- Profile photo upload
- Admin user management interface

### 🗺️ Tour Management
- Guides can create, update, and delete tours
- Tourists can explore and view tour details
- Tour images upload support

### 📘 Booking Management
- Tourists can book tours
- Guides can confirm and complete bookings
- Booking history view for Tourists
- Cancel bookings based on role permissions

### 💳 Payment Integration
- Secure payment flow for bookings
- Stripe or other payment provider integration

### ⭐ Review System
- Tourists can add ratings and comments for completed tours
- View existing reviews for tours

### 📊 Dashboard & Analytics
- **Admin Dashboard:** System metrics, user stats, and bookings
- **Guide Dashboard:** Bookings, income, tour performance
- **Tourist Dashboard:** Bookings and completed trips

---

## 🧰 Technology Stack

- **Next.js 16** – React-based framework for server-side rendering and routing
- **TypeScript** – Strong typing for better code quality and maintainability
- **Tailwind CSS** – Utility-first CSS framework for styling and responsive design
- **ShadCN UI** – Accessible, ready-to-use component library built on Tailwind CSS
- **JWT Authentication** – Secure login and session management

---

## 🛠️ Setup Instructions

### 1. Clone the repository

```bash
git clone https://github.com/mustakim-rafid/Tour-Management-LocalGuide-Frontend.git
cd Tour-Management-LocalGuide-Frontend
```

### 2. Install dependencies
```
npm install
# or if using pnpm
pnpm install
# or bun
bun add
```

### 3. Create a .env file in the root directory:
```
NEXT_PUBLIC_BASE_API_URL=

# jwt secrets
ACCESS_TOKEN_SECRET=
REFRESH_TOKEN_SECRET=
```

### 4. Run the development server
```
npm run dev
# or
pnpm dev
# or
bun dev
```

### 5. Build for production
```
npm run build
npm start
```
---
## Thanks.




