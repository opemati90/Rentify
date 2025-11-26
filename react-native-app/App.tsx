import React, { useState, useEffect } from 'react';
import {
  SafeAreaView,
  StatusBar,
  StyleSheet,
  View,
} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { COLORS } from './src/constants/theme';

// Import screens (you'll create these based on the implementation guide)
// import WelcomeScreen from './src/screens/onboarding/WelcomeScreen';
// import AuthScreen from './src/screens/onboarding/AuthScreen';
// import VerificationScreen from './src/screens/onboarding/VerificationScreen';
// import TutorialScreen from './src/screens/onboarding/TutorialScreen';
// import HomeScreen from './src/screens/main/HomeScreen';
// import SearchScreen from './src/screens/main/SearchScreen';
// import SavedScreen from './src/screens/main/SavedScreen';
// import MessagesScreen from './src/screens/main/MessagesScreen';
// import ProfileScreen from './src/screens/main/ProfileScreen';
// import PropertyDetailScreen from './src/screens/property/PropertyDetailScreen';
// import CreateListingScreen from './src/screens/property/CreateListingScreen';
// import ChatScreen from './src/screens/messaging/ChatScreen';
// import AdminDashboardScreen from './src/screens/admin/AdminDashboardScreen';

import { RootStackParamList, MainTabParamList } from './src/types';

const Stack = createStackNavigator<RootStackParamList>();
const Tab = createBottomTabNavigator<MainTabParamList>();

// Placeholder screens for initial setup
const PlaceholderScreen = ({ route }: any) => (
  <View style={styles.placeholder}>
    <Text style={styles.placeholderText}>
      {route.name} Screen - To be implemented
    </Text>
  </View>
);

// Main Tab Navigator
const MainTabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: COLORS.brand[500],
        tabBarInactiveTintColor: COLORS.textSecondary,
        tabBarStyle: {
          height: 70,
          paddingBottom: 10,
          paddingTop: 10,
          backgroundColor: COLORS.background,
          borderTopColor: COLORS.borderLight,
          borderTopWidth: 1,
        },
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: '600',
        },
      }}
    >
      <Tab.Screen
        name="Home"
        component={PlaceholderScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Icon name="home" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Search"
        component={PlaceholderScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Icon name="search" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Saved"
        component={PlaceholderScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Icon name="heart" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="MessagesTab"
        component={PlaceholderScreen}
        options={{
          tabBarLabel: 'Messages',
          tabBarIcon: ({ color, size }) => (
            <Icon name="chatbubble" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={PlaceholderScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Icon name="person" size={size} color={color} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

// Root Navigator
const App = () => {
  const [isOnboarded, setIsOnboarded] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Check if user has completed onboarding and is authenticated
  useEffect(() => {
    // TODO: Load from AsyncStorage
    // checkOnboardingStatus();
    // checkAuthStatus();
  }, []);

  return (
    <>
      <StatusBar
        barStyle="dark-content"
        backgroundColor={COLORS.background}
      />
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{
            headerShown: false,
            cardStyle: { backgroundColor: COLORS.background },
          }}
        >
          {/* Onboarding Flow */}
          {!isOnboarded || !isAuthenticated ? (
            <>
              <Stack.Screen name="Welcome" component={PlaceholderScreen} />
              <Stack.Screen name="Auth" component={PlaceholderScreen} />
              <Stack.Screen name="Verification" component={PlaceholderScreen} />
              <Stack.Screen name="Tutorial" component={PlaceholderScreen} />
            </>
          ) : (
            <>
              {/* Main App */}
              <Stack.Screen name="MainTabs" component={MainTabNavigator} />
              <Stack.Screen
                name="PropertyDetail"
                component={PlaceholderScreen}
                options={{
                  presentation: 'modal',
                }}
              />
              <Stack.Screen
                name="CreateListing"
                component={PlaceholderScreen}
                options={{
                  presentation: 'modal',
                }}
              />
              <Stack.Screen name="Messages" component={PlaceholderScreen} />
              <Stack.Screen name="Chat" component={PlaceholderScreen} />
              <Stack.Screen
                name="AdminDashboard"
                component={PlaceholderScreen}
              />
              <Stack.Screen name="EditProfile" component={PlaceholderScreen} />
              <Stack.Screen name="Settings" component={PlaceholderScreen} />
            </>
          )}
        </Stack.Navigator>
      </NavigationContainer>
    </>
  );
};

const styles = StyleSheet.create({
  placeholder: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.background,
  },
  placeholderText: {
    fontSize: 18,
    color: COLORS.textSecondary,
  },
});

export default App;
