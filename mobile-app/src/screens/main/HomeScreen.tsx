import React, { useState, useCallback } from 'react';
import { View, Text, FlatList, StyleSheet, SafeAreaView, TouchableOpacity } from 'react-native';
import { Property } from '../../types';
import { PropertyCard } from '../../components/property/PropertyCard';
import { MOCK_PROPERTIES } from '../../data/mockProperties';

const PROPERTY_TYPES = ['All', 'Apartment', 'House', 'Villa', 'Studio', 'Room'];

export const HomeScreen: React.FC = () => {
  const [properties] = useState<Property[]>(MOCK_PROPERTIES);
  const [selectedType, setSelectedType] = useState('All');
  const [likedIds, setLikedIds] = useState<Set<string>>(new Set());

  const toggleLike = useCallback((id: string) => {
    setLikedIds(prev => {
      const updated = new Set(prev);
      updated.has(id) ? updated.delete(id) : updated.add(id);
      return updated;
    });
  }, []);

  const filteredProperties = selectedType === 'All'
    ? properties
    : properties.filter(p => p.type === selectedType);

  const featuredProperties = filteredProperties.filter(p => p.featured);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <View>
          <Text style={styles.locationLabel}>Location</Text>
          <Text style={styles.location}>📍 Helsinki, Finland</Text>
        </View>
        <View style={styles.avatar} />
      </View>

      <TouchableOpacity style={styles.searchBar}>
        <Text style={styles.searchText}>🔍 Find your best stay</Text>
        <View style={styles.filterButton}>
          <Text>⚙️</Text>
        </View>
      </TouchableOpacity>

      <FlatList
        horizontal
        data={PROPERTY_TYPES}
        keyExtractor={item => item}
        renderItem={({ item }) => (
          <TypeChip
            label={item}
            isSelected={selectedType === item}
            onPress={() => setSelectedType(item)}
          />
        )}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.typeList}
        style={styles.typeScrollView}
      />

      <FlatList
        data={filteredProperties}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <PropertyCard
            property={item}
            onPress={() => console.log('Property:', item.title)}
            onLike={() => toggleLike(item.id)}
            isLiked={likedIds.has(item.id)}
          />
        )}
        contentContainerStyle={styles.propertyList}
        showsVerticalScrollIndicator={false}
        ListHeaderComponent={
          featuredProperties.length > 0 ? (
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Featured</Text>
            </View>
          ) : null
        }
      />
    </SafeAreaView>
  );
};

interface TypeChipProps {
  label: string;
  isSelected: boolean;
  onPress: () => void;
}

const TypeChip: React.FC<TypeChipProps> = ({ label, isSelected, onPress }) => (
  <TouchableOpacity
    style={[styles.typeChip, isSelected && styles.typeChipActive]}
    onPress={onPress}
  >
    <Text style={[styles.typeChipText, isSelected && styles.typeChipTextActive]}>
      {label}
    </Text>
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
    paddingVertical: 16
  },
  locationLabel: {
    fontSize: 12,
    color: '#64748B',
    marginBottom: 4
  },
  location: {
    fontSize: 16,
    fontWeight: '700',
    color: '#0F172A'
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#E2E8F0'
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    marginHorizontal: 24,
    marginBottom: 16,
    padding: 16,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#E2E8F0'
  },
  searchText: {
    flex: 1,
    fontSize: 14,
    color: '#64748B'
  },
  filterButton: {
    width: 32,
    height: 32,
    borderRadius: 8,
    backgroundColor: '#0F172A',
    justifyContent: 'center',
    alignItems: 'center'
  },
  typeScrollView: {
    marginBottom: 16
  },
  typeList: {
    paddingHorizontal: 24,
    gap: 12
  },
  typeChip: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 9999,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E2E8F0'
  },
  typeChipActive: {
    backgroundColor: '#EF4444',
    borderColor: '#EF4444'
  },
  typeChipText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#64748B'
  },
  typeChipTextActive: {
    color: '#FFFFFF'
  },
  section: {
    marginBottom: 16
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#0F172A',
    marginBottom: 8
  },
  propertyList: {
    paddingHorizontal: 24,
    paddingBottom: 24
  }
});
