# The Mantra Website INDIA

The Mantra is a USA-based brand offering premium products listed on Amazon. This website was developed from scratch using the MERN stack to showcase the brand's products, recipes, and blogs while providing a secure admin dashboard for website management.

## Live Website

Visit the live website: https://www.themantraonline.ca/

---

## Features

### User-Facing Features
- **Home Page**: Engaging banner, product highlights, and brand story.
- **Products**: Browse all products offered by "The Mantra".
- **Recipes**: Explore delicious recipes incorporating "The Mantra" products.
- **Blogs**: Read insightful blogs curated by the brand.
- **Contact Us**: Get in touch with the brand for inquiries or feedback.

### Admin Dashboard
- **Authentication**: Secure login using bcrypt and JWT.
- **Manage Products**: Add, update, and delete products.
- **Manage Blogs**: Post new blogs, edit existing ones, and remove outdated content.
- **Manage Recipes**: Add and update recipes with ease.
- **Email Integration**: Send and manage customer communications using nodemailer.

---

## Tech Stack

### Frontend
- React.js
- Tailwind CSS for responsive and modern UI design

### Backend
- Node.js and Express.js
- MongoDB for database management
- JWT for authentication
- Nodemailer for email integration

---

## Directory Structure

```plaintext
Ajitkumar-25-mantra_website/
├── README.md
├── backend/
│   ├── app.js
│   ├── package-lock.json
│   ├── package.json
│   ├── .gitignore
│   ├── config/
│   │   └── nodemailerConfig.js
│   ├── controller/
│   │   ├── adminController.js
│   │   ├── blogController.js
│   │   ├── emailController.js
│   │   ├── productController.js
│   │   └── recipeController.js
│   ├── database/
│   │   └── db_connection.js
│   ├── middlewares/
│   │   └── authMiddleware.js
│   ├── models/
│   │   ├── admin.js
│   │   ├── blog.js
│   │   ├── product.js
│   │   └── recipe.js
│   ├── routes/
│   │   ├── adminRoute.js
│   │   ├── blogRoutes.js
│   │   ├── emailRoutes.js
│   │   ├── productRoutes.js
│   │   └── recipeRoute.js
│   └── utils/
│       └── emailTemplate.js
└── frontend/
    ├── README.md
    ├── package-lock.json
    ├── package.json
    ├── tailwind.config.js
    ├── .gitignore
    ├── public/
    │   ├── index.html
    │   ├── manifest.json
    │   └── robots.txt
    └── src/
        ├── App.css
        ├── App.js
        ├── App.test.js
        ├── index.css
        ├── index.js
        ├── reportWebVitals.js
        ├── setupTests.js
        ├── components/
        │   ├── AddBlogModal.jsx
        │   ├── AddProductModal.jsx
        │   ├── BannerImage.jsx
        │   ├── Bestsellers.jsx
        │   ├── Categories.jsx
        │   ├── Contact.jsx
        │   ├── EmailModal.jsx
        │   ├── Footer.jsx
        │   ├── KnowProduct.jsx
        │   ├── ManageBlogs.jsx
        │   ├── ManageProducts.jsx
        │   ├── ManageRecipes.jsx
        │   ├── Marque.jsx
        │   ├── Navbar.jsx
        │   ├── ProductCategories.jsx
        │   ├── ProtectedRoute.jsx
        │   ├── RecipeModal.jsx
        │   ├── SocialIcons.jsx
        │   ├── TeaFinder.jsx
        │   ├── TestimonialCarousel.jsx
        │   ├── UpdateBlogModal.jsx
        │   ├── UpdateProductModal.jsx
        │   ├── Videointro.jsx
        │   └── WhyUs.jsx
        └── pages/
            ├── AdminDashboard.jsx
            ├── AdminLogin.jsx
            ├── BlogDetails.jsx
            ├── Blogs.jsx
            ├── ContactUs.jsx
            ├── Home.jsx
            ├── ProductDetails.jsx
            ├── Products.jsx
            ├── RecipeDetail.jsx
            ├── Recipes.jsx
            └── StoryAndVision.jsx
```


## Installation and Usage

1. **Clone the repository:**
   ```bash
   git clone https://github.com/Ajitkumar-25/mantra_website.git
   cd mantra_website
   ```

2. **Install dependencies:**
   Navigate to both the `frontend` and `backend` directories and install dependencies:
   ```bash
   # For Frontend
   cd frontend
   npm install

   # For Backend
   cd backend
   npm install
   ```

3. **Run the development server:**
   Start the development servers in both directories:
   ```bash
   # Frontend (in frontend)
   npm start

   # Backend (in backend)
   npm run dev
   ```

## Contact
For any queries or suggestions, feel free to reach out:

- Email: kajit0408@gmail.com
- GitHub: [Ajitkumar-25](https://github.com/Ajitkumar-25)
