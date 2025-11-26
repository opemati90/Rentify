import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { Button } from '../../components/common/Button';
import { Input } from '../../components/common/Input';

export const LoginScreen: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    setLoading(true);
    // TODO: Implement login logic
    console.log('Login with:', { email, password });
    setTimeout(() => setLoading(false), 1000);
  };

  const handleSocialLogin = (provider: string) => {
    console.log(`Login with ${provider}`);
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <View style={styles.header}>
        <Text style={styles.title}>Welcome Back</Text>
        <Text style={styles.subtitle}>
          Login to continue finding great sublets
        </Text>
      </View>

      <View style={styles.form}>
        <Input
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
        />

        <Input
          placeholder="Password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />

        <TouchableOpacity style={styles.forgotPassword}>
          <Text style={styles.forgotPasswordText}>Forgot Password?</Text>
        </TouchableOpacity>

        <Button
          title="Login"
          onPress={handleLogin}
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
          onPress={() => handleSocialLogin('Google')}
        />
        <SocialButton
          icon="f"
          label="Continue with Facebook"
          onPress={() => handleSocialLogin('Facebook')}
        />
        <SocialButton
          icon="in"
          label="Continue with LinkedIn"
          onPress={() => handleSocialLogin('LinkedIn')}
        />
      </View>

      <TouchableOpacity style={styles.signUpLink}>
        <Text style={styles.signUpText}>
          Don't have an account? <Text style={styles.signUpLinkText}>Sign Up</Text>
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
    paddingVertical: 48,
    justifyContent: 'center',
    minHeight: '100%'
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
  forgotPassword: {
    alignSelf: 'flex-end',
    marginTop: -8,
    marginBottom: 8
  },
  forgotPasswordText: {
    fontSize: 14,
    color: '#EF4444',
    fontWeight: '600'
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
  signUpLink: {
    paddingVertical: 16,
    alignItems: 'center'
  },
  signUpText: {
    fontSize: 14,
    color: '#64748B'
  },
  signUpLinkText: {
    color: '#EF4444',
    fontWeight: '600'
  }
});
