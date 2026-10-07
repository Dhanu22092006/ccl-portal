# CCL Portal - Community Co-Creation Labs

A unified digital portal for all Community Co-Creation Lab (CCL) initiatives, built with React, Node.js, Express, and MongoDB.

## Tech Stack

- **Frontend**: React 18, Vite, Tailwind CSS, Framer Motion
- **Backend**: Node.js, Express.js
- **Database**: MongoDB with Mongoose
- **Auth**: JWT-based authentication

## Project Structure

```
ccl-portal/
├── client/          # React frontend
│   ├── src/
│   │   ├── pages/          # Page components
│   │   │   ├── PortalHome.jsx      # Main portal landing
│   │   │   ├── CCLHome.jsx         # Individual CCL home
│   │   │   ├── juhu/               # Juhu Moragaon pages
│   │   │   ├── thane/              # Thane CCL pages
│   │   │   ├── admin/              # Admin pages
│   │   │   └── ComingSoon.jsx      # For inactive CCLs
│   │   ├── components/     # Reusable components
│   │   ├── api/            # API client
│   │   ├── context/        # React context
│   │   └── hooks/          # Custom hooks
│   └── ...
└── server/          # Express backend
    ├── models/      # MongoDB schemas
    ├── routes/      # API routes
    ├── controllers/ # Business logic
    ├── middleware/  # Auth, etc.
    └── utils/       # Seed data, helpers
```

## CCLs Included

| CCL | Status | Focus |
|-----|--------|-------|
| Juhu Moragaon | ✅ Active | Fishing village heritage, Koliwada |
| Thane SWM | ✅ Active | Solid Waste Management, Zero Waste |
| Nagaon Village Murbad | 🔜 Coming Soon | Rural community, wildlife |
| Mahim-Kelve Palghar | 🔜 Coming Soon | Fishermen, eco-tourism, petroglyphs |
| Ratnagiri/Raigad | 🔜 Coming Soon | PBR, medicinal knowledge |
| TBIA | 🔜 Coming Soon | Industry-academia, GRI reporting |

## Setup & Running

### Prerequisites
- Node.js 18+
- MongoDB (local or Atlas)

### Backend Setup
```bash
cd server
npm install
cp .env.example .env
# Edit .env with your MongoDB URI and JWT secret
npm run dev
```

### Frontend Setup
```bash
cd client
npm install
npm run dev
```

### Default Admin Credentials
- Email: `admin@ccl-portal.org`
- Password: `Admin@123`

## API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | /api/v1/ccls | Get all CCLs |
| GET | /api/v1/ccls/:slug | Get single CCL |
| GET | /api/v1/stories | Get all stories |
| GET | /api/v1/surveys | Get surveys |
| POST | /api/v1/contacts | Submit form |
| POST | /api/v1/auth/login | Admin login |

## Data Architecture

### Public Data (accessible without login)
- CCL basic information
- Published stories & success stories
- Survey summaries
- Gallery (public media)
- Contact forms

### Internal/Protected Data (admin login required)
- Full survey raw data
- All contact form submissions
- Unpublished content
- Carbon/GRI compliance data (TBIA)
- Government scheme documents (Nagaon)

## Adding New CCL Data

1. Add CCL document via POST /api/v1/ccls (admin)
2. Add stories via POST /api/v1/stories
3. Add media via POST /api/v1/media
4. Update status from 'coming-soon' to 'active'

## Environment Variables

```
PORT=5000
MONGODB_URI=mongodb://localhost:27017/ccl-portal
JWT_SECRET=your_secret_key
NODE_ENV=development
```
