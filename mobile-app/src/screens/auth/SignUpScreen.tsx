import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { Button } from '../../components/common/Button';
import { Input } from '../../components/common/Input';

export const SignUpScreen: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    phone: ''
  });
  const [loading, setLoading] = useState(false);

  const handleSignUp = async () => {
    setLoading(true);
    // TODO: Implement sign up logic
    console.log('Sign up with:', formData);
    setTimeout(() => setLoading(false), 1000);
  };

  const handleSocialSignUp = (provider: string) => {
    console.log(`Sign up with ${provider}`);
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <View style={styles.header}>
        <Text style={styles.title}>Create Account</Text>
        <Text style={styles.subtitle}>
          Join thousands finding their perfect sublet
        </Text>
      </View>

      <View style={styles.form}>
        <Input
          placeholder="Full Name"
          value={formData.name}
          onChangeText={(name) => setFormData({ ...formData, name })}
          autoCapitalize="words"
        />

        <Input
          placeholder="Email"
          value={formData.email}
          onChangeText={(email) => setFormData({ ...formData, email })}
          keyboardType="email-address"
          autoCapitalize="none"
        />

        <Input
          placeholder="Phone Number"
          value={formData.phone}
          onChangeText={(phone) => setFormData({ ...formData, phone })}
          keyboardType="phone-pad"
        />

        <Input
          placeholder="Password"
          value={formData.password}
          onChangeText={(password) => setFormData({ ...formData, password })}
          secureTextEntry
        />

        <Input
          placeholder="Confirm Password"
          value={formData.confirmPassword}
          onChangeText={(confirmPassword) => setFormData({ ...formData, confirmPassword })}
          secureTextEntry
        />

        <Button
          title="Create Account"
          onPress={handleSignUp}
          loading={loading}
          fullWidth
          size="large"
        />
      </View>

      <View style={styles.divider}>
        <View style={styles.dividerLine} />
        <Text style={styles.dividerText}>OR</Text>
        <View style={styles.dividerLine} />
      </View>

      <View style={styles.socialButtons}>
        <SocialButton
          icon="G"
          label="Continue with Google"
          onPress={() => handleSocialSignUp('Google')}
        />
        <SocialButton
          icon="f"
          label="Continue with Facebook"
          onPress={() => handleSocialSignUp('Facebook')}
        />
        <SocialButton
          icon="in"
          label="Continue with LinkedIn"
          onPress={() => handleSocialSignUp('LinkedIn')}
        />
      </View>

      <TouchableOpacity style={styles.loginLink}>
        <Text style={styles.loginText}>
          Already have an account? <Text style={styles.loginLinkText}>Login</Text>
        </Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

interface SocialButtonProps {
  icon: string;
  label: string;
  onPress: () => void;
}

const SocialButton: React.FC<SocialButtonProps> = ({ icon, label, onPress }) => (
  <TouchableOpacity style={styles.socialButton} onPress={onPress}>
    <View style={styles.socialIcon}>
      <Text style={styles.socialIconText}>{icon}</Text>
    </View>
    <Text style={styles.socialButtonText}>{label}</Text>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF'
  },
  content: {
    paddingHorizontal: 24,
    paddingVertical: 48
  },
  header: {
    marginBottom: 32
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    color: '#0F172A',
    marginBottom: 8
  },
  subtitle: {
    fontSize: 14,
    color: '#64748B',
    lineHeight: 20
  },
  form: {
    gap: 16,
    marginBottom: 24
  },
  divider: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 24
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: '#E2E8F0'
  },
  dividerText: {
    marginHorizontal: 16,
    fontSize: 12,
    color: '#94A3B8',
    fontWeight: '600'
  },
  socialButtons: {
    gap: 12,
    marginBottom: 24
  },
  socialButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 14,
    paddingHorizontal: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    backgroundColor: '#FFFFFF'
  },
  socialIcon: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: '#F1F5F9',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12
  },
  socialIconText: {
    fontSize: 14,
    fontWeight: '700',
    color: '#0F172A'
  },
  socialButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#0F172A'
  },
  loginLink: {
    paddingVertical: 16,
    alignItems: 'center'
  },
  loginText: {
    fontSize: 14,
    color: '#64748B'
  },
  loginLinkText: {
    color: '#EF4444',
    fontWeight: '600'
  }
});
