# 🏠 Rentify - Sublet Matching Platform

**Complete ecosystem for students, young professionals, and travelers to find and list verified sublets.**

---

## 📦 What's Included

This repository contains the complete Rentify platform with 4 interconnected projects:

| Project | Technology | Purpose | Status |
|---------|------------|---------|--------|
| **Mobile App** | React Native | iOS/Android user app | ✅ Structure ready |
| **Admin Dashboard** | React Web | Management portal | ✅ Structure ready |
| **Landing Page** | React Web | Marketing website | ✅ Structure ready |
| **Shared** | TypeScript | Common utilities | ✅ Structure ready |

Additionally, there's a **legacy web app** (`index.tsx`) built with Vite that can be used as reference.

---

## 🚀 Quick Start

### Prerequisites
- Node.js >= 18
- For mobile: Xcode (iOS) or Android Studio (Android)

### Get Started in 3 Steps

1. **Read the setup guide**
   ```bash
   open COMPLETE_SETUP_GUIDE.md
   ```

2. **Choose your project**
   - Mobile App: `cd mobile-app` → See `mobile-app/README.md`
   - Admin Dashboard: `cd admin-dashboard` → See `admin-dashboard/README.md`
   - Landing Page: `cd landing-page` → See `landing-page/README.md`

3. **Follow project-specific instructions**

---

## 📁 Repository Structure

```
rentify/
├── 📱 mobile-app/                    # React Native mobile application
│   ├── src/                          # Source code
│   │   ├── screens/                  # Screen components
│   │   ├── components/               # Reusable components
│   │   ├── navigation/               # Navigation setup
│   │   ├── services/                 # API services
│   │   └── ...
│   ├── android/                      # Android native code
│   ├── ios/                          # iOS native code
│   ├── package.json
│   └── README.md                     # Mobile app docs
│
├── 🖥️ admin-dashboard/               # React web admin portal
│   ├── public/                       # Static assets
│   ├── src/                          # Source code
│   │   ├── pages/                    # Page components
│   │   ├── components/               # UI components
│   │   ├── services/                 # API services
│   │   └── ...
│   ├── package.json
│   └── README.md                     # Admin dashboard docs
│
├── 🌐 landing-page/                  # React marketing website
│   ├── public/                       # Static assets
│   ├── src/                          # Source code
│   │   ├── components/               # Page sections
│   │   ├── pages/                    # Pages
│   │   ├── styles/                   # CSS/styling
│   │   └── ...
│   ├── package.json
│   └── README.md                     # Landing page docs
│
├── 🔗 shared/                        # Shared utilities & types
│   ├── components/                   # Shared components
│   ├── utils/                        # Utility functions
│   ├── types/                        # TypeScript types
│   ├── package.json
│   └── tsconfig.json
│
├── 🗂️ react-native-app/             # Reference implementation
│   ├── Full working example          # (Can copy to mobile-app/)
│   ├── src/                          # Complete source code
│   ├── IMPLEMENTATION_GUIDE.md       # Detailed guide
│   ├── QUICK_START.md               # Quick setup
│   └── PROJECT_SUMMARY.md           # Overview
│
├── 📄 FOLDER_STRUCTURE.md            # Complete structure docs
├── 📄 COMPLETE_SETUP_GUIDE.md        # Setup instructions
├── 📄 README.md                      # This file
├── 📄 .gitignore                     # Git ignore rules
│
└── 🎨 Legacy/Reference Files
    ├── index.tsx                     # Web app (Vite + React)
    ├── index.html
    ├── package.json
    └── vite.config.ts
```

---

## ✨ Features Overview

### Mobile App Features
- ✅ User authentication (email, social, phone verification)
- ✅ Property search with advanced filters
- ✅ Interactive map view
- ✅ Property listings (featured, new, saved)
- ✅ Detailed property information
- ✅ Multi-step listing creation
- ✅ AI-powered description generation (Gemini)
- ✅ In-app messaging
- ✅ User profiles with trust scores
- ✅ Review and rating system
- ✅ Booking management

### Admin Dashboard Features
- ✅ User management (verify, suspend, delete)
- ✅ Property moderation (approve, reject)
- ✅ Booking oversight
- ✅ Analytics and reporting
- ✅ Review moderation
- ✅ Platform settings

### Landing Page Features
- ✅ Hero section with CTA
- ✅ Features showcase
- ✅ How it works
- ✅ Testimonials
- ✅ Download links
- ✅ SEO optimized

### Sublet-Specific Features
- ✅ Available date ranges
- ✅ Flexible lease durations
- ✅ Roommate information
- ✅ Utilities included/not
- ✅ Furnished status
- ✅ Deposit requirements
- ✅ Property type filtering (Apartment, House, Villa, Studio, Room, Duplex)

---

## 🎯 Target Users

1. **Students** - Affordable sublets near campus
2. **Young Professionals** - Flexible lease terms
3. **Travelers** - Short-term stays
4. **Interns** - Temporary housing
5. **Property Owners** - List spare rooms/apartments

---

## 📚 Documentation

### Getting Started
1. **COMPLETE_SETUP_GUIDE.md** - Full setup instructions
2. **FOLDER_STRUCTURE.md** - Detailed structure explanation
3. **Individual READMEs** - Project-specific guides

### Reference Implementation
- `react-native-app/IMPLEMENTATION_GUIDE.md` - Day-by-day build plan
- `react-native-app/QUICK_START.md` - Quick setup
- `react-native-app/PROJECT_SUMMARY.md` - Project overview

---

## 🛠️ Tech Stack

### Mobile App
- React Native 0.73
- TypeScript
- React Navigation
- Redux Toolkit
- Google Gemini AI
- React Native Maps

### Web Apps (Admin + Landing)
- React 18
- TypeScript
- React Router
- Redux Toolkit (Admin)
- Material-UI (Admin)
- Tailwind CSS (Landing)
- Chart.js (Admin)
- Framer Motion (Landing)

### Shared
- TypeScript
- Common utilities
- Shared types

---

## 📱 Project Status

| Component | Structure | Dependencies | Docs | Implementation |
|-----------|----------|--------------|------|----------------|
| Mobile App | ✅ | ✅ Ready | ✅ Complete | 📝 In Progress |
| Admin Dashboard | ✅ | ⏳ Pending | ✅ Complete | ⏳ Pending |
| Landing Page | ✅ | ⏳ Pending | ✅ Complete | ⏳ Pending |
| Shared | ✅ | ⏳ Pending | ✅ Complete | ⏳ Pending |
| Reference App | ✅ | ✅ Complete | ✅ Complete | ✅ Complete |

---

## 🎨 Design Inspiration

The project follows modern design trends inspired by:
- Airbnb's property listing UI
- Zillow's search and filters
- Modern fintech apps for trust indicators
- Material Design principles

**Key Design Elements:**
- Clean, minimal interface
- High contrast for readability
- Trust badges and verification
- Smooth animations
- Responsive design

---

## 📖 How to Use This Repository

### Option 1: Start from Scratch
1. Read `COMPLETE_SETUP_GUIDE.md`
2. Set up each project individually
3. Implement features following guides

### Option 2: Use Reference Implementation
1. Copy files from `react-native-app/` to `mobile-app/`
2. Customize as needed
3. Build admin and landing page

### Option 3: Hybrid Approach
1. Start with reference mobile app
2. Build admin dashboard from scratch
3. Build landing page from scratch
4. Share common code via `shared/`

---

## 🔑 API Keys Needed

1. **Gemini AI** (for description generation)
   - Get from: https://makersuite.google.com/app/apikey

2. **Google Maps** (for map features)
   - Get from: https://console.cloud.google.com/

3. **Social Auth** (optional)
   - Google OAuth
   - Facebook App ID
   - LinkedIn Client ID

---

## 🚀 Deployment

### Mobile App
- **iOS**: App Store Connect
- **Android**: Google Play Console

### Web Apps
- **Vercel** (recommended)
- **Netlify**
- **Traditional hosting**

See individual project READMEs for detailed deployment instructions.

---

## 📊 Project Timeline

### Week 1-2: Mobile App Core
- Onboarding flow
- Home and search screens
- Property details

### Week 3: Mobile App Advanced
- Create listing
- Messaging
- Profile

### Week 4: Admin Dashboard
- Layout and routing
- User management
- Property moderation

### Week 5: Landing Page
- All sections
- Responsive design
- SEO optimization

### Week 6: Integration & Testing
- Backend API integration
- End-to-end testing
- Bug fixes

### Week 7-8: Polish & Launch
- Performance optimization
- App store submission
- Marketing launch

---

## 🤝 Contributing

This is a portfolio/learning project. Feel free to:
- Use this structure for your own projects
- Customize and extend features
- Share improvements

---

## 📝 License

MIT License - Free to use and modify

---

## 📞 Support & Questions

**For setup issues:**
1. Check `COMPLETE_SETUP_GUIDE.md`
2. Review project-specific READMEs
3. Check troubleshooting sections

**For implementation questions:**
1. See `react-native-app/IMPLEMENTATION_GUIDE.md`
2. Review reference implementation
3. Check individual component files

---

## 🎉 Ready to Build!

You now have:
- ✅ Complete project structure
- ✅ Detailed documentation
- ✅ Reference implementation
- ✅ Step-by-step guides
- ✅ Example components
- ✅ Clear roadmap

**Next Steps:**
1. Read `COMPLETE_SETUP_GUIDE.md`
2. Choose a project to start with
3. Follow the setup instructions
4. Start coding!

---

## 📈 Future Enhancements

Potential features to add:
- [ ] Payment integration (Stripe)
- [ ] Push notifications
- [ ] Video property tours
- [ ] Calendar sync
- [ ] Background checks
- [ ] E-signature for leases
- [ ] Multi-language support
- [ ] Dark mode
- [ ] Progressive Web App (PWA)

---

**Built with ❤️ for the Rentify community**

*Last updated: 2025-01-26*
