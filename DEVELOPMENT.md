# Rentify Development Guide

## 🚀 Quick Start

This monorepo contains three main applications:
- **mobile-app**: React Native mobile application (iOS/Android)
- **admin-dashboard**: React web admin panel
- **shared**: Shared utilities, types, and constants

## 📋 Prerequisites

- Node.js >= 18.x
- npm >= 9.x or yarn >= 1.22
- Expo CLI (for mobile development)
- Git

## 🛠️ Setup Instructions

### 1. Clone the Repository

```bash
git clone <repository-url>
cd Rentify
```

### 2. Install Dependencies

#### Mobile App Setup

```bash
cd mobile-app
npm install

# Copy environment file and configure
cp .env.example .env
# Edit .env with your API keys
```

#### Admin Dashboard Setup

```bash
cd admin-dashboard
npm install

# Copy environment file and configure
cp .env.example .env
# Edit .env with your configuration
```

#### Shared Package Setup

```bash
cd shared
npm install
```

### 3. Environment Configuration

#### Mobile App (.env)
```env
API_BASE_URL=http://localhost:3000/api
GOOGLE_AI_API_KEY=your_google_ai_api_key_here
```

#### Admin Dashboard (.env)
```env
VITE_API_BASE_URL=http://localhost:3000/api
```

## 🏃 Running the Applications

### Mobile App

```bash
cd mobile-app

# Start Expo development server
npm start

# Run on Android
npm run android

# Run on iOS
npm run ios

# Run on Web
npm run web
```

### Admin Dashboard

```bash
cd admin-dashboard

# Start development server (runs on http://localhost:3001)
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## 🧪 Running Tests

### Mobile App Tests

```bash
cd mobile-app

# Run tests once
npm test

# Run tests in watch mode
npm run test:watch

# Generate coverage report
npm run test:coverage
```

### Admin Dashboard Tests

```bash
cd admin-dashboard

# Run tests
npm test

# Run tests in watch mode
npm run test:watch

# Generate coverage report
npm run test:coverage
```

### Shared Package Tests

```bash
cd shared

# Run tests
npm test

# Run tests in watch mode
npm run test:watch

# Generate coverage report
npm run test:coverage
```

## 📁 Project Structure

```
Rentify/
├── mobile-app/              # React Native mobile application
│   ├── src/
│   │   ├── components/      # Reusable UI components
│   │   ├── screens/         # Application screens
│   │   ├── services/        # API and service layer
│   │   ├── types/           # TypeScript type definitions
│   │   ├── utils/           # Utility functions
│   │   └── data/            # Mock data for development
│   ├── App.tsx              # Application entry point
│   └── package.json
│
├── admin-dashboard/         # React web admin dashboard
│   ├── src/
│   │   ├── components/      # UI components
│   │   │   ├── common/      # Shared components
│   │   │   └── layout/      # Layout components
│   │   ├── pages/           # Application pages
│   │   ├── types/           # TypeScript types
│   │   ├── App.tsx          # Root component
│   │   └── main.tsx         # Application entry
│   ├── index.html
│   └── package.json
│
├── shared/                  # Shared code across apps
│   ├── types/               # Shared TypeScript types
│   ├── utils/               # Shared utility functions
│   ├── constants/           # Shared constants
│   └── package.json
│
└── react-native-app/        # Reference implementation
```

## 🎨 Design System

### Colors
- **Primary**: #EF4444 (Rentify Red)
- **Secondary**: #FFFFFF (White)
- **Success**: #10B981 (Green)
- **Warning**: #F59E0B (Orange)
- **Danger**: #EF4444 (Red)
- **Info**: #3B82F6 (Blue)

### Typography
- **Font Family**: System fonts (-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto)
- **Headings**: Bold, 24-60px
- **Body**: Regular, 14-18px
- **Labels**: Medium, 12-14px

### Spacing
- Base unit: 8px
- Scale: 8, 16, 24, 32, 48, 64px

## 🔧 Development Tools

### TypeScript
All projects use TypeScript for type safety. Run type checking:

```bash
# Mobile app
cd mobile-app && npx tsc --noEmit

# Admin dashboard
cd admin-dashboard && npm run type-check
```

### Linting
Code quality is maintained through ESLint:

```bash
# Admin dashboard
cd admin-dashboard && npm run lint
```

## 📦 Building for Production

### Mobile App

```bash
cd mobile-app

# Build for Android
eas build --platform android

# Build for iOS
eas build --platform ios
```

### Admin Dashboard

```bash
cd admin-dashboard

# Create optimized production build
npm run build

# Preview the production build
npm run preview
```

## 🧩 Key Features Implemented

### Mobile App
- ✅ Property browsing and search
- ✅ Property details view
- ✅ Property creation wizard
- ✅ User authentication structure
- ✅ Like/favorite functionality
- ✅ Mock data for development
- ✅ API client with interceptors
- ✅ AsyncStorage integration

### Admin Dashboard
- ✅ User management interface
- ✅ Property moderation
- ✅ Analytics dashboard
- ✅ Reports management
- ✅ Responsive layout
- ✅ Navigation system

### Shared Package
- ✅ Type definitions (Property, User, Host, etc.)
- ✅ Validation utilities
- ✅ Date formatting
- ✅ Currency formatting
- ✅ 100% test coverage

## 🧪 Testing Strategy

### Unit Tests
- All utility functions in `shared/` package
- Individual components in mobile and web apps
- Services and API clients

### Component Tests
- UI components with React Testing Library
- User interactions and event handling
- Prop variations and edge cases

### Coverage Goals
- Utilities: 80%+ coverage
- Components: 70%+ coverage
- Overall: 75%+ coverage

## 🐛 Common Issues & Solutions

### Mobile App

**Issue**: Metro bundler not starting
```bash
# Clear cache and restart
npx expo start -c
```

**Issue**: Module not found errors
```bash
# Clear node_modules and reinstall
rm -rf node_modules package-lock.json
npm install
```

### Admin Dashboard

**Issue**: Vite build errors
```bash
# Clear cache and rebuild
rm -rf node_modules .vite dist
npm install
npm run build
```

## 📝 Code Style Guidelines

1. **Use TypeScript** for all new files
2. **No `any` types** - use proper type definitions
3. **Functional components** with hooks
4. **Named exports** for components
5. **CSS Modules** for styling in admin dashboard
6. **StyleSheet.create** for React Native styles
7. **Descriptive variable names** - no abbreviations
8. **Comments** only for complex logic

## 🔐 Security Best Practices

1. Never commit `.env` files
2. Use environment variables for API keys
3. Validate all user inputs
4. Sanitize data before rendering
5. Use HTTPS in production
6. Implement rate limiting
7. Regular dependency updates

## 🚢 Deployment

### Mobile App
- Use Expo Application Services (EAS)
- Configure app.json for store metadata
- Generate required signing credentials

### Admin Dashboard
- Build with `npm run build`
- Deploy `dist/` folder to hosting service
- Configure environment variables on hosting platform
- Set up HTTPS and custom domain

## 📚 Additional Resources

- [React Native Documentation](https://reactnative.dev/)
- [Expo Documentation](https://docs.expo.dev/)
- [Vite Documentation](https://vitejs.dev/)
- [React Router Documentation](https://reactrouter.com/)
- [TypeScript Documentation](https://www.typescriptlang.org/)

## 🤝 Contributing

1. Create a feature branch from `main`
2. Make your changes
3. Write/update tests
4. Ensure all tests pass
5. Submit a pull request

## 📄 License

This project is proprietary and confidential.

---

**Happy Coding! 🎉**

For questions or support, please open an issue in the repository.
