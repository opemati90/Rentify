import React from 'react';
import { Text, StyleSheet, ViewStyle, TextStyle } from 'react-native';

type BadgeVariant = 'primary' | 'success' | 'warning' | 'info' | 'gray';

interface BadgeProps {
  children: string;
  variant?: BadgeVariant;
  style?: ViewStyle;
}

const VARIANT_STYLES: Record<BadgeVariant, { container: ViewStyle; text: TextStyle }> = {
  primary: {
    container: { backgroundColor: '#DBEAFE' },
    text: { color: '#1E40AF' }
  },
  success: {
    container: { backgroundColor: '#D1FAE5' },
    text: { color: '#065F46' }
  },
  warning: {
    container: { backgroundColor: '#FEF3C7' },
    text: { color: '#92400E' }
  },
  info: {
    container: { backgroundColor: '#E0E7FF' },
    text: { color: '#3730A3' }
  },
  gray: {
    container: { backgroundColor: '#F1F5F9' },
    text: { color: '#475569' }
  }
};

export const Badge: React.FC<BadgeProps> = ({
  children,
  variant = 'primary',
  style
}) => {
  const variantStyle = VARIANT_STYLES[variant];

  return (
    <Text style={[styles.badge, variantStyle.container, variantStyle.text, style]}>
      {children}
    </Text>
  );
};

const styles = StyleSheet.create({
  badge: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
    fontSize: 12,
    fontWeight: '700',
    overflow: 'hidden'
  }
});
