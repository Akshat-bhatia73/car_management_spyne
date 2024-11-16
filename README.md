# Car Management System

SDE Intern Task by Akshat


## 🌐 Live Demo

- **Application**: [https://car-management-spyne.netlify.app](https://car-management-spyne.netlify.app)
- **API Documentation**: [https://car-management-spyne.netlify.app/docs](https://car-management-spyne.netlify.app/docs)

## ✨ Features

- 🔐 Secure authentication with Clerk
- 📝 Complete CRUD operations for car listings
- 🖼️ Multiple image upload support (up to 10 images per car)
- 🔍 Real-time search functionality
- 📱 Responsive design
- 🚀 Server-side rendering with Next.js 14
- 📄 Interactive API documentation

## 🛠️ Technology Stack

- **Frontend**: Next.js 14 (App Router)
- **Authentication**: Clerk
- **Database**: MongoDB
- **Image Storage**: Cloudinary
- **Styling**: Tailwind CSS
- **Form Management**: React Hook Form + Zod validation
- **API Documentation**: Swagger/OpenAPI

# To run locally

1. Clone the repository
```
git clone https://github.com/spyne-ai/car-management-system.git

cd car-management-system
```
2. Install dependencies: `npm install`
3. Set up environment variables: 
```
NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up
NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL=/
NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL=/
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret
CLOUDINARY_UPLOAD_PRESET=your_cloudinary_upload_preset
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
CLERK_SECRET_KEY=your_clerk_secret_key
MONGODB_URI=your_mongodb_uri
```
4. Start the development server: `npm run dev`
