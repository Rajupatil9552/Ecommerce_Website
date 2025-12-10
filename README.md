# ShopCart 🛒

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)
[![Node.js](https://img.shields.io/badge/Node.js-18+-green.svg)](https://nodejs.org/)
[![React](https://img.shields.io/badge/React-18+-61DAFB.svg?logo=react)](https://reactjs.org/)
[![MongoDB](https://img.shields.io/badge/MongoDB-47A248.svg?logo=mongodb)](https://mongodb.com)

**Transforming Shopping Into Seamless Experiences**

A full-featured open-source e-commerce platform that combines a modern React-based frontend with a scalable Node.js backend, enabling developers to build and deploy online stores efficiently.

---

## 📋 Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Tech Stack](#-tech-stack)
- [Getting Started](#-getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Environment Variables](#environment-variables)
- [Usage](#-usage)
  - [Development](#development)
  - [Production](#production)
- [Project Structure](#-project-structure)
- [API Documentation](#-api-documentation)
- [Testing](#-testing)
- [Deployment](#-deployment)
- [Contributing](#-contributing)
- [License](#-license)

---

## 📖 Overview

ShopCart is a modern e-commerce platform designed with developer productivity and scalability in mind. The platform features a clean, modular architecture that separates concerns while providing a comprehensive set of e-commerce functionalities.

### Why ShopCart?

This project aims to simplify the development of robust e-commerce applications with:

- **Modular Architecture**: Clear separation of models, controllers, services, and routes for easy scalability
- **Secure Authentication**: JWT-based user authentication with role-based authorization
- **Developer-Friendly UI**: Modern React setup with Vite, Tailwind CSS, and Framer Motion
- **Comprehensive API**: Complete RESTful API for product management, orders, cart operations, and user profiles
- **Real-time Features**: Shopping cart synchronization and order updates

---

## ✨ Features

### 🔐 User Management
- User registration and login with JWT authentication
- Profile management and order history
- Role-based access control (Admin/Customer)

### 🛍️ Product Management
- CRUD operations for products
- Product categorization and filtering
- Image upload and management
- Inventory tracking and stock management

### 🛒 Shopping Experience
- Add/remove products from cart
- Real-time cart updates
- Checkout process with order summary
- Order tracking and history

### 👨‍💼 Admin Dashboard
- Complete product management interface
- Order management and processing
- User management and analytics
- Sales reporting

### 🚀 Developer Experience
- Hot reload with Vite
- Tailwind CSS for rapid UI development
- ESLint and Prettier for code quality
- Comprehensive API documentation

---

## 🛠️ Tech Stack

### Frontend
- **React 18** - UI Library
- **Vite** - Build tool & dev server
- **Tailwind CSS** - Utility-first CSS framework
- **Framer Motion** - Animation library
- **React Router DOM** - Client-side routing
- **React Hot Toast** - Notifications
- **Axios** - HTTP client
- **Heroicons** - Icon library

### Backend
- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **MongoDB** - Database
- **Mongoose** - ODM for MongoDB
- **JWT** - Authentication
- **bcryptjs** - Password hashing
- **dotenv** - Environment management
- **CORS** - Cross-origin resource sharing

### Development Tools
- **ESLint** - Code linting
- **Prettier** - Code formatting
- **Nodemon** - Development server auto-restart
- **PostCSS** - CSS processing
- **Autoprefixer** - CSS vendor prefixing

---

## 🚀 Getting Started

### Prerequisites

Make sure you have the following installed:

- **Node.js** (v18 or higher)
- **npm** (v9 or higher) or **yarn**
- **MongoDB** (v6 or higher) - Local or Atlas

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/Rajupati19552/shopcart.git
   cd shopcart
