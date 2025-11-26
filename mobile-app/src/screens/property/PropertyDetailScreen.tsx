import React, { useState } from 'react';
import { View, Text, Image, ScrollView, StyleSheet, TouchableOpacity, SafeAreaView } from 'react-native';
import { Property } from '@rentify/shared/types';
import { formatPrice, formatDateRange } from '@rentify/shared/utils';
import { Button, Badge } from '../../components/common';

interface PropertyDetailScreenProps {
  property: Property;
  onBack: () => void;
  onBook: () => void;
}

export const PropertyDetailScreen: React.FC<PropertyDetailScreenProps> = ({
  property,
  onBack,
  onBook
}) => {
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  const {
    title,
    location,
    price,
    rating,
    reviews,
    images,
    beds,
    baths,
    sqft,
    host,
    amenities,
    description,
    availableFrom,
    availableTo,
    depositRequired,
    utilitiesIncluded,
    furnished
  } = property;

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <ImageGallery
          images={images}
          activeIndex={activeImageIndex}
          onIndexChange={setActiveImageIndex}
        />

        <TouchableOpacity style={styles.backButton} onPress={onBack}>
          <Text style={styles.backIcon}>←</Text>
        </TouchableOpacity>

        <View style={styles.content}>
          <View style={styles.header}>
            <View style={styles.titleSection}>
              <Text style={styles.title}>{title}</Text>
              <Text style={styles.location}>📍 {location}</Text>
            </View>
            <View style={styles.ratingBox}>
              <Text style={styles.ratingText}>⭐ {rating}</Text>
              <Text style={styles.reviewCount}>({reviews})</Text>
            </View>
          </View>

          <PropertyStats beds={beds} baths={baths} sqft={sqft} rating={rating} />

          <HostInfo host={host} />

          <Section title="Available Dates">
            <Text style={styles.dateText}>
              {formatDateRange(availableFrom, availableTo)}
            </Text>
          </Section>

          <Section title="Property Details">
            <DetailRow label="Furnished" value={furnished ? 'Yes' : 'No'} />
            <DetailRow label="Utilities Included" value={utilitiesIncluded ? 'Yes' : 'No'} />
            <DetailRow label="Deposit Required" value={formatPrice(depositRequired)} />
          </Section>

          <Section title="Amenities">
            <View style={styles.amenitiesGrid}>
              {amenities.map(amenity => (
                <Badge key={amenity} variant="gray">
                  {amenity}
                </Badge>
              ))}
            </View>
          </Section>

          <Section title="Description">
            <Text style={styles.description}>{description}</Text>
          </Section>
        </View>
      </ScrollView>

      <View style={styles.bottomBar}>
        <View style={styles.priceSection}>
          <Text style={styles.priceLabel}>Price</Text>
          <Text style={styles.priceValue}>
            {formatPrice(price)}
            <Text style={styles.priceUnit}>/month</Text>
          </Text>
        </View>
        <Button title="Book Now" onPress={onBook} style={styles.bookButton} />
      </View>
    </SafeAreaView>
  );
};

const ImageGallery: React.FC<{
  images: string[];
  activeIndex: number;
  onIndexChange: (index: number) => void;
}> = ({ images, activeIndex }) => (
  <View style={styles.imageContainer}>
    <Image source={{ uri: images[activeIndex] }} style={styles.image} />
    <View style={styles.imageIndicators}>
      {images.map((_, index) => (
        <View
          key={index}
          style={[
            styles.indicator,
            index === activeIndex && styles.indicatorActive
          ]}
        />
      ))}
    </View>
  </View>
);

const PropertyStats: React.FC<{
  beds: number;
  baths: number;
  sqft: number;
  rating: number;
}> = ({ beds, baths, sqft, rating }) => (
  <View style={styles.stats}>
    <StatBox icon="🛏️" value={beds} label="Beds" />
    <StatBox icon="🚿" value={baths} label="Baths" />
    <StatBox icon="📐" value={sqft} label="sq ft" />
    <StatBox icon="⭐" value={rating} label="Rating" />
  </View>
);

const StatBox: React.FC<{ icon: string; value: number; label: string }> = ({
  icon,
  value,
  label
}) => (
  <View style={styles.statBox}>
    <Text style={styles.statIcon}>{icon}</Text>
    <Text style={styles.statValue}>{value}</Text>
    <Text style={styles.statLabel}>{label}</Text>
  </View>
);

const HostInfo: React.FC<{ host: Property['host'] }> = ({ host }) => (
  <View style={styles.hostSection}>
    <View style={styles.hostInfo}>
      <View style={styles.avatar}>
        <Image source={{ uri: host.avatar }} style={styles.avatarImage} />
      </View>
      <View>
        <Text style={styles.hostName}>{host.name}</Text>
        <View style={styles.hostMeta}>
          <Text style={styles.hostLabel}>Host</Text>
          {host.verified && <Text style={styles.verified}>✓ Verified</Text>}
        </View>
      </View>
    </View>
    <View style={styles.contactButtons}>
      <TouchableOpacity style={styles.contactButton}>
        <Text>💬</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.contactButton}>
        <Text>📞</Text>
      </TouchableOpacity>
    </View>
  </View>
);

const Section: React.FC<{ title: string; children: React.ReactNode }> = ({
  title,
  children
}) => (
  <View style={styles.section}>
    <Text style={styles.sectionTitle}>{title}</Text>
    {children}
  </View>
);

const DetailRow: React.FC<{ label: string; value: string }> = ({ label, value }) => (
  <View style={styles.detailRow}>
    <Text style={styles.detailLabel}>{label}</Text>
    <Text style={styles.detailValue}>{value}</Text>
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF'
  },
  imageContainer: {
    width: '100%',
    height: 300,
    position: 'relative'
  },
  image: {
    width: '100%',
    height: '100%',
    backgroundColor: '#F1F5F9'
  },
  imageIndicators: {
    position: 'absolute',
    bottom: 16,
    alignSelf: 'center',
    flexDirection: 'row',
    gap: 6
  },
  indicator: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: 'rgba(255, 255, 255, 0.5)'
  },
  indicatorActive: {
    width: 20,
    backgroundColor: '#FFFFFF'
  },
  backButton: {
    position: 'absolute',
    top: 50,
    left: 16,
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    justifyContent: 'center',
    alignItems: 'center'
  },
  backIcon: {
    fontSize: 24
  },
  content: {
    padding: 24
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 24
  },
  titleSection: {
    flex: 1
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    color: '#0F172A',
    marginBottom: 8
  },
  location: {
    fontSize: 14,
    color: '#64748B'
  },
  ratingBox: {
    alignItems: 'flex-end'
  },
  ratingText: {
    fontSize: 18,
    fontWeight: '700'
  },
  reviewCount: {
    fontSize: 12,
    color: '#64748B'
  },
  stats: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 24,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: '#E2E8F0'
  },
  statBox: {
    alignItems: 'center',
    flex: 1
  },
  statIcon: {
    fontSize: 24,
    marginBottom: 8
  },
  statValue: {
    fontSize: 16,
    fontWeight: '700',
    color: '#0F172A',
    marginBottom: 4
  },
  statLabel: {
    fontSize: 12,
    color: '#64748B'
  },
  hostSection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 24,
    borderBottomWidth: 1,
    borderColor: '#E2E8F0'
  },
  hostInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12
  },
  avatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    overflow: 'hidden',
    backgroundColor: '#F1F5F9'
  },
  avatarImage: {
    width: '100%',
    height: '100%'
  },
  hostName: {
    fontSize: 16,
    fontWeight: '700',
    color: '#0F172A',
    marginBottom: 4
  },
  hostMeta: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8
  },
  hostLabel: {
    fontSize: 12,
    color: '#64748B'
  },
  verified: {
    fontSize: 12,
    color: '#10B981',
    fontWeight: '600'
  },
  contactButtons: {
    flexDirection: 'row',
    gap: 8
  },
  contactButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#F1F5F9',
    justifyContent: 'center',
    alignItems: 'center'
  },
  section: {
    paddingVertical: 24,
    borderBottomWidth: 1,
    borderColor: '#E2E8F0'
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#0F172A',
    marginBottom: 16
  },
  dateText: {
    fontSize: 14,
    color: '#64748B'
  },
  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 8
  },
  detailLabel: {
    fontSize: 14,
    color: '#64748B'
  },
  detailValue: {
    fontSize: 14,
    fontWeight: '600',
    color: '#0F172A'
  },
  amenitiesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8
  },
  description: {
    fontSize: 14,
    lineHeight: 22,
    color: '#475569'
  },
  bottomBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 24,
    borderTopWidth: 1,
    borderColor: '#E2E8F0',
    backgroundColor: '#FFFFFF'
  },
  priceSection: {
    flex: 1
  },
  priceLabel: {
    fontSize: 12,
    color: '#64748B',
    marginBottom: 4
  },
  priceValue: {
    fontSize: 24,
    fontWeight: '700',
    color: '#EF4444'
  },
  priceUnit: {
    fontSize: 14,
    color: '#94A3B8'
  },
  bookButton: {
    paddingHorizontal: 32
  }
});
