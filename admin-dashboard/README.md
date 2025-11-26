# Rentify Admin Dashboard (React Web)

Web-based admin dashboard for managing the Rentify platform.

## 🎯 Purpose

Centralized control panel for:
- User management and verification
- Property listing moderation
- Booking oversight
- Analytics and reporting
- Review moderation
- Platform settings

## ✨ Features

### User Management
- View all users (renters, owners, admins)
- Verify user identities
- Suspend/delete accounts
- View user activity and history
- Manage trust scores

### Property Management
- Approve/reject new listings
- Edit property details
- Remove fraudulent listings
- View property performance
- Feature properties

### Bookings
- View all bookings
- Resolve disputes
- Track revenue
- Manage refunds

### Analytics
- User growth metrics
- Revenue dashboards
- Popular locations
- Booking trends
- Property performance

### Review Moderation
- Approve/reject reviews
- Flag inappropriate content
- View sentiment analysis

## 📁 Project Structure

```
src/
├── assets/          # Images, icons, fonts
├── components/      # Reusable components
│   ├── layout/      # Sidebar, Header, Footer
│   ├── common/      # Button, Table, Modal
│   ├── charts/      # Data visualization
│   └── forms/       # Form components
├── config/          # Configuration
├── pages/           # Page components
│   ├── Dashboard/   # Main dashboard
│   ├── Users/       # User management
│   ├── Properties/  # Listing management
│   ├── Bookings/    # Booking oversight
│   ├── Reports/     # Analytics
│   └── Settings/    # Platform settings
├── services/        # API services
├── store/           # Redux state
├── styles/          # Global styles
├── types/           # TypeScript types
└── utils/           # Utilities
```

## 🚀 Quick Start

### Prerequisites
- Node.js >= 18
- npm or yarn

### Installation

1. **Install dependencies**
   ```bash
   npm install
   ```

2. **Environment variables**
   Create `.env` file:
   ```env
   REACT_APP_API_URL=http://localhost:3000
   REACT_APP_ADMIN_EMAIL=admin@rentify.com
   ```

3. **Run development server**
   ```bash
   npm start
   ```

   Opens at `http://localhost:3000`

## 🔐 Authentication

### Admin Login
1. Navigate to `/login`
2. Enter admin credentials
3. 2FA verification (optional)
4. Redirected to dashboard

### Role-Based Access
- **Super Admin**: Full access
- **Admin**: Limited moderation access
- **Support**: Read-only access

## 📊 Dashboard Pages

### Main Dashboard
- Key metrics (users, listings, bookings)
- Revenue charts
- Recent activity
- Alerts/notifications

### User Management
- User list with filters
- User detail view
- Verification management
- Activity logs

### Property Moderation
- Pending approvals
- Property grid/list view
- Bulk actions
- Edit functionality

### Bookings
- Booking calendar
- Transaction history
- Dispute resolution
- Refund processing

### Analytics
- Line charts (trends)
- Bar charts (comparisons)
- Pie charts (distribution)
- Exportable reports

## 🛠️ Development

### Available Scripts

```bash
npm start       # Start dev server
npm test        # Run tests
npm run build   # Production build
npm run lint    # Lint code
npm run format  # Format with Prettier
```

### Tech Stack

- **React 18** - UI library
- **TypeScript** - Type safety
- **React Router** - Routing
- **Redux Toolkit** - State management
- **Material-UI** - Component library
- **Chart.js** - Data visualization
- **Axios** - API calls
- **React Query** - Data fetching

## 🎨 UI Components

### Layout
- Responsive sidebar navigation
- Top header with user menu
- Breadcrumb navigation
- Footer with links

### Data Display
- Sortable/filterable tables
- Pagination
- Search functionality
- Bulk selection

### Forms
- Input validation
- Multi-step forms
- File upload
- Rich text editor

### Charts
- Line charts (trends)
- Bar charts (comparisons)
- Pie/Donut charts (distribution)
- Stats cards

## 📡 API Integration

### Endpoints

```typescript
// Users
GET    /api/admin/users
GET    /api/admin/users/:id
PUT    /api/admin/users/:id
DELETE /api/admin/users/:id

// Properties
GET    /api/admin/properties
PUT    /api/admin/properties/:id/approve
DELETE /api/admin/properties/:id

// Bookings
GET    /api/admin/bookings
GET    /api/admin/bookings/:id

// Analytics
GET    /api/admin/analytics/overview
GET    /api/admin/analytics/revenue
```

## 🔍 Key Features

### Search & Filters
- Multi-column search
- Date range filters
- Status filters
- Export to CSV/PDF

### Bulk Actions
- Select multiple items
- Bulk approve/reject
- Bulk delete
- Bulk email

### Real-time Updates
- WebSocket connections
- Live notifications
- Auto-refresh data

## 🧪 Testing

```bash
npm test                # Run tests
npm test -- --coverage  # With coverage
npm run test:e2e        # E2E tests (Cypress)
```

## 📦 Building for Production

```bash
npm run build
```

Optimized build in `build/` folder:
- Minified JS/CSS
- Image optimization
- Code splitting
- Lazy loading

### Deployment

#### Vercel
```bash
vercel --prod
```

#### Netlify
```bash
netlify deploy --prod
```

#### Traditional hosting
Upload `build/` folder to web server

## 🔒 Security

- Admin-only routes protected
- JWT token authentication
- HTTPS-only in production
- Input sanitization
- XSS protection
- CSRF tokens

## 🎨 Theming

Located in `src/config/theme.ts`:
- Primary color
- Secondary color
- Typography
- Spacing scale
- Breakpoints

## 📱 Responsive Design

Breakpoints:
- Mobile: < 768px
- Tablet: 768px - 1024px
- Desktop: > 1024px

## 🐛 Troubleshooting

**Build fails**
```bash
rm -rf node_modules package-lock.json
npm install
```

**Port already in use**
```bash
PORT=3001 npm start
```

## 📚 Resources

- [React Docs](https://react.dev/)
- [Redux Toolkit](https://redux-toolkit.js.org/)
- [Material-UI](https://mui.com/)
- [Chart.js](https://www.chartjs.org/)

## 📝 License

MIT
