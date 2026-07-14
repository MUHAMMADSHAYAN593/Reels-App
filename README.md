# Reels App

A TikTok-style short video platform for creating, sharing, and discovering entertaining content. Built with React and modern web technologies.

## Features

- 🎬 **Video Feed** - Infinite scroll of short videos
- 📱 **Vertical Format** - Mobile-first design
- ❤️ **Likes & Reactions** - Engage with content
- 💬 **Comments** - Leave feedback on videos
- 👤 **User Profiles** - Create your profile
- 🎥 **Video Upload** - Share your content
- 🔍 **Search** - Find videos and creators
- #️⃣ **Hashtags** - Discover trending topics
- 🔔 **Notifications** - Stay updated
- 🌙 **Dark Mode** - Eye-friendly viewing

## Tech Stack

- **React** - Frontend
- **Node.js/Express** - Backend
- **MongoDB** - Database
- **Firebase** - Video storage
- **Tailwind CSS** - Styling
- **Socket.io** - Real-time updates

## Installation

### Frontend

```bash
cd frontend
npm install
```

Create `.env`:
```env
REACT_APP_API_URL=http://localhost:5000
REACT_APP_SOCKET_URL=http://localhost:5000
```

Start:
```bash
npm start
```

### Backend

```bash
cd backend
npm install
```

Create `.env`:
```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/reels-app
JWT_SECRET=your_secret
```

Start:
```bash
npm start
```

## Project Structure

```
Reels-App/
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   └── App.jsx
│   └── package.json
├── backend/
│   ├── routes/
│   ├── controllers/
│   ├── models/
│   └── server.js
└── README.md
```

## Key Features

### Video Management
- Create and upload short videos
- Edit before uploading
- Add music and effects
- Set privacy settings

### Discovery
- Personalized feed
- Trending videos
- Search functionality
- Hashtag pages

### Engagement
- Like videos
- Comment and reply
- Share with friends
- DM creators

## API Endpoints

- `GET /api/videos/feed` - Get video feed
- `POST /api/videos/upload` - Upload video
- `POST /api/videos/:id/like` - Like video
- `POST /api/comments` - Add comment
- `GET /api/users/:id` - Get user profile

## Usage

### Upload Video

1. Click upload button
2. Select video
3. Add details
4. Publish

### Discover Content

1. Scroll through feed
2. Like videos
3. Follow creators
4. Search hashtags

## Contributing

1. Fork repository
2. Create feature branch
3. Commit changes
4. Push branch
5. Open Pull Request

## Future Improvements

- [ ] Add live streaming
- [ ] Implement duets
- [ ] Add AR filters
- [ ] Create monetization
- [ ] Build mobile app

## License

MIT License