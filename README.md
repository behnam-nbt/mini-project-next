# Products Management Dashboard

This project is a Products Management Dashboard built with Next.js and React Query to handle products efficiently. It includes features like user authentication, search, pagination, and product management (add, edit, delete). The project is optimized with server-side rendering and incremental static regeneration, ensuring a fast and dynamic user experience.

## Table of content
[Features](#features)

[Tech Stack](#tech-stack)

[Getting Started](#getting-started)

[API Configuration](#api-configuration)

[Pagination and Client-Side State Management](#pagination-and-client-side-state-management)

[Authentication and Authorization](#authentication-and-authorization)

[Usage](#usage)

## Features

**User Authentication:** Login with token-based authentication.

**Product Management:** CRUD operations for products (Create, Read, Update, Delete).

**Pagination:** Dynamically handle pages with the react-query library and update the URL query parameter to reflect the current page.

**Search:** Filter products by search keywords.

**Toast Notifications::** Visual feedback for actions such as login success, adding, editing, or deleting products.

**Responsive UI:** Optimized layout for different screen sizes.

## Tech Stack

**Next.js:** Framework for React that allows server-side rendering and static site generation.

**React Query:** Data-fetching and state management library for handling API data and caching.

**Axios:** Promise-based HTTP client for making API requests.

**js-cookie:** Library for handling cookies to store authentication tokens.

**React Icons:** For adding icons to the UI.

**Toastify:** For showing notifications to users.

**React Modal:** For handling Add, Edit, and Delete Modals.


## Getting Started

### Prerequisites

**Node.js (>=14.x.x)**
**npm or yarn**

### Installation

**1. Clone the repository:**
```
git clone https://github.com/behnam-nbt/mini-project-next.git
```
**2. Install dependencies:**
```
npm install

#or

yarn install
```
**3. Run the application in development mode:**
```
npm run dev

#or

yarn dev
```
**4. Open the application: Go to http://localhost:3000 in your browser.**

### Build for Production

To create an optimized production build:
```
npm run build

#or

yarn build
```
To start the production server:
```
npm start

#or

yarn start
```

## API Configuration

### Axios Instance

The Axios instance is configured in */api/api.js* and is responsible for making API requests. You may need to update the base URL in api.js to match your backend API endpoint.

### Fetch Functions

For example, *fetchProducts* retrieves paginated products data:
```
export const fetchProducts = async (page = 1, limit = 10) => {
  try {
    const response = await api.get(`/products`, {
      params: { page, limit },
    });

    return response.data;
  } catch (error) {
    console.error('Error fetching products:', error.message || error);
    throw new Error('Failed to fetch products. Please try again later.');
  }
};
```

## Pagination and Client-Side State Management

**Pagination:** The Products page uses React Query’s *useQuery* with the current page as a dependency to re-fetch data on page change.

**URL Query Parameter:** The current page number is reflected in the URL (*?page=1*), which enables direct access to any page.

## Authentication and Authorization

This project uses token-based authentication managed with **js-cookie**. The token is stored as a cookie upon login and checked on protected routes (like **/products**). When the token is absent, users are redirected to the **/login** page.

**Login Redirect:** On successful login, the user is redirected to the */products* page with a success toast message.

## Usage

**Login:** Navigate to */login*, enter credentials, and submit.

**Product Management:** Access products, search, add, edit, or delete.

**Pagination:** Use the Next and Previous buttons to navigate through paginated products.

**Notifications:** Receive visual feedback for login and product management actions.


Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.js`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
