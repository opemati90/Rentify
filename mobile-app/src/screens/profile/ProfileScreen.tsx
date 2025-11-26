import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image } from 'react-native';
import { Button } from '../../components/common/Button';
import { Badge } from '../../components/common/Badge';

export const ProfileScreen: React.FC = () => {
  const user = {
    name: 'John Doe',
    email: 'john.doe@example.com',
    phone: '+1 (555) 123-4567',
    verified: true,
    trustScore: 4.8,
    memberSince: 'January 2024',
    completedSublets: 5,
    activeListings: 2
  };

  return (
    <ScrollView style={styles.container}>
      {/* Profile Header */}
      <View style={styles.header}>
        <View style={styles.avatarContainer}>
          <View style={styles.avatar}>
            <Text style={styles.avatarText}>{user.name.charAt(0)}</Text>
          </View>
          {user.verified && (
            <View style={styles.verifiedBadge}>
              <Text style={styles.verifiedIcon}>✓</Text>
            </View>
          )}
        </View>

        <Text style={styles.name}>{user.name}</Text>
        <Text style={styles.memberSince}>Member since {user.memberSince}</Text>

        <View style={styles.trustScoreContainer}>
          <Text style={styles.trustScoreLabel}>Trust Score</Text>
          <View style={styles.trustScore}>
            <Text style={styles.trustScoreValue}>⭐ {user.trustScore}</Text>
            {user.verified && (
              <Badge variant="success" size="small">
                Verified
              </Badge>
            )}
          </View>
        </View>
      </View>

      {/* Stats */}
      <View style={styles.stats}>
        <StatItem label="Completed Sublets" value={user.completedSublets} />
        <View style={styles.statDivider} />
        <StatItem label="Active Listings" value={user.activeListings} />
        <View style={styles.statDivider} />
        <StatItem label="Reviews" value="12" />
      </View>

      {/* Profile Sections */}
      <View style={styles.sections}>
        <SectionItem
          icon="👤"
          title="Personal Information"
          subtitle={user.email}
          onPress={() => console.log('Personal info')}
        />
        <SectionItem
          icon="🏠"
          title="My Listings"
          subtitle={`${user.activeListings} active listings`}
          onPress={() => console.log('My listings')}
        />
        <SectionItem
          icon="❤️"
          title="Saved Properties"
          subtitle="View your favorite sublets"
          onPress={() => console.log('Saved properties')}
        />
        <SectionItem
          icon="📋"
          title="Booking History"
          subtitle={`${user.completedSublets} completed`}
          onPress={() => console.log('Booking history')}
        />
        <SectionItem
          icon="⭐"
          title="Reviews & Ratings"
          subtitle="View and manage reviews"
          onPress={() => console.log('Reviews')}
        />
        <SectionItem
          icon="✓"
          title="Verification"
          subtitle="Verify your identity"
          onPress={() => console.log('Verification')}
          badge={user.verified ? undefined : 'action-required'}
        />
        <SectionItem
          icon="🔔"
          title="Notifications"
          subtitle="Manage notification preferences"
          onPress={() => console.log('Notifications')}
        />
        <SectionItem
          icon="⚙️"
          title="Settings"
          subtitle="App preferences and privacy"
          onPress={() => console.log('Settings')}
        />
      </View>

      <View style={styles.footer}>
        <Button
          title="Logout"
          variant="outline"
          onPress={() => console.log('Logout')}
          fullWidth
        />
      </View>
    </ScrollView>
  );
};

interface StatItemProps {
  label: string;
  value: number | string;
}

const StatItem: React.FC<StatItemProps> = ({ label, value }) => (
  <View style={styles.statItem}>
    <Text style={styles.statValue}>{value}</Text>
    <Text style={styles.statLabel}>{label}</Text>
  </View>
);

interface SectionItemProps {
  icon: string;
  title: string;
  subtitle: string;
  onPress: () => void;
  badge?: string;
}

const SectionItem: React.FC<SectionItemProps> = ({ icon, title, subtitle, onPress, badge }) => (
  <TouchableOpacity style={styles.sectionItem} onPress={onPress}>
    <View style={styles.sectionIcon}>
      <Text style={styles.sectionIconText}>{icon}</Text>
    </View>
    <View style={styles.sectionContent}>
      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>{title}</Text>
        {badge && (
          <View style={styles.actionBadge}>
            <Text style={styles.actionBadgeText}>!</Text>
          </View>
        )}
      </View>
      <Text style={styles.sectionSubtitle}>{subtitle}</Text>
    </View>
    <Text style={styles.sectionChevron}>›</Text>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8FAFC'
  },
  header: {
    backgroundColor: '#FFFFFF',
    paddingTop: 48,
    paddingBottom: 24,
    paddingHorizontal: 24,
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#E2E8F0'
  },
  avatarContainer: {
    position: 'relative',
    marginBottom: 16
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: '#EF4444',
    justifyContent: 'center',
    alignItems: 'center'
  },
  avatarText: {
    fontSize: 40,
    fontWeight: '700',
    color: '#FFFFFF'
  },
  verifiedBadge: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#10B981',
    borderWidth: 3,
    borderColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center'
  },
  verifiedIcon: {
    fontSize: 16,
    color: '#FFFFFF',
    fontWeight: '700'
  },
  name: {
    fontSize: 24,
    fontWeight: '700',
    color: '#0F172A',
    marginBottom: 4
  },
  memberSince: {
    fontSize: 14,
    color: '#64748B',
    marginBottom: 16
  },
  trustScoreContainer: {
    alignItems: 'center',
    gap: 8
  },
  trustScoreLabel: {
    fontSize: 12,
    color: '#64748B',
    fontWeight: '600',
    textTransform: 'uppercase',
    letterSpacing: 0.5
  },
  trustScore: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8
  },
  trustScoreValue: {
    fontSize: 18,
    fontWeight: '700',
    color: '#0F172A'
  },
  stats: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    paddingVertical: 20,
    paddingHorizontal: 24,
    marginTop: 8
  },
  statItem: {
    flex: 1,
    alignItems: 'center'
  },
  statValue: {
    fontSize: 24,
    fontWeight: '700',
    color: '#EF4444',
    marginBottom: 4
  },
  statLabel: {
    fontSize: 12,
    color: '#64748B',
    textAlign: 'center'
  },
  statDivider: {
    width: 1,
    backgroundColor: '#E2E8F0'
  },
  sections: {
    marginTop: 8,
    backgroundColor: '#FFFFFF'
  },
  sectionItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 16,
    paddingHorizontal: 24,
    borderBottomWidth: 1,
    borderBottomColor: '#F1F5F9'
  },
  sectionIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#F8FAFC',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12
  },
  sectionIconText: {
    fontSize: 20
  },
  sectionContent: {
    flex: 1
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#0F172A'
  },
  actionBadge: {
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: '#EF4444',
    justifyContent: 'center',
    alignItems: 'center'
  },
  actionBadgeText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#FFFFFF'
  },
  sectionSubtitle: {
    fontSize: 13,
    color: '#64748B',
    marginTop: 2
  },
  sectionChevron: {
    fontSize: 24,
    color: '#CBD5E1',
    marginLeft: 8
  },
  footer: {
    padding: 24,
    paddingBottom: 48
  }
});
