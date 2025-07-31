This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/pages/api-reference/create-next-app).

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


### Project Overview
Project Name: Front Desk Clinic System

### Purpose:
A web application designed to streamline the management of clinic operations including appointments, doctors, patients, and queues.

### Key Features
User registration and login with secure authentication

Manage doctor profiles and availability

Patient registration and appointment booking

Real-time queue management for efficient patient flow

Role-based access control for admin and staff

Responsive UI built with Next.js (frontend) and a robust NestJS backend

Uses MySQL for reliable data storage

### How It Works
Frontend: Allows users to register, log in, book appointments, and view queue status.

Backend: Handles data processing, authentication, and database management via RESTful APIs.

Communication: Frontend communicates with backend APIs over HTTP(S).

Deployment: Frontend deployed on Vercel, backend hosted separately (e.g., Render or Heroku).


You can start editing the page by modifying `pages/index.tsx`. The page auto-updates as you edit the file.

[API routes](https://nextjs.org/docs/pages/building-your-application/routing/api-routes) can be accessed on [http://localhost:3000/api/hello](http://localhost:3000/api/hello). This endpoint can be edited in `pages/api/hello.ts`.

The `pages/api` directory is mapped to `/api/*`. Files in this directory are treated as [API routes](https://nextjs.org/docs/pages/building-your-application/routing/api-routes) instead of React pages.

This project uses [`next/font`](https://nextjs.org/docs/pages/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Screenshots

### Login Page

![login image](https://github.com/user-attachments/assets/056b7044-89d9-4b20-9ea3-00f60e816f64)

### Create Account Page

![create account image](https://github.com/user-attachments/assets/b0221c07-a12c-49e1-9b90-77b29e12e974)

### Appointments Page 

![appointments image](https://github.com/user-attachments/assets/95638f8b-2ab7-4ecb-9198-faeaae971a41)

### Book Appointment Page

![book appointments image](https://github.com/user-attachments/assets/923c467d-4098-484b-8b09-e1e9292a7f3f)

### Doctor's Management Page

![doctor's management image](https://github.com/user-attachments/assets/1911c7eb-ae9f-4dab-be63-91457b145e85)

### Patients Queue Page

![patient queue Image](https://github.com/user-attachments/assets/7e753cb6-6c45-4228-818f-da54ebdf6c1f)

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn-pages-router) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/pages/building-your-application/deploying) for more details.
