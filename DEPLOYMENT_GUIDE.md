# Rentify - Complete Deployment Guide

This guide will walk you through deploying the entire Rentify application stack using free-tier services.

## 📋 Table of Contents

1. [Prerequisites](#prerequisites)
2. [Third-Party Services Setup](#third-party-services-setup)
3. [Backend API Deployment (Railway)](#backend-api-deployment-railway)
4. [Admin Dashboard Deployment (Vercel)](#admin-dashboard-deployment-vercel)
5. [Mobile App Deployment (EAS Build)](#mobile-app-deployment-eas-build)
6. [Post-Deployment Configuration](#post-deployment-configuration)
7. [Testing the Deployment](#testing-the-deployment)
8. [Troubleshooting](#troubleshooting)

---

## Prerequisites

Before you begin, ensure you have:

- [ ] Node.js 18+ installed
- [ ] Git installed
- [ ] GitHub account
- [ ] npm or yarn installed
- [ ] Expo account (for mobile app deployment)

---

## Third-Party Services Setup

### 1. Supabase (Database - PostgreSQL)

**Free Tier:** 500MB database, 2GB bandwidth/month

1. **Create Account**
   - Go to [supabase.com](https://supabase.com)
   - Sign up with GitHub

2. **Create Project**
   - Click "New Project"
   - Project name: `rentify`
   - Database password: Save this securely
   - Region: Choose closest to your users
   - Click "Create new project"

3. **Get Credentials**
   - Go to Settings > API
   - Copy:
     - `Project URL` → `SUPABASE_URL`
     - `anon public` key → `SUPABASE_ANON_KEY`
     - `service_role` key → `SUPABASE_SERVICE_ROLE_KEY`

4. **Run Database Migration**
   - Go to SQL Editor
   - Copy contents of `backend/database/schema.sql`
   - Click "Run" to create all tables

5. **Seed Sample Data (Optional)**
   - In SQL Editor, copy contents of `backend/database/seed.sql`
   - Click "Run" to insert sample data

### 2. Firebase (Authentication & Push Notifications)

**Free Tier:** 10K verifications/month, unlimited push notifications

1. **Create Project**
   - Go to [console.firebase.google.com](https://console.firebase.google.com)
   - Click "Add project"
   - Project name: `Rentify`
   - Disable Google Analytics (optional)

2. **Enable Authentication**
   - Go to Authentication > Sign-in method
   - Enable "Email/Password"
   - Enable "Google" (optional)

3. **Get Web Credentials**
   - Go to Project Settings > General
   - Under "Your apps", click Web icon (</>)
   - Register app: `Rentify Web`
   - Copy Firebase config:
     ```javascript
     apiKey: "..." → FIREBASE_API_KEY
     authDomain: "..." → FIREBASE_AUTH_DOMAIN
     projectId: "..." → FIREBASE_PROJECT_ID
     storageBucket: "..." → FIREBASE_STORAGE_BUCKET
     messagingSenderId: "..." → FIREBASE_MESSAGING_SENDER_ID
     appId: "..." → FIREBASE_APP_ID
     ```

4. **Get Admin SDK Credentials**
   - Go to Project Settings > Service accounts
   - Click "Generate new private key"
   - Save the JSON file securely
   - Extract values:
     - `project_id` → `FIREBASE_PROJECT_ID`
     - `client_email` → `FIREBASE_CLIENT_EMAIL`
     - `private_key` → `FIREBASE_PRIVATE_KEY`

5. **Enable Cloud Messaging**
   - Go to Project Settings > Cloud Messaging
   - Copy Server Key → `FIREBASE_SERVER_KEY`

### 3. Cloudinary (Image Storage)

**Free Tier:** 25 GB storage, 25 GB bandwidth/month

1. **Create Account**
   - Go to [cloudinary.com](https://cloudinary.com)
   - Sign up for free

2. **Get Credentials**
   - Go to Dashboard
   - Copy:
     - Cloud name → `CLOUDINARY_CLOUD_NAME`
     - API Key → `CLOUDINARY_API_KEY`
     - API Secret → `CLOUDINARY_API_SECRET`

### 4. Google Maps API (Optional - Maps & Geocoding)

**Free Tier:** $200 credit/month

1. **Create Project**
   - Go to [console.cloud.google.com](https://console.cloud.google.com)
   - Create new project: `Rentify`

2. **Enable APIs**
   - Go to APIs & Services > Library
   - Enable:
     - Maps JavaScript API
     - Geocoding API
     - Places API

3. **Create API Key**
   - Go to APIs & Services > Credentials
   - Create credentials > API key
   - Copy API key → `GOOGLE_MAPS_API_KEY`
   - Restrict key to your domains (recommended)

### 5. Stripe (Payment Processing - Optional)

**Free Tier:** No monthly fees, pay per transaction

1. **Create Account**
   - Go to [stripe.com](https://stripe.com)
   - Sign up

2. **Get API Keys**
   - Go to Developers > API keys
   - Copy:
     - Publishable key → `STRIPE_PUBLISHABLE_KEY`
     - Secret key → `STRIPE_SECRET_KEY`

---

## Backend API Deployment (Railway)

**Free Tier:** $5 credit/month, 500 hours execution

### Step 1: Prepare Environment Variables

Create a `.env.production` file in the `backend` directory:

```env
# Server
NODE_ENV=production
PORT=5000

# Database (Supabase)
SUPABASE_URL=your-supabase-url
SUPABASE_ANON_KEY=your-supabase-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-supabase-service-role-key
DATABASE_URL=postgresql://postgres:[password]@[host]:5432/postgres

# Firebase
FIREBASE_PROJECT_ID=your-firebase-project-id
FIREBASE_CLIENT_EMAIL=your-firebase-client-email
FIREBASE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\n...\n-----END PRIVATE KEY-----\n"

# Cloudinary
CLOUDINARY_CLOUD_NAME=your-cloudinary-cloud-name
CLOUDINARY_API_KEY=your-cloudinary-api-key
CLOUDINARY_API_SECRET=your-cloudinary-api-secret

# JWT
JWT_SECRET=your-super-secret-jwt-key-min-32-characters

# Optional Services
GOOGLE_MAPS_API_KEY=your-google-maps-api-key
STRIPE_SECRET_KEY=your-stripe-secret-key
```

### Step 2: Deploy to Railway

1. **Create Railway Account**
   - Go to [railway.app](https://railway.app)
   - Sign up with GitHub

2. **Create New Project**
   - Click "New Project"
   - Select "Deploy from GitHub repo"
   - Connect your GitHub account
   - Select your Rentify repository

3. **Configure Service**
   - Railway will auto-detect the backend
   - Go to your service settings

4. **Add Environment Variables**
   - Go to Variables tab
   - Click "Raw Editor"
   - Paste your `.env.production` content
   - Click "Update Variables"

5. **Configure Build**
   - Railway will use the `Procfile` automatically
   - Build command: `npm run build`
   - Start command: `npm start`

6. **Deploy**
   - Railway will automatically deploy
   - Wait for deployment to complete
   - Copy your Railway URL (e.g., `https://rentify-backend.up.railway.app`)

### Step 3: Verify Deployment

```bash
# Test health endpoint
curl https://your-railway-app.railway.app/health

# Expected response:
# {"status":"ok","timestamp":"2024-..."}
```

---

## Admin Dashboard Deployment (Vercel)

**Free Tier:** Unlimited deployments, 100GB bandwidth/month

### Step 1: Prepare Environment Variables

Create a `.env.production` file in `admin-dashboard`:

```env
VITE_API_URL=https://your-railway-app.railway.app/api
VITE_FIREBASE_API_KEY=your-firebase-api-key
VITE_FIREBASE_AUTH_DOMAIN=your-firebase-auth-domain
VITE_FIREBASE_PROJECT_ID=your-firebase-project-id
VITE_FIREBASE_STORAGE_BUCKET=your-firebase-storage-bucket
VITE_FIREBASE_MESSAGING_SENDER_ID=your-firebase-sender-id
VITE_FIREBASE_APP_ID=your-firebase-app-id
```

### Step 2: Deploy to Vercel

1. **Install Vercel CLI** (optional)
   ```bash
   npm install -g vercel
   ```

2. **Deploy via Vercel Dashboard**
   - Go to [vercel.com](https://vercel.com)
   - Sign up with GitHub
   - Click "New Project"
   - Import your Rentify repository
   - Root directory: `admin-dashboard`
   - Framework: Vite
   - Build command: `npm run build`
   - Output directory: `dist`

3. **Add Environment Variables**
   - In project settings > Environment Variables
   - Add all variables from `.env.production`
   - Save

4. **Deploy**
   - Click "Deploy"
   - Wait for deployment
   - Copy your Vercel URL (e.g., `https://rentify-admin.vercel.app`)

### Alternative: Deploy via CLI

```bash
cd admin-dashboard
vercel --prod
# Follow prompts to configure and deploy
```

---

## Mobile App Deployment (EAS Build)

**Free Tier:** 30 builds/month

### Step 1: Install EAS CLI

```bash
npm install -g eas-cli
```

### Step 2: Login to Expo

```bash
eas login
# Enter your Expo credentials
```

### Step 3: Configure EAS

```bash
cd mobile-app

# Initialize EAS (if not already done)
eas build:configure
```

### Step 4: Update Environment Variables

Edit `eas.json` with your production values:

```json
{
  "build": {
    "production": {
      "env": {
        "EXPO_PUBLIC_API_URL": "https://your-railway-app.railway.app/api",
        "EXPO_PUBLIC_FIREBASE_API_KEY": "your-key",
        "EXPO_PUBLIC_FIREBASE_AUTH_DOMAIN": "your-domain",
        "EXPO_PUBLIC_FIREBASE_PROJECT_ID": "your-project-id",
        "EXPO_PUBLIC_GOOGLE_MAPS_API_KEY": "your-maps-key"
      }
    }
  }
}
```

### Step 5: Update app.json

```json
{
  "expo": {
    "extra": {
      "eas": {
        "projectId": "your-eas-project-id"
      }
    },
    "owner": "your-expo-username"
  }
}
```

### Step 6: Build for Android

```bash
# Build APK for testing
eas build --platform android --profile preview

# Build for Google Play Store
eas build --platform android --profile production
```

### Step 7: Build for iOS

```bash
# Build for TestFlight
eas build --platform ios --profile preview

# Build for App Store
eas build --platform ios --profile production
```

### Step 8: Submit to App Stores

```bash
# Submit to Google Play
eas submit --platform android

# Submit to Apple App Store
eas submit --platform ios
```

---

## Post-Deployment Configuration

### 1. Update CORS Settings

In `backend/src/server.ts`, update allowed origins:

```typescript
const corsOptions = {
  origin: [
    'https://rentify-admin.vercel.app',
    'http://localhost:3000', // Keep for local development
  ],
  credentials: true,
};
```

### 2. Configure Firebase Authorized Domains

1. Go to Firebase Console > Authentication > Settings
2. Under "Authorized domains", add:
   - `your-railway-app.railway.app`
   - `rentify-admin.vercel.app`

### 3. Update Mobile App API URLs

Ensure mobile app points to production API:
- Update `mobile-app/src/services/api/client.ts`
- Set `baseURL` to your Railway URL

### 4. Set Up Custom Domains (Optional)

**Railway:**
```bash
# In Railway dashboard:
# Settings > Domains > Add custom domain
# Example: api.rentify.com
```

**Vercel:**
```bash
# In Vercel dashboard:
# Settings > Domains > Add
# Example: admin.rentify.com
```

---

## Testing the Deployment

### Backend API Tests

```bash
# Health check
curl https://your-api.railway.app/health

# Register user
curl -X POST https://your-api.railway.app/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"name":"Test User","email":"test@example.com","password":"password123"}'

# Login
curl -X POST https://your-api.railway.app/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"password123"}'
```

### Admin Dashboard Tests

1. Open `https://rentify-admin.vercel.app`
2. Login with admin credentials:
   - Email: `admin@rentify.com`
   - Password: `admin123`
3. Verify dashboard loads correctly
4. Check property approval workflow
5. Test analytics page

### Mobile App Tests

1. Download APK/IPA from EAS build
2. Install on test device
3. Test user registration and login
4. Test property search and filtering
5. Test messaging functionality
6. Test booking flow

---

## Monitoring and Logs

### Railway Logs

```bash
# View logs in Railway dashboard
# Deployments > Select deployment > Logs
```

### Vercel Logs

```bash
# View logs in Vercel dashboard
# Deployments > Select deployment > Logs

# Or use CLI
vercel logs
```

### Mobile App Logs

```bash
# View build logs
eas build:list

# View specific build
eas build:view [build-id]
```

---

## Troubleshooting

### Common Issues

#### Backend Won't Start

**Issue:** Railway deployment fails
**Solution:**
- Check environment variables are set correctly
- Verify database connection string
- Check Railway logs for specific errors

#### CORS Errors

**Issue:** Admin dashboard can't connect to API
**Solution:**
- Add Vercel domain to CORS whitelist in `backend/src/server.ts`
- Redeploy backend

#### Mobile App Build Fails

**Issue:** EAS build fails
**Solution:**
- Check `eas.json` configuration
- Verify all dependencies in `package.json`
- Check EAS build logs for specific errors

#### Database Connection Issues

**Issue:** API can't connect to Supabase
**Solution:**
- Verify `SUPABASE_URL` and keys are correct
- Check Supabase project is active
- Verify database is not paused (free tier auto-pauses after inactivity)

#### Firebase Authentication Errors

**Issue:** Users can't sign in
**Solution:**
- Verify Firebase config in environment variables
- Check authorized domains in Firebase console
- Ensure email/password auth is enabled

---

## Cost Breakdown (Free Tier)

| Service | Free Tier Limits | Cost if Exceeded |
|---------|-----------------|------------------|
| Supabase | 500MB DB, 2GB bandwidth | $25/month for Pro |
| Railway | $5 credit/month | Pay as you go |
| Vercel | 100GB bandwidth | $20/month for Pro |
| Cloudinary | 25GB storage/bandwidth | $0.0002/GB |
| Firebase | 10K auths/month | Pay as you go |
| Google Maps | $200 credit/month | Pay as you go |
| EAS Build | 30 builds/month | $29/month unlimited |

**Total Cost (staying in free tier):** $0/month

---

## Security Checklist

- [ ] All environment variables are set and secure
- [ ] JWT secret is strong (32+ characters)
- [ ] Firebase private key is properly escaped
- [ ] Database credentials are not committed to Git
- [ ] CORS is properly configured
- [ ] Rate limiting is enabled
- [ ] Helmet security headers are active
- [ ] HTTPS is enforced on all endpoints
- [ ] API keys are restricted to specific domains

---

## Next Steps

1. **Set up monitoring:**
   - Use Railway metrics for API performance
   - Use Vercel analytics for dashboard usage
   - Set up error tracking (e.g., Sentry)

2. **Configure CI/CD:**
   - Auto-deploy on Git push
   - Run tests before deployment
   - Set up staging environments

3. **Add custom domains:**
   - Purchase domain name
   - Configure DNS records
   - Add SSL certificates

4. **Implement analytics:**
   - Google Analytics for web
   - Firebase Analytics for mobile
   - Custom event tracking

---

## Support

For issues or questions:
- Backend: Check Railway logs
- Admin Dashboard: Check Vercel logs
- Mobile App: Check EAS build logs
- Database: Check Supabase logs

**Documentation:**
- [Railway Docs](https://docs.railway.app)
- [Vercel Docs](https://vercel.com/docs)
- [EAS Build Docs](https://docs.expo.dev/build/introduction)
- [Supabase Docs](https://supabase.com/docs)

---

## Conclusion

Your Rentify application is now fully deployed! 🎉

**Live URLs:**
- Backend API: `https://your-app.railway.app`
- Admin Dashboard: `https://rentify-admin.vercel.app`
- Mobile App: Available via EAS Build or App Stores

Remember to monitor your usage to stay within free tier limits.
