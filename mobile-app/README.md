# Rentify Mobile App (React Native)

The mobile application for Rentify - Find and list verified sublets.

## 🎯 Target Users
- Students looking for temporary housing
- Young professionals seeking flexible leases
- Travelers needing short-term stays
- Interns requiring temporary accommodation

## ✨ Features

### User Features
- **Authentication**: Email, social login, phone verification
- **Property Search**: Advanced filters, map view, saved searches
- **Listings**: Create, edit, manage property listings
- **Messaging**: Real-time chat with property owners/renters
- **Bookings**: Request bookings, view booking history
- **Profile**: Trust scores, verification badges, reviews

### Tech Stack
- React Native 0.73
- TypeScript
- React Navigation
- Redux Toolkit
- React Native Maps
- Google Gemini AI
- AsyncStorage

## 📁 Project Structure

```
src/
├── assets/          # Images, icons, fonts
├── components/      # Reusable UI components
├── config/          # Configuration files
├── constants/       # App constants (theme, mock data)
├── hooks/           # Custom React hooks
├── navigation/      # Navigation setup
├── screens/         # Screen components
├── services/        # API and external services
├── store/           # Redux state management
├── styles/          # Global styles
├── types/           # TypeScript definitions
└── utils/           # Utility functions
```

## 🚀 Quick Start

### Prerequisites
- Node.js >= 18
- React Native CLI
- Xcode (for iOS)
- Android Studio (for Android)

### Installation

1. **Install dependencies**
   ```bash
   npm install
   ```

2. **iOS setup** (Mac only)
   ```bash
   cd ios && pod install && cd ..
   ```

3. **Environment variables**
   Create `.env` file:
   ```env
   GEMINI_API_KEY=your_api_key
   API_BASE_URL=http://localhost:3000
   ```

4. **Run the app**
   ```bash
   npm run ios      # iOS
   npm run android  # Android
   ```

## 📱 Screens

### Onboarding
- Welcome Screen
- Auth Screen (Login/Signup)
- Phone Verification
- Tutorial Slides

### Main App
- Home (Featured properties)
- Search (Filters + Map)
- Saved (Favorites)
- Messages (Conversations)
- Profile (User info)

### Additional
- Property Detail
- Create/Edit Listing
- Chat Screen
- Settings

## 🛠️ Development

### Available Scripts
```bash
npm start         # Start Metro bundler
npm run ios       # Run on iOS
npm run android   # Run on Android
npm test          # Run tests
npm run lint      # Lint code
```

### Debugging
- Press `Cmd + D` (iOS) or `Cmd + M` (Android) for dev menu
- Enable Hot Reloading for instant updates
- Use React Native Debugger for Redux DevTools

## 📦 Dependencies

Key packages:
- `@react-navigation/native` - Navigation
- `@reduxjs/toolkit` - State management
- `react-native-maps` - Map integration
- `react-native-vector-icons` - Icons
- `@google/generative-ai` - Gemini AI
- `axios` - API calls

## 🔐 Authentication Flow

1. User enters email/password or uses social login
2. Phone verification code sent
3. User verifies phone number
4. Tutorial shown (first time only)
5. Redirected to main app

## 🗺️ Navigation Structure

```
RootNavigator
├── OnboardingStack
│   ├── Welcome
│   ├── Auth
│   ├── Verification
│   └── Tutorial
└── MainTabs
    ├── Home
    ├── Search
    ├── Saved
    ├── Messages
    └── Profile
```

## 🎨 Design System

See `src/constants/theme.ts` for:
- Brand colors (#EF4444 primary)
- Typography scale
- Spacing system
- Shadow presets

## 🧪 Testing

```bash
npm test                    # Run all tests
npm test -- --coverage      # With coverage
npm test -- --watch         # Watch mode
```

## 📲 Building for Production

### iOS
1. Update version in `ios/Rentify/Info.plist`
2. Archive in Xcode
3. Upload to App Store Connect

### Android
```bash
cd android
./gradlew assembleRelease
```

## 🐛 Troubleshooting

**Metro bundler not starting**
```bash
npm start -- --reset-cache
```

**iOS build fails**
```bash
cd ios && pod deintegrate && pod install && cd ..
```

**Android build fails**
```bash
cd android && ./gradlew clean && cd ..
```

## 📚 Resources

- [React Native Docs](https://reactnative.dev/)
- [React Navigation](https://reactnavigation.org/)
- [Redux Toolkit](https://redux-toolkit.js.org/)

## 📝 License

MIT
