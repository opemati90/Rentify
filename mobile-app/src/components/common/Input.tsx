import React from 'react';
import { View, TextInput, Text, StyleSheet } from 'react-native';

interface InputProps {
  label: string;
  value: string;
  onChangeText: (text: string) => void;
  placeholder?: string;
  error?: string;
  secureTextEntry?: boolean;
  keyboardType?: 'default' | 'email-address' | 'numeric' | 'phone-pad';
  multiline?: boolean;
  icon?: React.ReactNode;
}

export const Input: React.FC<InputProps> = ({
  label,
  value,
  onChangeText,
  placeholder = '',
  error = '',
  secureTextEntry = false,
  keyboardType = 'default',
  multiline = false,
  icon
}) => {
  const hasError = Boolean(error);
  const inputStyle = [styles.input, hasError && styles.inputError, multiline && styles.multiline];
  const containerStyle = [styles.inputContainer, hasError && styles.containerError];

  return (
    <View style={styles.container}>
      <Text style={styles.label}>{label}</Text>
      <View style={containerStyle}>
        {icon && <View style={styles.icon}>{icon}</View>}
        <TextInput
          style={inputStyle}
          value={value}
          onChangeText={onChangeText}
          placeholder={placeholder}
          secureTextEntry={secureTextEntry}
          keyboardType={keyboardType}
          multiline={multiline}
          placeholderTextColor="#94A3B8"
        />
      </View>
      {hasError && <Text style={styles.errorText}>{error}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 16
  },
  label: {
    fontSize: 12,
    fontWeight: '600',
    color: '#64748B',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    marginBottom: 8,
    marginLeft: 4
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F8FAFC',
    borderWidth: 1,
    borderColor: '#E2E8F0',
    borderRadius: 12,
    paddingHorizontal: 16
  },
  containerError: {
    borderColor: '#EF4444'
  },
  icon: {
    marginRight: 12
  },
  input: {
    flex: 1,
    paddingVertical: 14,
    fontSize: 16,
    color: '#0F172A'
  },
  inputError: {
    color: '#EF4444'
  },
  multiline: {
    minHeight: 100,
    paddingTop: 14,
    textAlignVertical: 'top'
  },
  errorText: {
    fontSize: 12,
    color: '#EF4444',
    marginTop: 4,
    marginLeft: 4
  }
});
