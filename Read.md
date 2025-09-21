# Zomayo-MERN: Fullstack Food Partner Platform

---

## Table of Contents
- [Project Overview](#project-overview)
- [Architecture](#architecture)
- [Backend](#backend)
  - [Tech Stack](#tech-stack)
  - [Folder Structure](#folder-structure)
  - [Models](#models)
  - [Controllers](#controllers)
  - [Routes](#routes)
  - [Middleware](#middleware)
  - [API Endpoints](#api-endpoints)
  - [Authentication](#authentication)
  - [Video Upload](#video-upload)
- [Frontend](#frontend)
  - [Tech Stack](#frontend-tech-stack)
  - [Folder Structure](#frontend-folder-structure)
  - [Main Components](#main-components)
  - [Routing](#routing)
  - [UI/UX](#uiux)
  - [Profile Page](#profile-page)
  - [Create Food Page](#create-food-page)
- [Example Usage](#example-usage)
- [Design Decisions](#design-decisions)
- [Best Practices](#best-practices)
- [Contributing](#contributing)
- [License](#license)

---

## Project Overview

**Zomayo-MERN** is a fullstack web application for food partners to register, upload food videos, and showcase their profiles in an Instagram-like layout. Users can browse food items, view partner profiles, and interact with a modern, responsive UI. The project is built using the MERN stack (MongoDB, Express, React, Node.js) and follows best practices for modularity, security, and scalability.

---

## Architecture

- **Backend:** Node.js, Express, Mongoose, JWT, Multer, CORS, Cookie-Parser
- **Frontend:** React, Axios, React Router, CSS Modules, Modern UI/UX
- **Database:** MongoDB
- **Authentication:** JWT-based, cookies
- **Video Upload:** Multer (memory storage), cloud storage ready

---

## Backend

### Tech Stack
- Node.js
- Express
- Mongoose
- JWT (jsonwebtoken)
- Multer (file uploads)
- Cookie-Parser
- CORS
- bcryptjs

### Folder Structure
```
Backend/
  package.json
  src/
    app.js
    controllers/
      auth.controller.js
      food.controller.js
      food-partner.controller.js
    db/
      db.js
    middlewares/
      auth.middleware.js
    models/
      user.model.js
      food.model.js
      foodpartner.model.js
    routes/
      auth.route.js
      food.route.js
      food-partner.route.js
    services/
      storage.service.js
```

### Models

#### User Model
```js
const userSchema = new mongoose.Schema({
  fullname: { type: String, required: true, trim: true },
  email: { type: String, required: true, unique: true, lowercase: true, trim: true },
  password: { type: String }
}, { timestamps: true });
```

#### FoodPartner Model
```js
const foodschema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  email: { type: String, required: true, unique: true, lowercase: true, trim: true },
  password: { type: String },
  address: { type: String, trim: true, default: "" }
});
```

#### Food Model
```js
const foodSchema = new mongoose.Schema({
  name: { type: String, required: true },
  video: { type: String, required: true },
  description: { type: String },
  foodPartner: { type: mongoose.Schema.Types.ObjectId, ref: "FoodPartner" }
});
```

### Controllers

#### Auth Controller
Handles registration, login, and logout for both users and food partners. Uses bcryptjs for password hashing and JWT for authentication.

**Register User Example:**
```js
async function registerUser(req, res) {
  // ...validation...
  const hashedPassword = await bcrypt.hash(password, 10);
  const user = await User.create({ fullname, email, password: hashedPassword });
  // ...set JWT cookie and respond...
}
```

**Register Food Partner Example:**
```js
async function registerFoodPartner(req, res) {
  // ...validation...
  const hashedPassword = await bcrypt.hash(password, 10);
  const foodPartner = await foodPartnerModel.create({ name, email, password: hashedPassword });
  // ...set JWT cookie and respond...
}
```

#### Food Controller
Handles creation and retrieval of food items. Uses Multer for video upload and supports cloud storage integration.

**Create Food Example:**
```js
async function createFood(req, res) {
  // ...file upload logic...
  const fooditem = await foodModel.create({
    name: req.body.name,
    description: req.body.description,
    video: fileUploadResult.url,
    foodPartner: req.foodPartner._id
  });
  res.status(201).json({ message: "Food Added Sucessfully", food: fooditem });
}
```

**Get All Food Items Example:**
```js
async function getAllFoodItems(req, res) {
  const foodItems = await foodModel.find().populate("foodPartner", "name email _id");
  res.status(200).json({ messege: "Food Items fetched Sucessfully", foodItems });
}
```

#### Food Partner Controller
Fetches food partner details and their uploaded foods for profile display.

**Get Food Partner Details Example:**
```js
async function getFoodPartnerDetails(req, res) {
  const foodPartnerId = req.params.id;
  const foodpartner = await foodPartnerModel.findById(foodPartnerId);
  const foods = await foodModel.find({ foodPartner: foodPartnerId });
  if (!foodpartner) return res.status(404).json({ message: "Food Partner not found" });
  res.status(200).json({ message: "Food Partner details fetched successfully", foodpartner: { ...foodpartner.toObject(), foods } });
}
```

### Routes

**Auth Routes:**
- `/api/auth/user/register` - Register user
- `/api/auth/user/login` - Login user
- `/api/auth/user/logout` - Logout user
- `/api/auth/foodpartner/register` - Register food partner
- `/api/auth/foodpartner/login` - Login food partner
- `/api/auth/foodpartner/logout` - Logout food partner

**Food Routes:**
- `POST /api/food` - Create food item (video upload)
- `GET /api/food` - Get all food items

**Food Partner Routes:**
- `GET /api/food-partner/:id` - Get food partner profile and foods

### Middleware
- **authuserMiddleware**: Protects user routes
- **authfoodpartnerMiddleware**: Protects food partner routes
- **multer**: Handles file uploads

### API Endpoints

Example: Get Food Partner Profile
```http
GET /api/food-partner/1234567890abcdef
Response:
{
  "message": "Food Partner details fetched successfully",
  "foodpartner": {
    "_id": "1234567890abcdef",
    "name": "Partner Name",
    "email": "partner@example.com",
    "address": "123 Main St",
    "foods": [
      { "name": "Pizza", "video": "https://...", "description": "Tasty pizza!" },
      // ...
    ]
  }
}
```

### Authentication
- JWT tokens stored in HTTP-only cookies
- Passwords hashed with bcryptjs
- Secure login/logout flows for both users and food partners

### Video Upload
- Multer memory storage for file uploads
- Video files sent as multipart/form-data
- Ready for cloud storage integration (e.g., AWS S3, ImageKit)

---

## Frontend

### Frontend Tech Stack
- React
- Axios
- React Router
- CSS Modules

### Frontend Folder Structure
```
frontend/
  src/
    App.jsx
    main.jsx
    theme.css
    food-partner/
      Profile.jsx
      Profile.module.css
      CreateFood.jsx
      CreateFood.module.css
    general/
      Home.jsx
    routes/
      AppRoutes.jsx
    components/
      UserRegister.jsx
      UserLogin.jsx
      FoodPartnerRegister.jsx
      FoodPartnerLogin.jsx
```

### Main Components

#### Home.jsx
Displays a grid of food videos (reels-style), each with a "Visit Store" button linking to the food partner's profile.

**Code Snippet:**
```jsx
foodVideos.map((food, idx) => (
  <div className={styles.reel} key={food._id || idx}>
    <video src={food.video} ... />
    <Link to={`/food-partner/${food.foodPartner._id}`}>Visit Store</Link>
  </div>
))
```

#### Profile.jsx
Shows the food partner's profile card, stats, and a grid of their uploaded food videos. Responsive for mobile and desktop.

**Code Snippet:**
```jsx
const videos = profile && profile.foods && profile.foods.length > 0
  ? profile.foods.map(food => food.video)
  : Array.from({ length: 6 }, (_, i) => `https://www.w3schools.com/html/mov_bbb.mp4`);

return (
  <div className={styles.profileContainer}>
    {/* Profile Header */}
    {/* Video Grid */}
    <div className={styles.videoGrid}>
      {videos.map((video, idx) => (
        <video src={video} ... />
      ))}
    </div>
  </div>
)
```

#### CreateFood.jsx
Food partners can upload a video, enter a name and description, preview the video, and remove it before submitting.

**Code Snippet:**
```jsx
const [videoFile, setVideoFile] = useState(null);
const [videoPreview, setVideoPreview] = useState(null);
...
<input type="file" ... onChange={handleVideoChange} />
{videoPreview && <video src={videoPreview} controls />}
<button onClick={handleRemoveVideo}>Remove Video</button>
```

### Routing

**AppRoutes.jsx:**
```jsx
<Routes>
  <Route path="/" element={<Home />} />
  <Route path="/food-partner/:id" element={<Profile />} />
  <Route path="/create-food" element={<CreateFood />} />
  {/* ...other routes... */}
</Routes>
```

### UI/UX
- Modern, dark-themed UI using CSS Modules and theme variables
- Responsive layouts for mobile and desktop
- Instagram-like profile and video grid
- Video upload area with SVG icon and preview

### Profile Page
- Displays food partner info, stats, and video grid
- Fetches data from backend `/api/food-partner/:id`
- Handles loading and error states

### Create Food Page
- Upload video, name, and description
- Shows video preview and remove button
- Submits data to backend

---

## Example Usage

### Register Food Partner
```http
POST /api/auth/foodpartner/register
Body: { "name": "Partner", "email": "partner@example.com", "password": "secret" }
```

### Upload Food Item
```js
const formdata = new FormData();
formdata.append("video", videoFile);
formdata.append("name", name);
formdata.append("description", description);
await axios.post("/api/food", formdata, { withCredentials: true });
```

### View Profile
```jsx
<Link to={`/food-partner/${food.foodPartner._id}`}>Visit Store</Link>
```

---

## Design Decisions
- Modular folder structure for scalability
- JWT authentication for security
- Multer for file uploads, ready for cloud integration
- Responsive, modern UI for best user experience
- Separation of user and food partner logic

## Best Practices
- Use environment variables for secrets
- Validate all user input
- Hash passwords before storing
- Use HTTP-only cookies for tokens
- Modularize controllers, models, and routes
- Use CSS Modules for scoped styling

## Contributing
Pull requests are welcome! Please follow the code style and add tests for new features.

## License
MIT

---

## Visual Examples & UI Screenshots

Below are some random image examples and UI mockups to help visualize the Zomayo-MERN platform. These images are for demonstration purposes and can be replaced with real screenshots from your app.

### Example: Food Partner Profile Card
![Food Partner Profile Card](https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=400&q=80)

*The profile card displays the food partner's name, address, and key stats such as total meals and customers served. The design is inspired by Instagram's clean and modern layout.*

### Example: Video Grid
![Food Video Grid](https://images.unsplash.com/photo-1519864600265-abb23847ef2c?auto=format&fit=crop&w=400&q=80)

*The video grid showcases food items uploaded by the partner. Each video is displayed in a square box, and users can click to watch the video or visit the store.*

### Example: Upload Food Video UI
![Upload Food Video](https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=400&q=80)

*The upload area features a drag-and-drop box with an SVG icon, video preview, and a remove button. This makes the upload process intuitive and visually appealing.*

---

## Extended Feature Explanations

### Responsive Design
The frontend is built with responsiveness in mind. The profile page adapts to both mobile and desktop layouts:
- **Mobile:** Profile card at the top, stats row, and a single-column video grid below.
- **Desktop:** Wider profile card, stats row, and a multi-column video grid for better use of screen space.

### Authentication Flow
- **Registration:** Users and food partners register with email and password. Passwords are hashed before storage.
- **Login:** JWT tokens are issued and stored in HTTP-only cookies for security.
- **Protected Routes:** Middleware checks for valid tokens before allowing access to sensitive endpoints.

### Video Upload Flow
- **Frontend:** Food partners select a video file, preview it, and can remove or replace it before submitting.
- **Backend:** Multer handles file uploads in memory. The video is then uploaded to cloud storage (e.g., AWS S3, ImageKit) and the URL is saved in MongoDB.

### Data Relationships
- **FoodPartner ↔ Food:** Each food item references its food partner via a MongoDB ObjectId. This allows for efficient population and querying of related data.

### Example: API Data Flow
1. **User uploads a food video via CreateFood page.**
2. **Frontend sends a POST request to `/api/food` with video, name, and description.**
3. **Backend saves the video and creates a new food item in MongoDB.**
4. **Profile page fetches food partner details and their foods for display.**

### Example: Profile Page Data Fetch
```js
useEffect(() => {
  axios.get(`http://localhost:3000/api/food-partner/${id}`, { withCredentials: true })
    .then((res) => setProfile(res.data.foodpartner))
    .catch(() => setLoading(false));
}, [id]);
```

### Example: Video Upload Preview Logic
```js
const handleVideoChange = (e) => {
  const file = e.target.files[0];
  if (file) {
    setVideoFile(file);
    setVideoPreview(URL.createObjectURL(file));
  }
};
```

### Example: Remove Video Button
```js
<button type="button" className={styles.removeButton} onClick={handleRemoveVideo}>
  Remove Video
</button>
```

---

## More UI/UX Details
- **Theme:** Uses CSS variables and modules for a consistent dark theme across all pages.
- **SVG Icons:** Custom SVG icons are used for upload areas and buttons to enhance visual appeal.
- **Loading/Error States:** All data-fetching components handle loading and error states gracefully, providing feedback to users.
- **Accessibility:** Form fields are labeled and keyboard accessible.

---

## Random Image Gallery

Here are more random images to illustrate the food partner experience:

| Food Item | Video Preview | Partner Logo |
|-----------|--------------|--------------|
| ![Food 1](https://images.unsplash.com/photo-1502741338009-cac2772e18bc?auto=format&fit=crop&w=100&q=80) | ![Video 1](https://images.unsplash.com/photo-1465101178521-c1a9136a3c8b?auto=format&fit=crop&w=100&q=80) | ![Logo 1](https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=100&q=80) |
| ![Food 2](https://images.unsplash.com/photo-1519864600265-abb23847ef2c?auto=format&fit=crop&w=100&q=80) | ![Video 2](https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=100&q=80) | ![Logo 2](https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=100&q=80) |
| ![Food 3](https://images.unsplash.com/photo-1465101178521-c1a9136a3c8b?auto=format&fit=crop&w=100&q=80) | ![Video 3](https://images.unsplash.com/photo-1502741338009-cac2772e18bc?auto=format&fit=crop&w=100&q=80) | ![Logo 3](https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=100&q=80) |

---

## Advanced Features & Future Improvements
- **Cloud Storage Integration:** Easily switch to AWS S3, Google Cloud Storage, or ImageKit for video hosting.
- **Admin Dashboard:** Add admin features for managing users, partners, and content.
- **Notifications:** Implement real-time notifications for uploads and profile updates.
- **Analytics:** Track views, uploads, and user engagement with integrated analytics.
- **Unit & Integration Tests:** Expand test coverage for all backend and frontend modules.

---

## Final Thoughts

Zomayo-MERN is designed to be a scalable, modern platform for food partners and users. With a robust backend, a visually appealing frontend, and a focus on user experience, it serves as a strong foundation for any food-related social or e-commerce application. The modular codebase, clear data relationships, and extensible architecture make it easy to add new features and scale as needed.

Feel free to use, modify, and contribute to this project!
