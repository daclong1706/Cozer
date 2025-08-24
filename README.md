# Modern E-Commerce Platform

A feature-rich, full-stack e-commerce platform built with the MERN stack (MongoDB, Express.js, ReactJS, NodeJS). This project focuses on delivering a seamless user experience, optimal performance, and excellent search engine visibility.

[Link Demo](https://cozer-e.vercel.app/)

## About The Project

This project is a comprehensive e-commerce platform designed to streamline the online shopping process. It features robust account management, advanced product filtering, secure transaction processing, and in-depth user analytics. A primary goal of this project was to build a scalable, responsive, and highly performant application that adheres to modern web development best practices, including SEO.

## Key Features

- **User Account Management**: Secure user registration, login, and profile management capabilities.
- **Advanced Product Catalog**: Browse products with sophisticated filtering and sorting options (by category, price, etc.).
- **Shopping Cart & Secure Checkout**: An intuitive shopping cart and a secure transaction process for a smooth purchasing experience.
- **SEO Optimized**: Built with SEO best practices to ensure high visibility on search engines. This includes:
  - Semantic HTML structure.
  - Dynamic meta tags (title, description) for product pages.
  - User-friendly and descriptive URLs.
  - Image optimization and appropriate `alt` tags.
- **User Behavior Analytics**: Integrated with **Google Analytics** to monitor user behavior and optimize the customer journey for better conversion insights.
- **Responsive Design**: Built with a mobile-first approach using **TailwindCSS**, ensuring a flawless experience on all devices, from desktops to smartphones.

## 🚀 Performance Optimized

The frontend was meticulously optimized to deliver a fast and fluid user experience. These efforts resulted in a **30% reduction in the average page load time**, ensuring users can shop without interruption.

## Technology Stack

This project leverages a modern, scalable tech stack:

- **Frontend**: ReactJS
- **Backend**: NodeJS
- **Database**: MongoDB
- **Styling**: TailwindCSS
- **Analytics**: Google Analytics

## Getting Started

To get a local copy up and running, please follow these simple steps.

### Prerequisites

- Node.js (v14.x or later)
- npm or yarn
- A running MongoDB instance (local or via a service like MongoDB Atlas)

### Installation Steps

1.  **Clone the repository:**

    ```bash
    git clone https://github.com/daclong1706/Cozer
    cd Cozer
    ```

2.  **Install Backend dependencies:**

    ```bash
    cd Backend
    npm install
    ```

    Create a `.env` file in the `Backend` directory and add the following environment variables:

    ```env
    MONGO_URI=your_mongodb_connection_string
    JWT_SECRET=your_super_secret_jwt_key
    PORT=5000
    ```

3.  **Install Frontend dependencies:**

    ```bash
    cd ../Frontend
    npm install
    ```

    Optionally, you can create a `.env` file in the `Frontend` directory to specify the API endpoint:

    ```env
    REACT_APP_API_URL=http://localhost:5000
    ```

### Running the Application

1.  **Start the Backend Server:**

    ```bash
    # From the /Backend directory
    npm run start
    ```

2.  **Start the Frontend Client (in a new terminal):**

    ```bash
    # From the /Frontend directory
    npm run dev
    ```

Open your browser and navigate to `http://localhost:3000` to see the application in action.

## Author

- **Nguyen Dac Long**
  - GitHub: [daclong1706](https://github.com/daclong1706)
  - Portfolio: [daclong1706.github.io](https://daclong1706.github.io)
