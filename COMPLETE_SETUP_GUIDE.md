# Rentify - Complete Setup Guide

Complete guide to set up the entire Rentify ecosystem from scratch.

## 📋 Table of Contents

1. [Overview](#overview)
2. [Prerequisites](#prerequisites)
3. [Project Structure](#project-structure)
4. [Setup Instructions](#setup-instructions)
5. [Development Workflow](#development-workflow)
6. [Production Deployment](#production-deployment)

---

## 🎯 Overview

Rentify consists of 4 interconnected projects:

| Project | Technology | Purpose |
|---------|------------|---------|
| **Mobile App** | React Native | iOS/Android app for users |
| **Admin Dashboard** | React Web | Management portal |
| **Landing Page** | React Web | Marketing website |
| **Shared** | TypeScript | Common code/utilities |

---

## ✅ Prerequisites

### Required Software

1. **Node.js** (v18 or higher)
   ```bash
   node --version  # Should be >= 18
   ```
   Download: https://nodejs.org/

2. **Git**
   ```bash
   git --version
   ```
   Download: https://git-scm.com/

3. **For Mobile App (iOS)**:
   - **Xcode** (latest version) - Mac only
   - **CocoaPods**: `sudo gem install cocoapods`

4. **For Mobile App (Android)**:
   - **Android Studio**
   - **JDK 11**

### Optional Tools

- **VS Code** - Recommended IDE
- **React Native Debugger** - Debugging
- **Postman** - API testing

---

## 📁 Project Structure

Your folder structure should look like this:

```
rentify/
├── mobile-app/          # React Native mobile app
├── admin-dashboard/     # React web admin
├── landing-page/        # React marketing site
├── shared/              # Shared utilities
├── FOLDER_STRUCTURE.md  # Detailed structure doc
└── COMPLETE_SETUP_GUIDE.md  # This file
```

---

## 🚀 Setup Instructions

### Step 1: Verify Folder Structure

Navigate to your project:
```bash
cd /Users/yemi/Desktop/rentify
```

Verify structure:
```bash
ls -la
# You should see: mobile-app, admin-dashboard, landing-page, shared
```

---

### Step 2: Set Up Mobile App

```bash
cd mobile-app
```

#### A. Create package.json
```bash
cat > package.json << 'EOF'
{
  "name": "rentify-mobile",
  "version": "1.0.0",
  "private": true,
  "scripts": {
    "android": "react-native run-android",
    "ios": "react-native run-ios",
    "start": "react-native start",
    "test": "jest",
    "lint": "eslint ."
  },
  "dependencies": {
    "react": "18.2.0",
    "react-native": "0.73.2",
    "@react-navigation/native": "^6.1.9",
    "@react-navigation/stack": "^6.3.20",
    "@react-navigation/bottom-tabs": "^6.5.11",
    "@reduxjs/toolkit": "^2.0.1",
    "react-redux": "^9.0.4",
    "react-native-safe-area-context": "^4.8.2",
    "react-native-screens": "^3.29.0",
    "react-native-gesture-handler": "^2.14.1",
    "react-native-vector-icons": "^10.0.3",
    "react-native-maps": "^1.10.0",
    "axios": "^1.6.5",
    "@google/generative-ai": "^0.1.3"
  },
  "devDependencies": {
    "@babel/core": "^7.20.0",
    "@babel/runtime": "^7.20.0",
    "@react-native/babel-preset": "0.73.19",
    "@types/react": "^18.2.6",
    "typescript": "5.0.4",
    "jest": "^29.6.3",
    "eslint": "^8.19.0"
  }
}
EOF
```

#### B. Create tsconfig.json
```bash
cat > tsconfig.json << 'EOF'
{
  "extends": "@react-native/typescript-config/tsconfig.json",
  "compilerOptions": {
    "strict": true,
    "baseUrl": ".",
    "paths": {
      "@/*": ["src/*"]
    }
  }
}
EOF
```

#### C. Create .env file
```bash
cat > .env << 'EOF'
GEMINI_API_KEY=your_gemini_api_key_here
API_BASE_URL=http://localhost:3000
GOOGLE_MAPS_API_KEY=your_maps_key_here
EOF
```

#### D. Install dependencies
```bash
npm install
```

#### E. iOS setup (Mac only)
```bash
cd ios
pod install
cd ..
```

#### F. Create App.tsx
```bash
cat > App.tsx << 'EOF'
import React from 'react';
import { SafeAreaView, Text, StyleSheet } from 'react-native';

const App = () => {
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.text}>Rentify Mobile App</Text>
      <Text>Setup successful! Start building.</Text>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  text: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
});

export default App;
EOF
```

---

### Step 3: Set Up Admin Dashboard

```bash
cd ../admin-dashboard
```

#### A. Initialize React app
```bash
npx create-react-app . --template typescript
```

#### B. Install additional dependencies
```bash
npm install @mui/material @emotion/react @emotion/styled
npm install react-router-dom@6
npm install @reduxjs/toolkit react-redux
npm install axios
npm install chart.js react-chartjs-2
```

#### C. Create .env
```bash
cat > .env << 'EOF'
REACT_APP_API_URL=http://localhost:3000
REACT_APP_ADMIN_EMAIL=admin@rentify.com
EOF
```

---

### Step 4: Set Up Landing Page

```bash
cd ../landing-page
```

#### A. Initialize React app
```bash
npx create-react-app . --template typescript
```

#### B. Install dependencies
```bash
npm install react-router-dom@6
npm install framer-motion
npm install react-helmet-async
npm install tailwindcss postcss autoprefixer
npx tailwindcss init -p
```

#### C. Create .env
```bash
cat > .env << 'EOF'
REACT_APP_API_URL=https://api.rentify.com
REACT_APP_GA_ID=UA-XXXXXXXXX-X
EOF
```

---

### Step 5: Set Up Shared Code

```bash
cd ../shared
```

#### A. Create package.json
```bash
cat > package.json << 'EOF'
{
  "name": "@rentify/shared",
  "version": "1.0.0",
  "main": "index.ts",
  "types": "index.ts",
  "scripts": {
    "test": "jest"
  },
  "devDependencies": {
    "typescript": "^5.0.4",
    "@types/node": "^20.0.0"
  }
}
EOF
```

#### B. Create tsconfig.json
```bash
cat > tsconfig.json << 'EOF'
{
  "compilerOptions": {
    "target": "ES2020",
    "module": "commonjs",
    "declaration": true,
    "outDir": "./dist",
    "strict": true,
    "esModuleInterop": true
  },
  "include": ["**/*"],
  "exclude": ["node_modules", "dist"]
}
EOF
```

#### C. Install dependencies
```bash
npm install
```

---

### Step 6: Link Shared Code

In each project (mobile-app, admin-dashboard, landing-page):

```bash
# Add to package.json dependencies
{
  "dependencies": {
    "@rentify/shared": "file:../shared"
  }
}

# Then install
npm install
```

---

## 🔧 Development Workflow

### Running All Projects

#### Terminal 1: Mobile App
```bash
cd mobile-app
npm start          # Start Metro bundler
```

#### Terminal 2: iOS/Android
```bash
npm run ios        # Run iOS
# or
npm run android    # Run Android
```

#### Terminal 3: Admin Dashboard
```bash
cd admin-dashboard
npm start          # Runs on http://localhost:3000
```

#### Terminal 4: Landing Page
```bash
cd landing-page
npm start          # Runs on http://localhost:3001
```

---

## 🎨 Next Steps

### Mobile App
1. Copy components from `react-native-app/` to `mobile-app/`
2. Implement screens one by one
3. Connect to backend API
4. Test on real devices

### Admin Dashboard
1. Set up routing
2. Create layout (sidebar, header)
3. Build dashboard pages
4. Integrate charts
5. Connect to API

### Landing Page
1. Create all sections
2. Add animations
3. Optimize images
4. Set up analytics
5. Deploy

---

## 📦 Production Deployment

### Mobile App

#### iOS
```bash
cd mobile-app/ios
xcodebuild -workspace Rentify.xcworkspace \
           -scheme Rentify \
           -configuration Release
```

#### Android
```bash
cd mobile-app/android
./gradlew assembleRelease
```

### Web Apps (Admin + Landing)

#### Build
```bash
npm run build
```

#### Deploy to Vercel
```bash
npm install -g vercel
vercel --prod
```

#### Deploy to Netlify
```bash
npm install -g netlify-cli
netlify deploy --prod
```

---

## 🔐 Environment Variables

### Mobile App (.env)
```env
GEMINI_API_KEY=xxx
API_BASE_URL=https://api.rentify.com
GOOGLE_MAPS_API_KEY=xxx
```

### Admin Dashboard (.env)
```env
REACT_APP_API_URL=https://api.rentify.com
REACT_APP_ADMIN_EMAIL=admin@rentify.com
```

### Landing Page (.env)
```env
REACT_APP_API_URL=https://api.rentify.com
REACT_APP_GA_ID=UA-XXXXXXXXX-X
```

---

## 🐛 Common Issues

### Mobile App

**Metro bundler error**
```bash
npm start -- --reset-cache
```

**iOS build fails**
```bash
cd ios
pod deintegrate
pod install
cd ..
```

**Android build fails**
```bash
cd android
./gradlew clean
cd ..
```

### Web Apps

**Port already in use**
```bash
PORT=3001 npm start
```

**Build fails**
```bash
rm -rf node_modules package-lock.json
npm install
```

---

## ✅ Checklist

- [ ] Node.js installed (v18+)
- [ ] Git installed
- [ ] Xcode installed (Mac, for iOS)
- [ ] Android Studio installed (for Android)
- [ ] All folders created
- [ ] Mobile app dependencies installed
- [ ] Admin dashboard set up
- [ ] Landing page set up
- [ ] Shared code configured
- [ ] Environment variables configured
- [ ] Mobile app runs successfully
- [ ] Admin dashboard runs successfully
- [ ] Landing page runs successfully

---

## 📚 Resources

### Documentation
- See individual README files in each project folder
- `FOLDER_STRUCTURE.md` for detailed structure
- `IMPLEMENTATION_GUIDE.md` in react-native-app

### External Links
- [React Native Docs](https://reactnative.dev/)
- [React Docs](https://react.dev/)
- [Redux Toolkit](https://redux-toolkit.js.org/)

---

## 🎉 Success!

If you've completed all steps, you should have:
- ✅ Mobile app running on simulator/emulator
- ✅ Admin dashboard running in browser
- ✅ Landing page running in browser
- ✅ Shared code linked to all projects

**Ready to start building!** 🚀

---

## 📞 Support

For issues or questions:
- Check individual project READMEs
- Review FOLDER_STRUCTURE.md
- Consult implementation guides

---

Last updated: 2025-01-26
