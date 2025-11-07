# My SPA Products App

A simple Single Page Application (SPA) to manage products. Built with **Next.js, Redux Toolkit, TypeScript**, and **Tailwind CSS**.  
This project demonstrates front-end skills and integration with APIs, including **Pexels** for product images.

---

## Table of Contents

- [Demo](#demo)  
- [Setup & Installation](#setup--installation)  
- [Running the Project](#running-the-project)  
- [Adding a New Product](#adding-a-new-product)  
- [Technologies Used](#technologies-used)  

---

## Demo

You can see a live demo here: [test-spa-products](https://hailnail.github.io/test-spa-products/)

---

## Setup & Installation

1. Clone the repository:
```bash
git clone https://github.com/HailNail/test-spa-products.git
cd test-spa-products
```
2. Install dependencies:
```bash
npm install
```

### Running the Project
#### Development Mode
```bash
npm run dev
```

Open http://localhost:3000 in your browser.

#### Build for Production
```bash
npm run build
npm run start
```
---

### Adding a New Product
- Go to the Add New Product page.
- Fill in the product details:
1. Title
2. Category
3. Price
4. Stock
5. Rating (1–5)
6. Brand
7. Tags (comma separated)
For the Thumbnail URL, you must use a valid Pexels image URL, for example:
https://images.pexels.com/photos/3612182/pexels-photo-3612182.jpeg

The system only accepts images from pexels.com.
If left empty, a default image from the project’s assets will be used automatically.

Click Submit — the new product will appear immediately in the products list.

⚠️ Invalid URLs or non-Pexels images will show an alert and keep you on the Add Product page until corrected.

---

### Technologies Used

- Next.js (React + SSR/SSG)
- Redux Toolkit + TypeScript
- Tailwind CSS + shadcn
- DummyJSON API (for demo products)
- Framer Motion (animations)
- GitHub Pages deployment ready

The app is SPA-ready with search, filters, favorites, and dynamic product addition.

It integrates public APIs (DummyJSON) and demonstrates state management with Redux Toolkit.

Can be deployed easily to GitHub Pages, Vercel, or Netlify.
