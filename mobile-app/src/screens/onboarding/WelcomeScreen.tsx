import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { Button } from '../../components/common/Button';

export const WelcomeScreen: React.FC = () => {
  const handleGetStarted = () => {
    // Navigate to sign up
    console.log('Navigate to sign up');
  };

  const handleLogin = () => {
    // Navigate to login
    console.log('Navigate to login');
  };

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        {/* Logo/Icon placeholder */}
        <View style={styles.logoContainer}>
          <Text style={styles.logoText}>🏠</Text>
        </View>

        <Text style={styles.title}>Welcome to Rentify</Text>
        <Text style={styles.subtitle}>
          Find and list verified sublets in minutes
        </Text>

        <View style={styles.features}>
          <FeatureItem
            icon="✓"
            text="Verified listings and users"
          />
          <FeatureItem
            icon="💬"
            text="Secure in-app messaging"
          />
          <FeatureItem
            icon="⭐"
            text="Trusted reviews and ratings"
          />
          <FeatureItem
            icon="🗺️"
            text="Search with interactive maps"
          />
        </View>
      </View>

      <View style={styles.actions}>
        <Button
          title="Get Started"
          onPress={handleGetStarted}
          variant="primary"
          size="large"
          fullWidth
        />
        <TouchableOpacity
          style={styles.loginButton}
          onPress={handleLogin}
        >
          <Text style={styles.loginText}>
            Already have an account? <Text style={styles.loginLink}>Login</Text>
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

interface FeatureItemProps {
  icon: string;
  text: string;
}

const FeatureItem: React.FC<FeatureItemProps> = ({ icon, text }) => (
  <View style={styles.featureItem}>
    <Text style={styles.featureIcon}>{icon}</Text>
    <Text style={styles.featureText}>{text}</Text>
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 24,
    paddingVertical: 48
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  logoContainer: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: '#FEE2E2',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 32
  },
  logoText: {
    fontSize: 60
  },
  title: {
    fontSize: 32,
    fontWeight: '700',
    color: '#0F172A',
    marginBottom: 12,
    textAlign: 'center'
  },
  subtitle: {
    fontSize: 16,
    color: '#64748B',
    textAlign: 'center',
    marginBottom: 48,
    lineHeight: 24
  },
  features: {
    width: '100%',
    gap: 16
  },
  featureItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12
  },
  featureIcon: {
    fontSize: 24,
    marginRight: 16,
    width: 32,
    textAlign: 'center'
  },
  featureText: {
    fontSize: 16,
    color: '#0F172A',
    flex: 1
  },
  actions: {
    width: '100%',
    gap: 16
  },
  loginButton: {
    paddingVertical: 16,
    alignItems: 'center'
  },
  loginText: {
    fontSize: 14,
    color: '#64748B'
  },
  loginLink: {
    color: '#EF4444',
    fontWeight: '600'
  }
});
