import React, { useState, useMemo } from 'react';
import { View, Text, TextInput, FlatList, StyleSheet, SafeAreaView, TouchableOpacity } from 'react-native';
import { Property } from '@rentify/shared/types';
import { PropertyCard } from '../../components/property/PropertyCard';
import { Badge } from '../../components/common';

interface SearchFilters {
  minPrice: number;
  maxPrice: number;
  beds: number | null;
  propertyType: string | null;
}

const DEFAULT_FILTERS: SearchFilters = {
  minPrice: 0,
  maxPrice: 5000,
  beds: null,
  propertyType: null
};

export const SearchScreen: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [filters, setFilters] = useState(DEFAULT_FILTERS);
  const [showFilters, setShowFilters] = useState(false);
  const [properties, setProperties] = useState<Property[]>([]);

  const filteredProperties = useMemo(() => {
    return properties.filter(property => {
      const matchesSearch = property.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          property.location.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesPrice = property.price >= filters.minPrice &&
                          property.price <= filters.maxPrice;

      const matchesBeds = filters.beds === null || property.beds >= filters.beds;

      const matchesType = filters.propertyType === null ||
                         property.type === filters.propertyType;

      return matchesSearch && matchesPrice && matchesBeds && matchesType;
    });
  }, [properties, searchQuery, filters]);

  const updateFilter = <K extends keyof SearchFilters>(
    key: K,
    value: SearchFilters[K]
  ) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  };

  const clearFilters = () => {
    setFilters(DEFAULT_FILTERS);
  };

  const activeFilterCount = Object.values(filters).filter(v => v !== null && v !== 0).length;

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.searchSection}>
        <View style={styles.searchBar}>
          <Text style={styles.searchIcon}>🔍</Text>
          <TextInput
            style={styles.searchInput}
            placeholder="Search by location or name..."
            value={searchQuery}
            onChangeText={setSearchQuery}
            placeholderTextColor="#94A3B8"
          />
        </View>
        <TouchableOpacity
          style={styles.filterButton}
          onPress={() => setShowFilters(!showFilters)}
        >
          <Text style={styles.filterIcon}>⚙️</Text>
          {activeFilterCount > 0 && (
            <View style={styles.filterBadge}>
              <Text style={styles.filterBadgeText}>{activeFilterCount}</Text>
            </View>
          )}
        </TouchableOpacity>
      </View>

      {showFilters && (
        <FilterPanel
          filters={filters}
          onUpdateFilter={updateFilter}
          onClear={clearFilters}
        />
      )}

      <View style={styles.resultHeader}>
        <Text style={styles.resultCount}>
          {filteredProperties.length} properties found
        </Text>
        {activeFilterCount > 0 && (
          <TouchableOpacity onPress={clearFilters}>
            <Text style={styles.clearFilters}>Clear all</Text>
          </TouchableOpacity>
        )}
      </View>

      <FlatList
        data={filteredProperties}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <PropertyCard
            property={item}
            onPress={() => console.log('Navigate to', item.id)}
          />
        )}
        contentContainerStyle={styles.list}
        showsVerticalScrollIndicator={false}
      />
    </SafeAreaView>
  );
};

const FilterPanel: React.FC<{
  filters: SearchFilters;
  onUpdateFilter: <K extends keyof SearchFilters>(key: K, value: SearchFilters[K]) => void;
  onClear: () => void;
}> = ({ filters, onUpdateFilter, onClear }) => (
  <View style={styles.filterPanel}>
    <View style={styles.filterHeader}>
      <Text style={styles.filterTitle}>Filters</Text>
      <TouchableOpacity onPress={onClear}>
        <Text style={styles.clearButton}>Clear</Text>
      </TouchableOpacity>
    </View>

    <FilterSection title="Price Range">
      <View style={styles.priceInputs}>
        <PriceInput
          label="Min"
          value={filters.minPrice}
          onChangeValue={val => onUpdateFilter('minPrice', val)}
        />
        <Text style={styles.priceSeparator}>-</Text>
        <PriceInput
          label="Max"
          value={filters.maxPrice}
          onChangeValue={val => onUpdateFilter('maxPrice', val)}
        />
      </View>
    </FilterSection>

    <FilterSection title="Bedrooms">
      <View style={styles.bedOptions}>
        {[1, 2, 3, 4, 5].map(num => (
          <TouchableOpacity
            key={num}
            style={[
              styles.bedOption,
              filters.beds === num && styles.bedOptionActive
            ]}
            onPress={() => onUpdateFilter('beds', filters.beds === num ? null : num)}
          >
            <Text style={[
              styles.bedOptionText,
              filters.beds === num && styles.bedOptionTextActive
            ]}>
              {num}+
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    </FilterSection>

    <FilterSection title="Property Type">
      <View style={styles.typeOptions}>
        {['Apartment', 'House', 'Villa', 'Studio', 'Room'].map(type => (
          <TouchableOpacity
            key={type}
            style={[
              styles.typeOption,
              filters.propertyType === type && styles.typeOptionActive
            ]}
            onPress={() => onUpdateFilter('propertyType', filters.propertyType === type ? null : type)}
          >
            <Text style={[
              styles.typeOptionText,
              filters.propertyType === type && styles.typeOptionTextActive
            ]}>
              {type}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    </FilterSection>
  </View>
);

const FilterSection: React.FC<{ title: string; children: React.ReactNode }> = ({
  title,
  children
}) => (
  <View style={styles.filterSection}>
    <Text style={styles.filterSectionTitle}>{title}</Text>
    {children}
  </View>
);

const PriceInput: React.FC<{
  label: string;
  value: number;
  onChangeValue: (value: number) => void;
}> = ({ label, value, onChangeValue }) => (
  <View style={styles.priceInputContainer}>
    <Text style={styles.priceLabel}>{label}</Text>
    <TextInput
      style={styles.priceInput}
      value={value.toString()}
      onChangeText={text => onChangeValue(parseInt(text) || 0)}
      keyboardType="numeric"
      placeholder="0"
    />
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8FAFC'
  },
  searchSection: {
    flexDirection: 'row',
    padding: 16,
    gap: 12
  },
  searchBar: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    paddingHorizontal: 16,
    borderWidth: 1,
    borderColor: '#E2E8F0'
  },
  searchIcon: {
    fontSize: 16,
    marginRight: 8
  },
  searchInput: {
    flex: 1,
    paddingVertical: 12,
    fontSize: 14,
    color: '#0F172A'
  },
  filterButton: {
    width: 48,
    height: 48,
    borderRadius: 12,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E2E8F0',
    position: 'relative'
  },
  filterIcon: {
    fontSize: 20
  },
  filterBadge: {
    position: 'absolute',
    top: -4,
    right: -4,
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: '#EF4444',
    justifyContent: 'center',
    alignItems: 'center'
  },
  filterBadgeText: {
    color: '#FFFFFF',
    fontSize: 10,
    fontWeight: '700'
  },
  filterPanel: {
    backgroundColor: '#FFFFFF',
    marginHorizontal: 16,
    marginBottom: 16,
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: '#E2E8F0'
  },
  filterHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16
  },
  filterTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#0F172A'
  },
  clearButton: {
    fontSize: 14,
    color: '#EF4444',
    fontWeight: '600'
  },
  filterSection: {
    marginBottom: 20
  },
  filterSectionTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#64748B',
    marginBottom: 12,
    textTransform: 'uppercase',
    letterSpacing: 0.5
  },
  priceInputs: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12
  },
  priceInputContainer: {
    flex: 1
  },
  priceLabel: {
    fontSize: 12,
    color: '#64748B',
    marginBottom: 8
  },
  priceInput: {
    backgroundColor: '#F8FAFC',
    borderWidth: 1,
    borderColor: '#E2E8F0',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    fontSize: 14
  },
  priceSeparator: {
    fontSize: 18,
    color: '#94A3B8',
    paddingTop: 20
  },
  bedOptions: {
    flexDirection: 'row',
    gap: 8
  },
  bedOption: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 8,
    backgroundColor: '#F8FAFC',
    borderWidth: 1,
    borderColor: '#E2E8F0',
    alignItems: 'center'
  },
  bedOptionActive: {
    backgroundColor: '#EF4444',
    borderColor: '#EF4444'
  },
  bedOptionText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#64748B'
  },
  bedOptionTextActive: {
    color: '#FFFFFF'
  },
  typeOptions: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8
  },
  typeOption: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
    backgroundColor: '#F8FAFC',
    borderWidth: 1,
    borderColor: '#E2E8F0'
  },
  typeOptionActive: {
    backgroundColor: '#EF4444',
    borderColor: '#EF4444'
  },
  typeOptionText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#64748B'
  },
  typeOptionTextActive: {
    color: '#FFFFFF'
  },
  resultHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 8
  },
  resultCount: {
    fontSize: 14,
    color: '#64748B'
  },
  clearFilters: {
    fontSize: 14,
    color: '#EF4444',
    fontWeight: '600'
  },
  list: {
    padding: 16,
    gap: 16
  }
});
