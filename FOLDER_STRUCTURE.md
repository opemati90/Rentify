# Rentify - Complete Project Structure

This document outlines the complete folder structure for the Rentify ecosystem, including the Mobile App, Admin Dashboard, Landing Page, and Shared code.

## 📁 Root Structure

```
rentify/
├── mobile-app/                  # React Native mobile application
├── admin-dashboard/             # React web admin dashboard
├── landing-page/                # React product landing page
├── shared/                      # Shared code between projects
├── README.md                    # Root project documentation
├── .gitignore                   # Git ignore rules
└── package.json                 # Root workspace configuration (optional)
```

---

## 📱 Mobile App (React Native)

```
mobile-app/
├── android/                     # Android native code
│   ├── app/
│   ├── gradle/
│   └── build.gradle
│
├── ios/                         # iOS native code
│   ├── Rentify/
│   ├── Rentify.xcodeproj/
│   └── Podfile
│
├── src/
│   ├── assets/                  # Media files
│   │   ├── images/
│   │   │   ├── logo.png
│   │   │   ├── onboarding/
│   │   │   └── properties/
│   │   ├── icons/
│   │   │   └── tab-icons/
│   │   └── fonts/
│   │       └── CustomFont.ttf
│   │
│   ├── components/              # Reusable UI components
│   │   ├── common/
│   │   │   ├── Button.tsx
│   │   │   ├── Input.tsx
│   │   │   ├── Badge.tsx
│   │   │   ├── Card.tsx
│   │   │   └── Avatar.tsx
│   │   ├── property/
│   │   │   ├── PropertyCard.tsx
│   │   │   ├── PropertyCardHorizontal.tsx
│   │   │   ├── PropertyGrid.tsx
│   │   │   └── PropertyFilter.tsx
│   │   ├── messaging/
│   │   │   ├── MessageBubble.tsx
│   │   │   ├── ConversationItem.tsx
│   │   │   └── ChatInput.tsx
│   │   └── index.ts             # Barrel exports
│   │
│   ├── config/                  # Configuration files
│   │   ├── api.config.ts        # API endpoints
│   │   ├── env.config.ts        # Environment variables
│   │   └── navigation.config.ts # Navigation options
│   │
│   ├── constants/               # App constants
│   │   ├── theme.ts             # Colors, spacing, typography
│   │   ├── mockData.ts          # Development data
│   │   ├── propertyTypes.ts     # Property type definitions
│   │   └── index.ts
│   │
│   ├── hooks/                   # Custom React hooks
│   │   ├── useAuth.ts           # Authentication hook
│   │   ├── useFetch.ts          # Data fetching hook
│   │   ├── useDebounce.ts       # Debounce hook
│   │   ├── useGeolocation.ts    # Location hook
│   │   └── index.ts
│   │
│   ├── navigation/              # Navigation setup
│   │   ├── AppNavigator.tsx     # Root navigator
│   │   ├── AuthNavigator.tsx    # Auth flow navigator
│   │   ├── MainTabNavigator.tsx # Bottom tabs
│   │   ├── types.ts             # Navigation types
│   │   └── linking.ts           # Deep linking config
│   │
│   ├── screens/                 # Screen components
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
│   │   │   ├── CreateListingScreen.tsx
│   │   │   └── EditListingScreen.tsx
│   │   ├── messaging/
│   │   │   └── ChatScreen.tsx
│   │   └── settings/
│   │       ├── SettingsScreen.tsx
│   │       ├── EditProfileScreen.tsx
│   │       └── VerificationScreen.tsx
│   │
│   ├── services/                # External services
│   │   ├── api/
│   │   │   ├── auth.service.ts
│   │   │   ├── property.service.ts
│   │   │   ├── message.service.ts
│   │   │   ├── user.service.ts
│   │   │   └── index.ts
│   │   ├── storage/
│   │   │   └── storage.service.ts
│   │   ├── gemini/
│   │   │   └── gemini.service.ts
│   │   └── payment/
│   │       └── payment.service.ts
│   │
│   ├── store/                   # State management
│   │   ├── slices/
│   │   │   ├── authSlice.ts
│   │   │   ├── propertySlice.ts
│   │   │   ├── messageSlice.ts
│   │   │   └── userSlice.ts
│   │   ├── store.ts             # Redux store config
│   │   ├── hooks.ts             # Typed hooks
│   │   └── index.ts
│   │
│   ├── styles/                  # Global styles
│   │   ├── global.styles.ts     # Global style definitions
│   │   └── shadows.ts           # Shadow presets
│   │
│   ├── types/                   # TypeScript types
│   │   ├── index.ts             # Main type definitions
│   │   ├── api.types.ts         # API response types
│   │   └── navigation.types.ts  # Navigation types
│   │
│   ├── utils/                   # Utility functions
│   │   ├── dateFormat.ts        # Date formatting
│   │   ├── validation.ts        # Form validation
│   │   ├── currency.ts          # Currency formatting
│   │   └── helpers.ts           # General helpers
│   │
│   └── App.tsx                  # App entry point
│
├── .env                         # Environment variables
├── .env.example                 # Example env file
├── .gitignore
├── app.json                     # React Native config
├── babel.config.js
├── metro.config.js
├── package.json
├── tsconfig.json
└── README.md
```

---

## 🖥️ Admin Dashboard (React Web)

```
admin-dashboard/
├── public/
│   ├── index.html
│   ├── favicon.ico
│   ├── manifest.json
│   └── robots.txt
│
├── src/
│   ├── assets/
│   │   ├── images/
│   │   │   └── logo.svg
│   │   ├── icons/
│   │   └── styles/
│   │       └── fonts/
│   │
│   ├── components/              # Reusable components
│   │   ├── layout/
│   │   │   ├── Sidebar.tsx
│   │   │   ├── Header.tsx
│   │   │   ├── Footer.tsx
│   │   │   └── Layout.tsx
│   │   ├── common/
│   │   │   ├── Button.tsx
│   │   │   ├── Input.tsx
│   │   │   ├── Table.tsx
│   │   │   ├── Modal.tsx
│   │   │   ├── Card.tsx
│   │   │   └── LoadingSpinner.tsx
│   │   ├── charts/
│   │   │   ├── LineChart.tsx
│   │   │   ├── BarChart.tsx
│   │   │   ├── PieChart.tsx
│   │   │   └── StatsCard.tsx
│   │   └── forms/
│   │       ├── PropertyForm.tsx
│   │       ├── UserForm.tsx
│   │       └── ReviewForm.tsx
│   │
│   ├── config/
│   │   ├── api.config.ts
│   │   ├── routes.ts
│   │   └── theme.ts
│   │
│   ├── pages/                   # Page components
│   │   ├── Dashboard/
│   │   │   ├── Dashboard.tsx
│   │   │   └── Dashboard.styles.ts
│   │   ├── Users/
│   │   │   ├── UserList.tsx
│   │   │   ├── UserDetail.tsx
│   │   │   └── UserManagement.tsx
│   │   ├── Properties/
│   │   │   ├── PropertyList.tsx
│   │   │   ├── PropertyDetail.tsx
│   │   │   └── PropertyModeration.tsx
│   │   ├── Bookings/
│   │   │   ├── BookingList.tsx
│   │   │   └── BookingDetail.tsx
│   │   ├── Reports/
│   │   │   ├── Analytics.tsx
│   │   │   ├── Revenue.tsx
│   │   │   └── UserActivity.tsx
│   │   ├── Reviews/
│   │   │   └── ReviewModeration.tsx
│   │   ├── Settings/
│   │   │   └── Settings.tsx
│   │   └── Login/
│   │       └── Login.tsx
│   │
│   ├── services/                # API services
│   │   ├── auth.service.ts
│   │   ├── user.service.ts
│   │   ├── property.service.ts
│   │   ├── booking.service.ts
│   │   ├── analytics.service.ts
│   │   └── index.ts
│   │
│   ├── store/                   # State management
│   │   ├── slices/
│   │   │   ├── authSlice.ts
│   │   │   ├── userSlice.ts
│   │   │   ├── propertySlice.ts
│   │   │   └── analyticsSlice.ts
│   │   ├── store.ts
│   │   └── hooks.ts
│   │
│   ├── styles/                  # Global styles
│   │   ├── global.css
│   │   ├── variables.css        # CSS variables
│   │   └── theme.ts
│   │
│   ├── types/                   # TypeScript types
│   │   ├── index.ts
│   │   ├── user.types.ts
│   │   ├── property.types.ts
│   │   └── api.types.ts
│   │
│   ├── utils/                   # Utility functions
│   │   ├── dateFormat.ts
│   │   ├── validation.ts
│   │   ├── exportData.ts
│   │   └── helpers.ts
│   │
│   ├── App.tsx                  # Main App component
│   ├── index.tsx                # Entry point
│   └── routes.tsx               # Route definitions
│
├── .env
├── .env.example
├── .gitignore
├── package.json
├── tsconfig.json
├── webpack.config.js            # Webpack config (if not using CRA)
└── README.md
```

---

## 🌐 Landing Page (React Web)

```
landing-page/
├── public/
│   ├── index.html
│   ├── favicon.ico
│   ├── robots.txt
│   ├── sitemap.xml
│   └── assets/
│       ├── images/
│       │   ├── hero-image.jpg
│       │   ├── app-screenshot-1.png
│       │   ├── app-screenshot-2.png
│       │   └── features/
│       ├── icons/
│       │   ├── app-icon.png
│       │   └── social-icons/
│       └── fonts/
│
├── src/
│   ├── components/              # Page sections
│   │   ├── Header.tsx           # Navigation bar
│   │   ├── HeroSection.tsx      # Main hero/banner
│   │   ├── FeaturesSection.tsx  # App features
│   │   ├── HowItWorks.tsx       # Process explanation
│   │   ├── TestimonialSection.tsx # User reviews
│   │   ├── PricingSection.tsx   # Pricing (if applicable)
│   │   ├── CtaSection.tsx       # Call to action
│   │   ├── Footer.tsx           # Footer with links
│   │   └── common/
│   │       ├── Button.tsx
│   │       ├── Card.tsx
│   │       └── Modal.tsx
│   │
│   ├── pages/
│   │   ├── LandingPage.tsx      # Main landing page
│   │   ├── PrivacyPolicy.tsx
│   │   └── TermsOfService.tsx
│   │
│   ├── styles/
│   │   ├── main.css             # Global styles
│   │   ├── header.css
│   │   ├── heroSection.css
│   │   ├── featuresSection.css
│   │   ├── testimonialSection.css
│   │   ├── cta.css
│   │   ├── footer.css
│   │   └── responsive.css       # Media queries
│   │
│   ├── assets/
│   │   ├── images/
│   │   │   └── illustrations/
│   │   └── icons/
│   │
│   ├── utils/
│   │   ├── formValidation.ts
│   │   ├── scrollToTop.ts
│   │   └── analytics.ts         # Google Analytics/tracking
│   │
│   ├── App.tsx
│   └── index.tsx
│
├── .env
├── .gitignore
├── package.json
├── tsconfig.json
├── webpack.config.js
└── README.md
```

---

## 🔗 Shared Code

```
shared/
├── components/                  # Shared UI components
│   ├── Button/
│   │   ├── Button.tsx
│   │   ├── Button.test.tsx
│   │   └── index.ts
│   ├── Input/
│   │   ├── Input.tsx
│   │   └── index.ts
│   ├── Modal/
│   │   ├── Modal.tsx
│   │   └── index.ts
│   └── index.ts
│
├── utils/                       # Shared utilities
│   ├── dateFormat.ts            # Date formatting
│   ├── validation.ts            # Form validation
│   ├── currency.ts              # Currency formatting
│   ├── api.ts                   # API helpers
│   └── index.ts
│
├── types/                       # Shared TypeScript types
│   ├── property.types.ts
│   ├── user.types.ts
│   ├── message.types.ts
│   └── index.ts
│
├── constants/                   # Shared constants
│   ├── apiEndpoints.ts
│   ├── errorMessages.ts
│   └── index.ts
│
├── services/                    # Shared services
│   ├── auth.service.ts
│   └── index.ts
│
├── package.json
└── tsconfig.json
```

---

## 📋 Root Level Files

Create these files in the root `/rentify` directory:

### README.md
```markdown
# Rentify - Sublet Matching Platform

Ecosystem for students, young professionals, and travelers to find and list sublets.

## Projects
- **mobile-app**: React Native mobile application
- **admin-dashboard**: React web admin dashboard
- **landing-page**: Product landing page
- **shared**: Shared code and utilities

## Quick Start
See individual project READMEs for detailed instructions.
```

### .gitignore
```
# Dependencies
node_modules/
*/node_modules/

# Environment
.env
.env.local
*/.env
*/.env.local

# Build outputs
dist/
build/
*/dist/
*/build/

# OS files
.DS_Store
*.log

# IDE
.vscode/
.idea/

# Mobile specific
mobile-app/ios/Pods/
mobile-app/android/.gradle/
```

### package.json (Root workspace)
```json
{
  "name": "rentify-monorepo",
  "version": "1.0.0",
  "private": true,
  "workspaces": [
    "mobile-app",
    "admin-dashboard",
    "landing-page",
    "shared"
  ],
  "scripts": {
    "mobile": "cd mobile-app && npm run ios",
    "admin": "cd admin-dashboard && npm start",
    "landing": "cd landing-page && npm start",
    "install-all": "npm install && cd mobile-app && npm install && cd ../admin-dashboard && npm install && cd ../landing-page && npm install && cd ../shared && npm install"
  }
}
```

---

## 🚀 Key Benefits of This Structure

1. **Modularity**: Each project is independent
2. **Shared Code**: Common utilities avoid duplication
3. **Scalability**: Easy to add new features/projects
4. **Maintainability**: Clear separation of concerns
5. **Type Safety**: Shared types ensure consistency

---

## 📦 Next Steps

1. **Set up each project**:
   ```bash
   cd mobile-app && npm install
   cd ../admin-dashboard && npx create-react-app . --template typescript
   cd ../landing-page && npx create-react-app . --template typescript
   cd ../shared && npm init -y
   ```

2. **Link shared code**:
   ```bash
   # In shared/package.json
   {
     "name": "@rentify/shared",
     "main": "index.ts"
   }

   # In other projects' package.json
   {
     "dependencies": {
       "@rentify/shared": "file:../shared"
     }
   }
   ```

3. **Configure TypeScript paths** for easy imports

---

This structure provides a solid foundation for building a scalable, maintainable Rentify platform! 🏠✨
