import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  Dimensions,
  StatusBar,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/Ionicons';
import Button from '../../components/Button';
import { COLORS, SPACING, TYPOGRAPHY, BORDER_RADIUS } from '../../constants/theme';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { RootStackParamList } from '../../types';

const { width, height } = Dimensions.get('window');

type WelcomeScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'Welcome'
>;

interface Props {
  navigation: WelcomeScreenNavigationProp;
}

const WelcomeScreen: React.FC<Props> = ({ navigation }) => {
  const handleGetStarted = () => {
    navigation.navigate('Auth', { mode: 'signup' });
  };

  const handleLogin = () => {
    navigation.navigate('Auth', { mode: 'login' });
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />

      {/* Background Image */}
      <ImageBackground
        source={{
          uri: 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800',
        }}
        style={styles.backgroundImage}
        resizeMode="cover"
      >
        {/* Gradient Overlay */}
        <LinearGradient
          colors={['rgba(15, 23, 42, 0.3)', 'rgba(15, 23, 42, 0.85)', 'rgba(15, 23, 42, 0.95)']}
          style={styles.gradient}
        >
          <SafeAreaView style={styles.safeArea}>
            {/* Logo Section */}
            <View style={styles.logoContainer}>
              <View style={styles.iconWrapper}>
                <Icon name="home" size={36} color={COLORS.background} />
              </View>
            </View>

            {/* Content Section */}
            <View style={styles.content}>
              <Text style={styles.title}>
                Rent Your{'\n'}
                Perfect Home 🏠
              </Text>
              <Text style={styles.subtitle}>
                Find and list verified sublets in minutes.
              </Text>
              <Text style={styles.description}>
                Perfect for students, young professionals, and travelers seeking temporary housing.
              </Text>
            </View>

            {/* CTA Buttons */}
            <View style={styles.buttonContainer}>
              <Button
                title="Get Started"
                onPress={handleGetStarted}
                variant="primary"
                fullWidth
                style={styles.primaryButton}
              />
              <Button
                title="Log In"
                onPress={handleLogin}
                variant="secondary"
                fullWidth
                style={styles.secondaryButton}
              />
            </View>

            {/* Features */}
            <View style={styles.features}>
              <FeatureItem
                icon="shield-checkmark"
                text="Verified listings"
              />
              <FeatureItem
                icon="people"
                text="Trusted community"
              />
              <FeatureItem
                icon="lock-closed"
                text="Secure payments"
              />
            </View>
          </SafeAreaView>
        </LinearGradient>
      </ImageBackground>
    </View>
  );
};

const FeatureItem: React.FC<{ icon: string; text: string }> = ({ icon, text }) => (
  <View style={styles.featureItem}>
    <Icon name={icon} size={16} color={COLORS.brand[400]} />
    <Text style={styles.featureText}>{text}</Text>
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.slate[900],
  },
  backgroundImage: {
    flex: 1,
    width: width,
    height: height,
  },
  gradient: {
    flex: 1,
  },
  safeArea: {
    flex: 1,
    paddingHorizontal: SPACING.lg,
  },
  logoContainer: {
    paddingTop: SPACING.xxl,
    alignItems: 'flex-start',
  },
  iconWrapper: {
    width: 70,
    height: 70,
    borderRadius: BORDER_RADIUS.lg,
    backgroundColor: COLORS.brand[500],
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: COLORS.brand[500],
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.4,
    shadowRadius: 16,
    elevation: 8,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    paddingBottom: SPACING.xxl,
  },
  title: {
    fontSize: TYPOGRAPHY.fontSize['4xl'],
    fontWeight: 'bold',
    color: COLORS.background,
    marginBottom: SPACING.md,
    lineHeight: TYPOGRAPHY.fontSize['4xl'] * 1.2,
  },
  subtitle: {
    fontSize: TYPOGRAPHY.fontSize.lg,
    color: COLORS.slate[200],
    marginBottom: SPACING.md,
    fontWeight: '500',
  },
  description: {
    fontSize: TYPOGRAPHY.fontSize.md,
    color: COLORS.slate[300],
    lineHeight: TYPOGRAPHY.fontSize.md * 1.6,
    opacity: 0.9,
  },
  buttonContainer: {
    gap: SPACING.md,
    marginBottom: SPACING.xl,
  },
  primaryButton: {
    shadowColor: COLORS.brand[500],
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.3,
    shadowRadius: 16,
    elevation: 8,
  },
  secondaryButton: {
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
    borderColor: 'rgba(255, 255, 255, 0.3)',
    backdropFilter: 'blur(10px)',
  },
  features: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingBottom: SPACING.lg,
  },
  featureItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: SPACING.xs,
  },
  featureText: {
    fontSize: TYPOGRAPHY.fontSize.xs,
    color: COLORS.slate[300],
    fontWeight: '500',
  },
});

export default WelcomeScreen;
