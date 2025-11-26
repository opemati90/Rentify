# Rentify - Quick Start Guide

Get your React Native sublet app up and running in minutes!

## Prerequisites

Before you begin, ensure you have:

- **Node.js** (v18 or higher) - [Download](https://nodejs.org/)
- **npm** or **yarn** package manager
- **Git** - [Download](https://git-scm.com/)
- **React Native CLI** - `npm install -g react-native-cli`

### For iOS Development (Mac only):
- **Xcode** (latest version) - [Download from Mac App Store](https://apps.apple.com/us/app/xcode/id497799835)
- **CocoaPods** - `sudo gem install cocoapods`

### For Android Development:
- **Android Studio** - [Download](https://developer.android.com/studio)
- **JDK 11** - [Download](https://www.oracle.com/java/technologies/javase/jdk11-archive-downloads.html)
- Configure Android SDK in Android Studio

---

## Installation Steps

### 1. Navigate to Project Directory
```bash
cd /Users/yemi/Desktop/rentify/react-native-app
```

### 2. Install Dependencies
```bash
npm install
# or if you prefer yarn
yarn install
```

This will install all required packages including:
- React Navigation
- React Native Vector Icons
- React Native Maps
- Google Generative AI (Gemini)
- And more...

### 3. iOS Setup (Mac only)

Install iOS pods:
```bash
cd ios
pod install
cd ..
```

### 4. Set Up Environment Variables

Create a `.env` file in the root directory:
```bash
touch .env
```

Add your API keys:
```env
GEMINI_API_KEY=your_gemini_api_key_here
API_BASE_URL=http://localhost:3000
```

**Get your Gemini API key:**
1. Visit [Google AI Studio](https://makersuite.google.com/app/apikey)
2. Sign in with your Google account
3. Click "Create API Key"
4. Copy and paste into `.env` file

### 5. Link React Native Vector Icons

#### iOS:
Already configured via CocoaPods. Just run `pod install`.

#### Android:
Add to `android/app/build.gradle`:
```gradle
apply from: "../../node_modules/react-native-vector-icons/fonts.gradle"
```

### 6. Configure React Native Maps (Optional for now)

#### iOS:
Add to `ios/Podfile`:
```ruby
pod 'GoogleMaps'
pod 'Google-Maps-iOS-Utils'
```

Run `cd ios && pod install && cd ..`

#### Android:
Add to `android/app/src/main/AndroidManifest.xml`:
```xml
<meta-data
  android:name="com.google.android.geo.API_KEY"
  android:value="YOUR_GOOGLE_MAPS_API_KEY"/>
```

---

## Running the App

### iOS (Mac only)
```bash
npm run ios
# or
yarn ios
```

To run on a specific simulator:
```bash
npx react-native run-ios --simulator="iPhone 15 Pro"
```

### Android
Make sure you have an Android emulator running or a device connected.

```bash
npm run android
# or
yarn android
```

---

## Project Structure Overview

```
react-native-app/
├── App.tsx                    # Main entry point
├── src/
│   ├── components/           # Reusable UI components
│   │   ├── Button.tsx       ✅ Ready to use
│   │   ├── Input.tsx        📝 Implement based on guide
│   │   └── PropertyCard.tsx 📝 Implement based on guide
│   ├── screens/             📝 To be implemented
│   │   ├── onboarding/
│   │   ├── main/
│   │   ├── property/
│   │   ├── messaging/
│   │   └── admin/
│   ├── navigation/          ✅ Basic structure in App.tsx
│   ├── types/               ✅ Complete type definitions
│   │   └── index.ts
│   ├── constants/           ✅ Theme and mock data
│   │   ├── theme.ts
│   │   └── mockData.ts
│   └── services/            📝 To be implemented
│       ├── api.ts
│       ├── gemini.ts
│       └── storage.ts
```

**Legend:**
- ✅ = Ready to use
- 📝 = Needs implementation (see IMPLEMENTATION_GUIDE.md)

---

## Development Workflow

### 1. Start Metro Bundler
```bash
npm start
# or
yarn start
```

Keep this terminal window open.

### 2. Open a New Terminal and Run:
```bash
npm run ios    # for iOS
npm run android # for Android
```

### 3. Enable Hot Reloading
- Press `Cmd + D` (iOS) or `Cmd + M` (Android) in simulator
- Select "Enable Hot Reloading"
- Now changes will reflect instantly!

---

## Next Steps - What to Build First

Follow the **IMPLEMENTATION_GUIDE.md** file for a day-by-day plan:

### Week 1: Core Features
- ✅ Day 1: Setup (You just did this!)
- 📅 Days 2-3: Build remaining components (Input, PropertyCard, Badge)
- 📅 Days 4-5: Onboarding screens
- 📅 Days 6-7: Home and Search screens

### Week 2: Advanced Features
- 📅 Days 8-9: Property detail and listing creation
- 📅 Days 10-11: Messaging system
- 📅 Days 12-13: Admin dashboard
- 📅 Days 14-15: Polish and testing

---

## Troubleshooting

### Common Issues:

#### 1. Metro Bundler not starting
```bash
# Clear cache
npm start -- --reset-cache
```

#### 2. iOS build fails
```bash
cd ios
pod deintegrate
pod install
cd ..
npm run ios
```

#### 3. Android build fails
```bash
cd android
./gradlew clean
cd ..
npm run android
```

#### 4. "Command not found: react-native"
```bash
npm install -g react-native-cli
```

#### 5. Xcode signing issues
- Open `ios/Rentify.xcworkspace` in Xcode
- Select your team in Signing & Capabilities
- Change Bundle Identifier to something unique

---

## Testing Your Setup

To verify everything is working:

1. **Start the app** (iOS or Android)
2. **You should see:** Placeholder screens with navigation
3. **Try navigating:** Between different tabs

If you see this, congratulations! Your setup is complete. 🎉

---

## Useful Commands

```bash
# Check React Native environment
npx react-native doctor

# Clear all caches
npm start -- --reset-cache
watchman watch-del-all
rm -rf node_modules
npm install

# View available iOS simulators
xcrun simctl list devices

# View connected Android devices
adb devices

# Run on specific device
npx react-native run-ios --device "Your iPhone Name"
npx react-native run-android --deviceId=<device-id>
```

---

## Getting Help

**Documentation:**
- Read `IMPLEMENTATION_GUIDE.md` for detailed implementation steps
- Read `README.md` for project overview and architecture

**Resources:**
- [React Native Docs](https://reactnative.dev/docs/getting-started)
- [React Navigation Docs](https://reactnavigation.org/docs/getting-started)
- [Expo Icons](https://icons.expo.fyi/) - Icon reference

**Community:**
- [Stack Overflow - React Native](https://stackoverflow.com/questions/tagged/react-native)
- [React Native Community Discord](https://discord.com/invite/react-native)

---

## What's Next?

Now that your environment is set up, proceed to **IMPLEMENTATION_GUIDE.md** to start building your app screen by screen!

**Recommended path:**
1. ✅ Complete setup (You're here!)
2. 📖 Read IMPLEMENTATION_GUIDE.md
3. 🎨 Implement Input and PropertyCard components
4. 🚀 Build WelcomeScreen (your first screen!)
5. ⚡ Continue with onboarding flow

Happy coding! 🚀
