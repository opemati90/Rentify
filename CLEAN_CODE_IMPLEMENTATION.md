# Rentify - Clean Code Implementation Guide

This document outlines the clean code architecture and implementation patterns for the Rentify platform.

## 🎯 Core Principles Applied

✅ **Modular** - Each file has a single responsibility
✅ **DRY** - No code duplication
✅ **Clear naming** - Self-documenting code
✅ **Testable** - Pure functions, dependency injection
✅ **KISS** - Simple, not complex
✅ **Scalable** - Easy to extend

---

## 📁 Architecture Overview

```
shared/              # Pure TypeScript utilities
├── types/           # Type definitions only
├── utils/           # Pure functions (no side effects)
└── constants/       # Immutable constants

mobile-app/
├── services/        # API calls, external integrations
├── components/      # Presentational components
├── screens/         # Container components
└── utils/           # App-specific utilities

admin-dashboard/     # Same structure as mobile
landing-page/        # Same structure as mobile
```

---

## 🧩 Code Patterns & Examples

### 1. Pure Utility Functions

```typescript
// ✅ GOOD: Pure, testable, single responsibility
export const formatDate = (date: string | Date): string => {
  const dateObj = typeof date === 'string' ? new Date(date) : date;
  return dateObj.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  });
};

// ❌ BAD: Side effects, multiple responsibilities
export const formatAndLogDate = (date: string) => {
  console.log('Formatting date...'); // Side effect!
  const formatted = new Date(date).toLocaleDateString();
  localStorage.setItem('lastDate', formatted); // Side effect!
  return formatted;
};
```

### 2. API Service Layer

```typescript
// ✅ GOOD: Clean separation, typed, error handling
export const getProperties = async (filters?: PropertyFilters): Promise<Property[]> => {
  const params = buildQueryParams(filters);
  const url = `${API_ENDPOINTS.PROPERTIES.LIST}?${params}`;
  return get<Property[]>(url);
};

// ❌ BAD: Mixed concerns, no types, hardcoded
export const getProperties = async (filters) => {
  const response = await fetch('http://localhost:3000/properties?type=' + filters.type);
  const data = await response.json();
  localStorage.setItem('properties', JSON.stringify(data));
  return data;
};
```

### 3. Component Structure

```typescript
// ✅ GOOD: Single responsibility, props typed, no logic
interface ButtonProps {
  onPress: () => void;
  title: string;
  variant?: 'primary' | 'secondary';
  disabled?: boolean;
}

export const Button: React.FC<ButtonProps> = ({
  onPress,
  title,
  variant = 'primary',
  disabled = false
}) => {
  const buttonStyle = getButtonStyle(variant, disabled);

  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={disabled}
      style={buttonStyle}
      activeOpacity={0.7}
    >
      <Text>{title}</Text>
    </TouchableOpacity>
  );
};

// ❌ BAD: Too many responsibilities, inline styles, no types
export const Button = (props) => {
  return (
    <TouchableOpacity
      onPress={() => {
        props.onClick();
        if (props.track) {
          analytics.track('button_clicked');
        }
        if (props.save) {
          localStorage.setItem('clicked', 'true');
        }
      }}
      style={{
        backgroundColor: props.variant === 'primary' ? '#EF4444' : '#FFF',
        padding: 16,
        borderRadius: 999
      }}
    >
      <Text>{props.title}</Text>
    </TouchableOpacity>
  );
};
```

---

## 📂 File Organization

### Shared Utilities (Created ✅)

```typescript
// shared/utils/dateFormat.ts
export const formatDate = (date: string | Date): string => { }
export const formatDateRange = (start: string, end: string): string => { }
export const getDaysBetween = (start: string, end: string): number => { }

// shared/utils/validation.ts
export const isValidEmail = (email: string): boolean => { }
export const isValidPhone = (phone: string): boolean => { }
export const isValidPrice = (price: number): boolean => { }

// shared/utils/currency.ts
export const formatCurrency = (amount: number): string => { }
export const calculateTotal = (price: number, months: number): number => { }
```

### Mobile Services (Created ✅)

```typescript
// mobile-app/src/services/api/client.ts
export const apiClient = createApiClient();
export const get = <T>(url: string) => Promise<T>;
export const post = <T>(url: string, data?: any) => Promise<T>;

// mobile-app/src/services/api/property.service.ts
export const getProperties = async (filters?) => Promise<Property[]>;
export const getPropertyById = async (id: string) => Promise<Property>;
export const createProperty = async (data) => Promise<Property>;
```

---

## 🎨 Component Patterns

### Presentational Component

```typescript
// Simple, pure, no business logic
interface PropertyCardProps {
  property: Property;
  onPress: () => void;
  isLiked?: boolean;
}

export const PropertyCard: React.FC<PropertyCardProps> = ({
  property,
  onPress,
  isLiked = false
}) => (
  <TouchableOpacity onPress={onPress} style={styles.card}>
    <Image source={{ uri: property.image }} style={styles.image} />
    <View style={styles.info}>
      <Text style={styles.title}>{property.title}</Text>
      <Text style={styles.price}>${property.price}/m</Text>
    </View>
    {isLiked && <Icon name="heart" color="red" />}
  </TouchableOpacity>
);
```

### Container Component

```typescript
// Manages state, calls services, passes props down
export const HomeScreen = () => {
  const [properties, setProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState(false);

  const loadProperties = async () => {
    setLoading(true);
    try {
      const data = await getProperties();
      setProperties(data);
    } catch (error) {
      handleError(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadProperties();
  }, []);

  if (loading) return <LoadingSpinner />;

  return (
    <FlatList
      data={properties}
      renderItem={({ item }) => (
        <PropertyCard
          property={item}
          onPress={() => navigateToDetail(item.id)}
        />
      )}
    />
  );
};
```

---

## 🧪 Testing Patterns

### Unit Test Example

```typescript
// Pure functions are easy to test
describe('dateFormat utils', () => {
  it('should format date correctly', () => {
    const result = formatDate('2025-01-26');
    expect(result).toBe('Jan 26, 2025');
  });

  it('should calculate days between dates', () => {
    const days = getDaysBetween('2025-01-01', '2025-01-31');
    expect(days).toBe(30);
  });
});

// Services with dependency injection
describe('PropertyService', () => {
  it('should fetch properties', async () => {
    const mockGet = jest.fn().mockResolvedValue([mockProperty]);
    const properties = await getProperties();
    expect(properties).toHaveLength(1);
  });
});
```

---

## 🔄 State Management

### Redux Slice (Clean Pattern)

```typescript
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface PropertyState {
  items: Property[];
  loading: boolean;
  error: string | null;
}

const initialState: PropertyState = {
  items: [],
  loading: false,
  error: null
};

const propertySlice = createSlice({
  name: 'properties',
  initialState,
  reducers: {
    setProperties: (state, action: PayloadAction<Property[]>) => {
      state.items = action.payload;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setError: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
    }
  }
});

export const { setProperties, setLoading, setError } = propertySlice.actions;
export default propertySlice.reducer;
```

---

## 📝 Documentation Standards

### Function Documentation

```typescript
/**
 * Calculates the total cost for a property rental
 * @param monthlyRent - Monthly rental price
 * @param months - Number of months to rent
 * @returns Total cost for the rental period
 */
export const calculateTotal = (monthlyRent: number, months: number): number => {
  return monthlyRent * months;
};
```

### Component Documentation

```typescript
/**
 * PropertyCard - Displays property information in a card layout
 *
 * @param property - Property object with all details
 * @param onPress - Callback when card is tapped
 * @param isLiked - Whether property is in favorites
 */
```

---

## ⚡ Performance Patterns

### Memoization

```typescript
// ✅ Memoize expensive computations
const PropertyList: React.FC<Props> = ({ properties, filters }) => {
  const filteredProperties = useMemo(
    () => filterProperties(properties, filters),
    [properties, filters]
  );

  return <FlatList data={filteredProperties} />;
};

// ✅ Memoize callbacks
const handlePress = useCallback((id: string) => {
  navigate('PropertyDetail', { id });
}, [navigate]);
```

### Lazy Loading

```typescript
// ✅ Load components on demand
const PropertyDetail = lazy(() => import('./PropertyDetailScreen'));
const CreateListing = lazy(() => import('./CreateListingScreen'));
```

---

## 🔒 Type Safety

### Strict Types

```typescript
// ✅ Use strict types everywhere
interface CreatePropertyRequest {
  title: string;
  description: string;
  price: number;
  type: PropertyType; // Not 'string'
  amenities: readonly string[]; // Immutable array
}

// ❌ Avoid 'any'
const handleSubmit = (data: any) => { } // Bad!

// ✅ Use proper types
const handleSubmit = (data: CreatePropertyRequest) => { } // Good!
```

---

## 📊 Error Handling

### Consistent Error Handling

```typescript
// ✅ Centralized error handling
const handleApiError = (error: unknown): string => {
  if (axios.isAxiosError(error)) {
    return error.response?.data?.message || 'Network error';
  }
  return 'An unexpected error occurred';
};

// Usage in component
try {
  await createProperty(data);
} catch (error) {
  const message = handleApiError(error);
  showToast(message);
}
```

---

## 🎯 Next Steps for Implementation

### Priority 1: Mobile App Core
1. Create Input, Card, Badge components
2. Build WelcomeScreen, AuthScreen
3. Implement HomeScreen with property list
4. Add PropertyDetailScreen

### Priority 2: Admin Dashboard
1. Create layout components (Sidebar, Header)
2. Build Dashboard page
3. Implement UserManagement
4. Add PropertyModeration

### Priority 3: Landing Page
1. Create HeroSection
2. Build FeaturesSection
3. Add TestimonialSection
4. Implement CtaSection

---

## ✅ Code Quality Checklist

Before committing code, verify:

- [ ] No code duplication (DRY)
- [ ] Functions are short (<20 lines)
- [ ] Clear, descriptive names
- [ ] Proper TypeScript types
- [ ] No deep nesting (max 3 levels)
- [ ] Comments only for complex logic
- [ ] Consistent formatting
- [ ] Testable (pure functions, dependency injection)
- [ ] No side effects in pure functions
- [ ] Proper error handling
- [ ] Performance optimized (memoization where needed)

---

## 🚀 Build Scripts

```json
// package.json scripts for all projects
{
  "scripts": {
    "start": "...",
    "build": "...",
    "test": "jest",
    "lint": "eslint src --ext .ts,.tsx",
    "format": "prettier --write src/**/*.{ts,tsx}",
    "type-check": "tsc --noEmit"
  }
}
```

---

This clean code architecture ensures:
- ✅ Maintainability
- ✅ Testability
- ✅ Scalability
- ✅ Performance
- ✅ Developer experience

All code follows industry best practices and is production-ready!
