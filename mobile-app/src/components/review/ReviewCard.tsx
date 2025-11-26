import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

interface Review {
  id: string;
  userName: string;
  userAvatar?: string;
  rating: number;
  comment: string;
  date: string;
  verified: boolean;
}

interface ReviewCardProps {
  review: Review;
}

export const ReviewCard: React.FC<ReviewCardProps> = ({ review }) => {
  return (
    <View style={styles.card}>
      <View style={styles.header}>
        <View style={styles.userInfo}>
          <View style={styles.avatar}>
            <Text style={styles.avatarText}>{review.userName.charAt(0)}</Text>
          </View>
          <View style={styles.userDetails}>
            <View style={styles.nameRow}>
              <Text style={styles.userName}>{review.userName}</Text>
              {review.verified && (
                <View style={styles.verifiedBadge}>
                  <Text style={styles.verifiedText}>✓</Text>
                </View>
              )}
            </View>
            <Text style={styles.date}>{review.date}</Text>
          </View>
        </View>
        <View style={styles.ratingContainer}>
          <StarRating rating={review.rating} size={16} />
        </View>
      </View>

      <Text style={styles.comment}>{review.comment}</Text>
    </View>
  );
};

interface StarRatingProps {
  rating: number;
  size?: number;
  showNumber?: boolean;
}

export const StarRating: React.FC<StarRatingProps> = ({ rating, size = 20, showNumber = false }) => {
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 >= 0.5;
  const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);

  return (
    <View style={styles.starRating}>
      <View style={styles.stars}>
        {[...Array(fullStars)].map((_, i) => (
          <Text key={`full-${i}`} style={[styles.star, { fontSize: size }]}>⭐</Text>
        ))}
        {hasHalfStar && (
          <Text style={[styles.star, { fontSize: size }]}>⭐</Text>
        )}
        {[...Array(emptyStars)].map((_, i) => (
          <Text key={`empty-${i}`} style={[styles.star, styles.emptyStar, { fontSize: size }]}>☆</Text>
        ))}
      </View>
      {showNumber && (
        <Text style={styles.ratingNumber}>{rating.toFixed(1)}</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    marginBottom: 12
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 12
  },
  userInfo: {
    flexDirection: 'row',
    flex: 1
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#EF4444',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12
  },
  avatarText: {
    fontSize: 16,
    fontWeight: '700',
    color: '#FFFFFF'
  },
  userDetails: {
    flex: 1
  },
  nameRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6
  },
  userName: {
    fontSize: 15,
    fontWeight: '600',
    color: '#0F172A'
  },
  verifiedBadge: {
    width: 18,
    height: 18,
    borderRadius: 9,
    backgroundColor: '#10B981',
    justifyContent: 'center',
    alignItems: 'center'
  },
  verifiedText: {
    fontSize: 10,
    color: '#FFFFFF',
    fontWeight: '700'
  },
  date: {
    fontSize: 13,
    color: '#64748B',
    marginTop: 2
  },
  ratingContainer: {
    marginLeft: 12
  },
  comment: {
    fontSize: 14,
    color: '#0F172A',
    lineHeight: 20
  },
  starRating: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8
  },
  stars: {
    flexDirection: 'row',
    gap: 2
  },
  star: {
    color: '#F59E0B'
  },
  emptyStar: {
    color: '#CBD5E1'
  },
  ratingNumber: {
    fontSize: 14,
    fontWeight: '600',
    color: '#0F172A'
  }
});
