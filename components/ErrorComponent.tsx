import React from 'react';
import {
  View,
  StyleSheet,
  Text,
  Pressable,
} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

type ErrorComponentProps = {
  message?: string;
  onRetry?: () => void;
};

export default function ErrorComponent({
  message = 'An error occurred. Please try again.',
  onRetry
}: ErrorComponentProps) {
  return (
    <View style={styles.container}>
      <MaterialIcons name="error-outline" size={80} color="#e74c3c" />
      <Text style={styles.message}>{message}</Text>
      {onRetry && (
        <Pressable style={styles.retryBtn} onPress={onRetry}>
          <Text style={styles.retryText}>Retry</Text>
        </Pressable>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#f8f9fa',
  },
  message: {
    fontSize: 18,
    color: '#7f8c8d',
    textAlign: 'center',
    marginVertical: 20,
    lineHeight: 24,
  },
  retryBtn: {
    backgroundColor: '#e74c3c',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    marginTop: 10,
  },
  retryText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});
