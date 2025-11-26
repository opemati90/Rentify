import React from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Image } from 'react-native';
import { Badge } from '../../components/common/Badge';

interface Message {
  id: string;
  userName: string;
  userAvatar?: string;
  lastMessage: string;
  timestamp: string;
  unread: boolean;
  propertyTitle: string;
}

const MOCK_MESSAGES: Message[] = [
  {
    id: '1',
    userName: 'Sarah Johnson',
    lastMessage: 'Is the apartment still available for March?',
    timestamp: '2m ago',
    unread: true,
    propertyTitle: 'Modern Studio Downtown'
  },
  {
    id: '2',
    userName: 'Mike Chen',
    lastMessage: 'Thank you! I will check it out tomorrow.',
    timestamp: '1h ago',
    unread: false,
    propertyTitle: 'Cozy 2BR Apartment'
  },
  {
    id: '3',
    userName: 'Emily Davis',
    lastMessage: 'Perfect! When can we schedule a viewing?',
    timestamp: '3h ago',
    unread: true,
    propertyTitle: 'Spacious Villa'
  },
  {
    id: '4',
    userName: 'David Wilson',
    lastMessage: 'Got it, thanks for the quick response!',
    timestamp: '1d ago',
    unread: false,
    propertyTitle: 'Studio Near Campus'
  }
];

export const MessagesScreen: React.FC = () => {
  const renderMessage = ({ item }: { item: Message }) => (
    <MessageItem message={item} onPress={() => console.log('Open chat:', item.id)} />
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Messages</Text>
        <TouchableOpacity style={styles.searchIcon}>
          <Text style={styles.searchIconText}>🔍</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={MOCK_MESSAGES}
        renderItem={renderMessage}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.list}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
      />
    </View>
  );
};

interface MessageItemProps {
  message: Message;
  onPress: () => void;
}

const MessageItem: React.FC<MessageItemProps> = ({ message, onPress }) => (
  <TouchableOpacity style={styles.messageItem} onPress={onPress} activeOpacity={0.7}>
    <View style={styles.avatar}>
      <Text style={styles.avatarText}>{message.userName.charAt(0)}</Text>
    </View>

    <View style={styles.messageContent}>
      <View style={styles.messageHeader}>
        <Text style={styles.userName}>{message.userName}</Text>
        <Text style={styles.timestamp}>{message.timestamp}</Text>
      </View>

      <Text style={styles.propertyTitle} numberOfLines={1}>
        {message.propertyTitle}
      </Text>

      <View style={styles.messageFooter}>
        <Text
          style={[styles.lastMessage, message.unread && styles.unreadMessage]}
          numberOfLines={1}
        >
          {message.lastMessage}
        </Text>
        {message.unread && <View style={styles.unreadBadge} />}
      </View>
    </View>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8FAFC'
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingVertical: 16,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#E2E8F0'
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: '#0F172A'
  },
  searchIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#F8FAFC',
    justifyContent: 'center',
    alignItems: 'center'
  },
  searchIconText: {
    fontSize: 18
  },
  list: {
    paddingVertical: 8
  },
  messageItem: {
    flexDirection: 'row',
    paddingVertical: 16,
    paddingHorizontal: 24,
    backgroundColor: '#FFFFFF'
  },
  avatar: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: '#EF4444',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12
  },
  avatarText: {
    fontSize: 20,
    fontWeight: '700',
    color: '#FFFFFF'
  },
  messageContent: {
    flex: 1
  },
  messageHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4
  },
  userName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#0F172A'
  },
  timestamp: {
    fontSize: 12,
    color: '#94A3B8'
  },
  propertyTitle: {
    fontSize: 13,
    color: '#64748B',
    marginBottom: 6
  },
  messageFooter: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  lastMessage: {
    flex: 1,
    fontSize: 14,
    color: '#64748B'
  },
  unreadMessage: {
    color: '#0F172A',
    fontWeight: '600'
  },
  unreadBadge: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#EF4444',
    marginLeft: 8
  },
  separator: {
    height: 1,
    backgroundColor: '#F1F5F9',
    marginLeft: 92
  }
});
