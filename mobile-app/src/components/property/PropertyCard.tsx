import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { Property } from '../../types';
import { formatPrice } from '../../utils/format';

interface PropertyCardProps {
  property: Property;
  onPress: () => void;
  onLike?: () => void;
  isLiked?: boolean;
}

export const PropertyCard: React.FC<PropertyCardProps> = ({
  property,
  onPress,
  onLike,
  isLiked = false
}) => {
  const { title, location, price, rating, image, type, featured } = property;

  return (
    <TouchableOpacity style={styles.card} onPress={onPress} activeOpacity={0.9}>
      <Image source={{ uri: image }} style={styles.image} />

      {onLike && (
        <TouchableOpacity style={styles.likeButton} onPress={onLike}>
          <Text style={styles.likeIcon}>{isLiked ? '❤️' : '🤍'}</Text>
        </TouchableOpacity>
      )}

      {featured && (
        <View style={styles.featuredBadge}>
          <Text style={styles.featuredText}>Featured</Text>
        </View>
      )}

      <View style={styles.ratingBadge}>
        <Text style={styles.ratingText}>⭐ {rating}</Text>
      </View>

      <View style={styles.info}>
        <Text style={styles.title} numberOfLines={1}>{title}</Text>
        <Text style={styles.location} numberOfLines={1}>📍 {location}</Text>
        <View style={styles.footer}>
          <Text style={styles.price}>
            {formatPrice(price)}
            <Text style={styles.priceUnit}>/m</Text>
          </Text>
          <Text style={styles.type}>{type}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#E2E8F0',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
    marginBottom: 16
  },
  image: {
    width: '100%',
    aspectRatio: 4 / 3,
    backgroundColor: '#F1F5F9'
  },
  likeButton: {
    position: 'absolute',
    top: 12,
    right: 12,
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2
  },
  likeIcon: {
    fontSize: 16
  },
  featuredBadge: {
    position: 'absolute',
    top: 12,
    left: 12,
    backgroundColor: '#EF4444',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6
  },
  featuredText: {
    color: '#FFFFFF',
    fontSize: 10,
    fontWeight: '700'
  },
  ratingBadge: {
    position: 'absolute',
    bottom: 88,
    left: 12,
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6
  },
  ratingText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#0F172A'
  },
  info: {
    padding: 16
  },
  title: {
    fontSize: 16,
    fontWeight: '700',
    color: '#0F172A',
    marginBottom: 4
  },
  location: {
    fontSize: 12,
    color: '#64748B',
    marginBottom: 12
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  price: {
    fontSize: 18,
    fontWeight: '700',
    color: '#EF4444'
  },
  priceUnit: {
    fontSize: 12,
    fontWeight: '400',
    color: '#94A3B8'
  },
  type: {
    fontSize: 12,
    color: '#64748B'
  }
});
