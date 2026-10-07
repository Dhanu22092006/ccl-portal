# CCL Portal — Proper Full-Stack Build

This build uses only the CCL information already present in the supplied project ZIP.
Juhu Moragaon has the richest content; other CCLs remain structured records that can be expanded later.

## Stack
- Frontend: React + JavaScript + Tailwind CSS + Vite
- Backend: Node.js + Express
- Database: MongoDB + Mongoose

## Run backend
```powershell
cd server
npm install
npm run dev
```

## Run frontend in a second terminal
```powershell
cd client
npm install
npm run dev
```

Open http://localhost:5173

## Admin
The supplied seed data contains the local development admin:
email: admin@ccl-portal.org
password: Admin@123

Change the password before any real/public deployment.

## Data model
All CCLs are synchronized by slug at startup. Existing records are updated from the seed catalogue instead of skipping the remaining CCLs when some records already exist.
