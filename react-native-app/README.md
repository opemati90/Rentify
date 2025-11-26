# Rentify - React Native Sublet Matching App

A comprehensive mobile application for students, young professionals, and travelers to find and list verified sublets.

## Features

### Core Features
- ✅ User authentication (email, social login)
- ✅ Phone verification for trust
- ✅ Interactive onboarding tutorial
- ✅ Property search with advanced filters
- ✅ Map view with price markers
- ✅ Property listings (featured, new, saved)
- ✅ Detailed property view with booking
- ✅ Multi-step listing creation
- ✅ AI-powered description generation (Gemini)
- ✅ In-app messaging between renters and owners
- ✅ User profiles with trust scores
- ✅ Review and rating system
- ✅ Admin dashboard for user/listing management

### Sublet-Specific Features
- Available date ranges
- Flexible lease durations (min/max months)
- Roommate information
- Utilities included/not included
- Furnished/unfurnished options
- Deposit requirements
- Property type filtering (Apartment, House, Villa, Studio, Room, Duplex)

## Project Structure

```
rentify/
├── android/                    # Android native code
├── ios/                        # iOS native code
├── src/
│   ├── components/            # Reusable UI components
│   │   ├── Button.tsx
│   │   ├── Input.tsx
│   │   ├── PropertyCard.tsx
│   │   ├── Badge.tsx
│   │   └── ...
│   ├── screens/               # App screens
│   │   ├── onboarding/
│   │   │   ├── WelcomeScreen.tsx
│   │   │   ├── AuthScreen.tsx
│   │   │   ├── VerificationScreen.tsx
│   │   │   └── TutorialScreen.tsx
│   │   ├── main/
│   │   │   ├── HomeScreen.tsx
│   │   │   ├── SearchScreen.tsx
│   │   │   ├── SavedScreen.tsx
│   │   │   ├── MessagesScreen.tsx
│   │   │   └── ProfileScreen.tsx
│   │   ├── property/
│   │   │   ├── PropertyDetailScreen.tsx
│   │   │   └── CreateListingScreen.tsx
│   │   ├── messaging/
│   │   │   └── ChatScreen.tsx
│   │   └── admin/
│   │       └── AdminDashboardScreen.tsx
│   ├── navigation/            # Navigation configuration
│   │   ├── AppNavigator.tsx
│   │   ├── MainTabNavigator.tsx
│   │   └── OnboardingNavigator.tsx
│   ├── services/              # API and external services
│   │   ├── api.ts
│   │   ├── gemini.ts
│   │   └── storage.ts
│   ├── types/                 # TypeScript type definitions
│   │   └── index.ts
│   ├── constants/             # App constants
│   │   ├── theme.ts
│   │   └── mockData.ts
│   └── utils/                 # Utility functions
│       └── helpers.ts
├── App.tsx                    # App entry point
├── package.json
├── tsconfig.json
└── README.md
```

## Installation

### Prerequisites
- Node.js >= 18
- React Native CLI
- Xcode (for iOS)
- Android Studio (for Android)

### Steps

1. **Clone the repository**
   ```bash
   cd react-native-app
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Install iOS dependencies (Mac only)**
   ```bash
   cd ios && pod install && cd ..
   ```

4. **Set up environment variables**
   Create a `.env` file in the root directory:
   ```
   GEMINI_API_KEY=your_gemini_api_key_here
   API_BASE_URL=https://your-backend-api.com
   ```

5. **Run the app**

   For iOS:
   ```bash
   npm run ios
   # or
   yarn ios
   ```

   For Android:
   ```bash
   npm run android
   # or
   yarn android
   ```

## Configuration

### Theme Customization
Edit `src/constants/theme.ts` to customize:
- Brand colors
- Typography
- Spacing
- Border radius
- Shadows

### Mock Data
Update `src/constants/mockData.ts` to add sample properties, users, and messages for development.

## Key Screens

### 1. Onboarding Flow
- **Welcome Screen**: Value proposition with CTAs
- **Auth Screen**: Email/social login and signup
- **Verification Screen**: Phone number verification
- **Tutorial Screen**: Swipeable onboarding cards

### 2. Main App
- **Home Screen**: Featured properties, new listings, category filters
- **Search Screen**: Advanced filters, map view, search results
- **Saved Screen**: User's favorite properties
- **Messages Screen**: Conversations with property owners
- **Profile Screen**: User info, listings, settings

### 3. Property Management
- **Property Detail**: Full property info, booking, contact owner
- **Create Listing**: Multi-step form with AI description generation

### 4. Admin Dashboard
- User management (verify, suspend, delete)
- Listing moderation (approve, reject, remove)
- Analytics and reports

## Features Breakdown

### Trust & Verification System
- ✅ Identity verification badges
- ✅ Trust scores (0-100)
- ✅ Verified reviews only
- ✅ Response time tracking
- ✅ Host verification status

### Search & Filters
- Price range slider
- Property type multi-select
- Bedroom/bathroom count
- Available date picker
- Lease duration range
- Furnished/utilities filters
- Roommate count filter
- Map with interactive markers

### Messaging System
- Real-time chat interface
- Message threads per property
- Read receipts
- Quick reply templates
- Notification badges

### AI Features (Gemini Integration)
- Auto-generate property descriptions
- Smart search suggestions
- Price recommendations
- Review sentiment analysis

## API Integration

The app is designed to work with a REST API. Update `src/services/api.ts` to point to your backend:

```typescript
const API_BASE_URL = process.env.API_BASE_URL || 'http://localhost:3000';

// Example endpoints:
// GET /api/properties - List properties
// GET /api/properties/:id - Get property details
// POST /api/properties - Create listing
// POST /api/auth/signup - User signup
// POST /api/auth/login - User login
// GET /api/messages - Get conversations
// POST /api/messages - Send message
```

## Testing

Run tests:
```bash
npm test
# or
yarn test
```

## Building for Production

### iOS
```bash
cd ios
xcodebuild -workspace Rentify.xcworkspace -scheme Rentify -configuration Release
```

### Android
```bash
cd android
./gradlew assembleRelease
```

## Accessibility Features
- High contrast text
- Adjustable font sizes
- Screen reader support
- Keyboard navigation
- Color-blind friendly design

## Performance Optimizations
- Image lazy loading
- List virtualization
- Memoized components
- Optimized re-renders
- Code splitting

## Security
- Encrypted local storage
- Secure authentication tokens
- Input validation
- XSS protection
- HTTPS-only API calls

## Future Enhancements
- [ ] Payment integration (Stripe)
- [ ] Calendar sync
- [ ] Push notifications
- [ ] Video tours
- [ ] Background checks
- [ ] E-signature for leases
- [ ] Multilingual support
- [ ] Dark mode

## Contributing
Contributions are welcome! Please follow these steps:
1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## License
MIT License - see LICENSE file for details

## Support
For issues and questions:
- GitHub Issues: [Your repo URL]
- Email: support@rentify.com

## Authors
- Your Name - Initial work

## Acknowledgments
- React Native community
- Inspired by Airbnb and Zillow designs
- Design inspiration from Dribbble
