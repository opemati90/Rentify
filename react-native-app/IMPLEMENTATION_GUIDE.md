# Rentify - Complete Implementation Guide

This guide walks you through implementing the complete React Native app based on your PRD.

## Phase 1: Project Setup (Day 1)

### Install Dependencies
```bash
npm install react-native-vector-icons react-native-maps @react-navigation/native @react-navigation/stack @react-navigation/bottom-tabs react-native-safe-area-context react-native-screens react-native-gesture-handler react-native-reanimated @react-native-async-storage/async-storage axios @google/generative-ai
```

### Configure React Native Vector Icons
1. Link the fonts in `ios/Rentify/Info.plist`
2. Add to `android/app/build.gradle`

### Setup Navigation
See `src/navigation/AppNavigator.tsx` for the complete navigation structure.

---

## Phase 2: Core Components (Days 2-3)

### 1. Button Component (`src/components/Button.tsx`)
✅ Already created

Key features:
- Multiple variants (primary, secondary, outline, ghost)
- Loading states
- Icon support
- Accessibility

### 2. Input Component (`src/components/Input.tsx`)

```typescript
import React from 'react';
import { View, TextInput, Text, StyleSheet } from 'react-native';
import { COLORS, SPACING } from '../constants/theme';

interface InputProps {
  label: string;
  value: string;
  onChangeText: (text: string) => void;
  placeholder?: string;
  secureTextEntry?: boolean;
  keyboardType?: 'default' | 'email-address' | 'numeric' | 'phone-pad';
  icon?: React.ReactNode;
  error?: string;
  multiline?: boolean;
}

const Input: React.FC<InputProps> = ({
  label,
  value,
  onChangeText,
  placeholder,
  secureTextEntry = false,
  keyboardType = 'default',
  icon,
  error,
  multiline = false,
}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.label}>{label}</Text>
      <View style={[styles.inputContainer, error && styles.error]}>
        {icon && <View style={styles.icon}>{icon}</View>}
        <TextInput
          style={[styles.input, multiline && styles.multiline]}
          value={value}
          onChangeText={onChangeText}
          placeholder={placeholder}
          secureTextEntry={secureTextEntry}
          keyboardType={keyboardType}
          multiline={multiline}
          placeholderTextColor={COLORS.textSecondary}
        />
      </View>
      {error && <Text style={styles.errorText}>{error}</Text>}
    </View>
  );
};

// Styles...
export default Input;
```

### 3. PropertyCard Component (`src/components/PropertyCard.tsx`)

This component displays property listings in a card format matching your design inspiration:

```typescript
import React from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import { Property } from '../types';
import { COLORS, SPACING, BORDER_RADIUS, SHADOWS } from '../constants/theme';
import Icon from 'react-native-vector-icons/Ionicons';

interface PropertyCardProps {
  property: Property;
  onPress: () => void;
  onLike?: () => void;
  isLiked?: boolean;
}

const PropertyCard: React.FC<PropertyCardProps> = ({
  property,
  onPress,
  onLike,
  isLiked = false,
}) => {
  return (
    <TouchableOpacity
      style={styles.card}
      onPress={onPress}
      activeOpacity={0.9}
    >
      <Image source={{ uri: property.image }} style={styles.image} />

      {/* Like Button */}
      {onLike && (
        <TouchableOpacity
          style={styles.likeButton}
          onPress={onLike}
        >
          <Icon
            name={isLiked ? 'heart' : 'heart-outline'}
            size={20}
            color={isLiked ? COLORS.brand[500] : COLORS.textPrimary}
          />
        </TouchableOpacity>
      )}

      {/* Featured Badge */}
      {property.featured && (
        <View style={styles.featuredBadge}>
          <Text style={styles.featuredText}>From best month</Text>
        </View>
      )}

      {/* Rating Badge */}
      <View style={styles.ratingBadge}>
        <Icon name="star" size={12} color="#FFB800" />
        <Text style={styles.ratingText}>{property.rating}</Text>
      </View>

      {/* Property Info */}
      <View style={styles.info}>
        <Text style={styles.title} numberOfLines={1}>
          {property.title}
        </Text>
        <Text style={styles.location} numberOfLines={1}>
          <Icon name="location-outline" size={12} />
          {property.location}
        </Text>
        <View style={styles.footer}>
          <Text style={styles.price}>
            ${property.price}
            <Text style={styles.priceUnit}> /m</Text>
          </Text>
          <Text style={styles.type}>{property.type}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

// Styles matching your design inspiration...
export default PropertyCard;
```

---

## Phase 3: Onboarding Screens (Days 4-5)

### WelcomeScreen.tsx
- Hero image with gradient overlay
- Brand logo and tagline
- "Get Started" and "Login" CTAs

### AuthScreen.tsx
- Email/password inputs
- Social login buttons (Google, Facebook, LinkedIn)
- Switch between signup/login
- Form validation

### VerificationScreen.tsx
- Phone input
- 4-digit code input
- Resend code functionality
- Auto-focus on code inputs

### TutorialScreen.tsx
- Swipeable slides with Animated API
- Progress dots
- Skip button
- "Get Started" on last slide

---

## Phase 4: Main App Screens (Days 6-8)

### HomeScreen.tsx

Key features:
1. **Header**: Location selector + user avatar
2. **Search Bar**: "Find your best stay" with filter icon
3. **Property Types**: Horizontal scroll with icons
4. **Featured Section**: Horizontal scrollable property cards
5. **New Listings**: Vertical list

```typescript
const HomeScreen = () => {
  const [selectedType, setSelectedType] = useState('All');
  const [properties, setProperties] = useState(MOCK_PROPERTIES);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        {/* Header */}
        <View style={styles.header}>
          <View>
            <Text style={styles.locationLabel}>Location</Text>
            <TouchableOpacity style={styles.locationButton}>
              <Icon name="location" size={18} color={COLORS.brand[500]} />
              <Text style={styles.location}>Helsinki, Finland</Text>
              <Icon name="chevron-down" size={16} />
            </TouchableOpacity>
          </View>
          <TouchableOpacity style={styles.avatar}>
            <Image source={{ uri: MOCK_CURRENT_USER.avatar }} />
          </TouchableOpacity>
        </View>

        {/* Search */}
        <TouchableOpacity style={styles.searchBar}>
          <Icon name="search" size={20} />
          <Text>Find your best stay</Text>
          <TouchableOpacity style={styles.filterButton}>
            <Icon name="options" size={18} color="white" />
          </TouchableOpacity>
        </TouchableOpacity>

        {/* Property Types */}
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {PROPERTY_TYPES.map((type) => (
            <TouchableOpacity
              key={type.id}
              style={[
                styles.typeChip,
                selectedType === type.label && styles.typeChipActive,
              ]}
              onPress={() => setSelectedType(type.label)}
            >
              <Text style={styles.typeIcon}>{type.icon}</Text>
              <Text style={styles.typeLabel}>{type.label}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        {/* Featured */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Featured</Text>
            <TouchableOpacity>
              <Text style={styles.seeAll}>See all</Text>
            </TouchableOpacity>
          </View>
          <FlatList
            horizontal
            data={properties.filter(p => p.featured)}
            renderItem={({ item }) => <PropertyCard property={item} />}
            keyExtractor={(item) => item.id}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};
```

### SearchScreen.tsx
- Search input with location
- Filter chips (price, beds, instant book)
- Map view toggle
- Results list with PropertyCard components

### PropertyDetailScreen.tsx

Matching your design inspiration:

```typescript
const PropertyDetailScreen = ({ route }) => {
  const { property } = route.params;

  return (
    <ScrollView style={styles.container}>
      {/* Image Carousel */}
      <ScrollView horizontal pagingEnabled>
        {property.images.map((img, idx) => (
          <Image key={idx} source={{ uri: img }} style={styles.heroImage} />
        ))}
      </ScrollView>

      {/* Back & Share Buttons */}
      <View style={styles.headerButtons}>
        <TouchableOpacity style={styles.backButton}>
          <Icon name="arrow-back" size={24} />
        </TouchableOpacity>
        <View style={styles.rightButtons}>
          <TouchableOpacity style={styles.iconButton}>
            <Icon name="heart-outline" size={24} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.iconButton}>
            <Icon name="share-outline" size={24} />
          </TouchableOpacity>
        </View>
      </View>

      {/* Property Info */}
      <View style={styles.content}>
        <Text style={styles.title}>{property.title}</Text>
        <Text style={styles.location}>
          <Icon name="location" /> {property.location}
        </Text>

        {/* Stats */}
        <View style={styles.stats}>
          <StatBox icon="resize" value={`${property.sqft} sq ft`} label="Size" />
          <StatBox icon="bed" value={property.beds} label="Bedrooms" />
          <StatBox icon="water" value={property.baths} label="Bathrooms" />
          <StatBox icon="star" value={property.rating} label="Rating" />
        </View>

        {/* Owner */}
        <View style={styles.owner}>
          <Image source={{ uri: property.host.avatar }} style={styles.ownerAvatar} />
          <View style={styles.ownerInfo}>
            <Text style={styles.ownerName}>{property.host.name}</Text>
            <Text style={styles.ownerLabel}>Owner</Text>
          </View>
          <TouchableOpacity style={styles.messageButton}>
            <Icon name="chatbubble-outline" size={20} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.callButton}>
            <Icon name="call-outline" size={20} />
          </TouchableOpacity>
        </View>

        {/* Amenities */}
        <Text style={styles.sectionTitle}>Amenities</Text>
        <View style={styles.amenities}>
          {property.amenities.map((amenity) => (
            <View key={amenity} style={styles.amenityChip}>
              <Icon name="checkmark-circle" size={16} color={COLORS.success} />
              <Text>{amenity}</Text>
            </View>
          ))}
        </View>

        {/* Description */}
        <Text style={styles.sectionTitle}>Description</Text>
        <Text style={styles.description}>{property.description}</Text>
      </View>

      {/* Bottom CTA */}
      <View style={styles.bottomBar}>
        <View>
          <Text style={styles.priceLabel}>Price</Text>
          <Text style={styles.price}>${property.price}/m</Text>
        </View>
        <Button title="Book Now" onPress={() => {}} />
      </View>
    </ScrollView>
  );
};
```

---

## Phase 5: Advanced Features (Days 9-12)

### Messaging System

Create `MessagesScreen.tsx` and `ChatScreen.tsx`:

```typescript
// MessagesScreen.tsx - List of conversations
const MessagesScreen = () => {
  const [conversations, setConversations] = useState([]);

  return (
    <FlatList
      data={conversations}
      renderItem={({ item }) => (
        <ConversationItem conversation={item} />
      )}
    />
  );
};

// ChatScreen.tsx - Individual chat
const ChatScreen = ({ route }) => {
  const { conversationId } = route.params;
  const [messages, setMessages] = useState([]);
  const [inputText, setInputText] = useState('');

  return (
    <View style={styles.container}>
      <FlatList
        data={messages}
        renderItem={({ item }) => <MessageBubble message={item} />}
        inverted
      />
      <View style={styles.inputBar}>
        <TextInput
          value={inputText}
          onChangeText={setInputText}
          placeholder="Type a message..."
        />
        <TouchableOpacity onPress={sendMessage}>
          <Icon name="send" size={24} />
        </TouchableOpacity>
      </View>
    </View>
  );
};
```

### Admin Dashboard

```typescript
const AdminDashboardScreen = () => {
  const [activeTab, setActiveTab] = useState('users');

  return (
    <View style={styles.container}>
      {/* Tabs */}
      <View style={styles.tabs}>
        <TabButton
          title="Users"
          active={activeTab === 'users'}
          onPress={() => setActiveTab('users')}
        />
        <TabButton
          title="Listings"
          active={activeTab === 'listings'}
          onPress={() => setActiveTab('listings')}
        />
        <TabButton
          title="Analytics"
          active={activeTab === 'analytics'}
          onPress={() => setActiveTab('analytics')}
        />
      </View>

      {/* Content */}
      {activeTab === 'users' && <UserManagement />}
      {activeTab === 'listings' && <ListingModeration />}
      {activeTab === 'analytics' && <Analytics />}
    </View>
  );
};
```

---

## Phase 6: Gemini AI Integration (Day 13)

```typescript
// src/services/gemini.ts
import { GoogleGenerativeAI } from '@google/generative-ai';

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);

export const generatePropertyDescription = async (
  title: string,
  type: string,
  amenities: string[],
  price: number
): Promise<string> => {
  const model = genAI.getGenerativeModel({ model: 'gemini-pro' });

  const prompt = `Write a short, catchy, and professional description (max 80 words) for a rental property listing.
  Title: ${title}
  Type: ${type}
  Amenities: ${amenities.join(', ')}
  Price: $${price}/month
  Make it sound inviting for students and young professionals.`;

  const result = await model.generateContent(prompt);
  const response = await result.response;
  return response.text();
};
```

---

## Phase 7: Polish & Testing (Days 14-15)

### Accessibility
- Add `accessibilityLabel` to all interactive elements
- Test with VoiceOver (iOS) and TalkBack (Android)
- Ensure color contrast ratios meet WCAG standards

### Performance
- Use `React.memo()` for expensive components
- Implement `FlatList` virtualization
- Lazy load images with `react-native-fast-image`

### Testing
```bash
npm test
```

---

## Deployment

### iOS App Store
1. Update `ios/Rentify/Info.plist`
2. Configure signing in Xcode
3. Archive and upload to App Store Connect

### Google Play Store
1. Generate signed APK/AAB
2. Create store listing
3. Submit for review

---

## Next Steps

1. **Backend API**: Build REST API with Node.js/Express
2. **Database**: PostgreSQL for data storage
3. **Authentication**: JWT tokens with refresh
4. **File Storage**: AWS S3 for images
5. **Push Notifications**: Firebase Cloud Messaging
6. **Analytics**: Firebase Analytics or Mixpanel
7. **Payment**: Stripe integration for bookings
8. **CI/CD**: GitHub Actions or Bitrise

---

## Support Resources

- [React Native Docs](https://reactnative.dev/)
- [React Navigation](https://reactnavigation.org/)
- [Gemini AI](https://ai.google.dev/)
- [Design Inspiration](https://dribbble.com/search/rental-app)

Good luck with your build! 🚀
