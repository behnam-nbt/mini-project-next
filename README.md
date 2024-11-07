This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

# Products Management Dashboard

This project is a Products Management Dashboard built with Next.js and React Query to handle products efficiently. It includes features like user authentication, search, pagination, and product management (add, edit, delete). The project is optimized with server-side rendering and incremental static regeneration, ensuring a fast and dynamic user experience.

## Table of content
**Features**

**Tech Stack**

**Project Structure**

**Getting Started**

**API Configuration**

**Pagination and Client-Side State Management**

**Authentication and Authorization**

**Usage**

**License**

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

## Project Structure

.
├── components
│   ├── Layouts
│   │   └── MainLayout.js         # Main layout with conditional header and footer
│   ├── modules
│   │   ├── Table.js              # Table component for displaying products
│   │   ├── AddModal.js           # Modal component for adding products
│   │   ├── EditModal.js          # Modal component for editing products
│   │   └── DeleteModal.js        # Modal component for deleting products
│   └── templates
│       └── Loader.js             # Loader component
├── api
│   └── api.js                    # Axios instance and API calls setup
├── pages
│   ├── index.js                  # Home page with product list
│   ├── login.js                  # Login page
│   ├── products.js               # Products page with pagination, search, and CRUD operations
│   └── register.js               # Register page
└── styles
    └── Products.module.css       # CSS module for styling the Products page



## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

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
