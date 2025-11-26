import React, { useState } from 'react';
import { View, Text, ScrollView, StyleSheet, SafeAreaView, TouchableOpacity } from 'react-native';
import { Button, Input } from '../../components/common';
import { isValidPrice, hasMinLength } from '@rentify/shared/utils';

interface ListingFormData {
  title: string;
  description: string;
  price: string;
  type: string;
  beds: string;
  baths: string;
  sqft: string;
  location: string;
  amenities: string[];
}

const INITIAL_FORM_DATA: ListingFormData = {
  title: '',
  description: '',
  price: '',
  type: 'Apartment',
  beds: '1',
  baths: '1',
  sqft: '',
  location: '',
  amenities: []
};

const PROPERTY_TYPES = ['Apartment', 'House', 'Villa', 'Studio', 'Room', 'Duplex'];
const AMENITIES = ['Wifi', 'Kitchen', 'Parking', 'Gym', 'Pool', 'Workspace', 'AC', 'Heater', 'Laundry'];

export const CreateListingScreen: React.FC = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState(INITIAL_FORM_DATA);
  const [errors, setErrors] = useState<Partial<ListingFormData>>({});

  const updateField = <K extends keyof ListingFormData>(
    field: K,
    value: ListingFormData[K]
  ) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    setErrors(prev => ({ ...prev, [field]: '' }));
  };

  const toggleAmenity = (amenity: string) => {
    const amenities = formData.amenities.includes(amenity)
      ? formData.amenities.filter(a => a !== amenity)
      : [...formData.amenities, amenity];
    updateField('amenities', amenities);
  };

  const validateStep = (): boolean => {
    const newErrors: Partial<ListingFormData> = {};

    if (step === 1) {
      if (!hasMinLength(formData.title, 5)) {
        newErrors.title = 'Title must be at least 5 characters';
      }
      if (!formData.location) {
        newErrors.location = 'Location is required';
      }
      if (!isValidPrice(parseFloat(formData.price))) {
        newErrors.price = 'Please enter a valid price';
      }
    }

    if (step === 2) {
      if (!hasMinLength(formData.description, 20)) {
        newErrors.description = 'Description must be at least 20 characters';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validateStep()) {
      if (step < 3) {
        setStep(step + 1);
      } else {
        handleSubmit();
      }
    }
  };

  const handleBack = () => {
    if (step > 1) {
      setStep(step - 1);
    }
  };

  const handleSubmit = () => {
    console.log('Submitting listing:', formData);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={handleBack} style={styles.backButton}>
          <Text style={styles.backIcon}>←</Text>
        </TouchableOpacity>
        <ProgressIndicator current={step} total={3} />
        <View style={styles.placeholder} />
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {step === 1 && (
          <StepOne
            formData={formData}
            errors={errors}
            onUpdateField={updateField}
          />
        )}
        {step === 2 && (
          <StepTwo
            formData={formData}
            errors={errors}
            onUpdateField={updateField}
            onToggleAmenity={toggleAmenity}
          />
        )}
        {step === 3 && (
          <StepThree
            formData={formData}
            errors={errors}
            onUpdateField={updateField}
          />
        )}
      </ScrollView>

      <View style={styles.footer}>
        <Button
          title={step === 3 ? 'Publish Listing' : 'Next'}
          onPress={handleNext}
          fullWidth
        />
      </View>
    </SafeAreaView>
  );
};

const ProgressIndicator: React.FC<{ current: number; total: number }> = ({
  current,
  total
}) => (
  <View style={styles.progressContainer}>
    {Array.from({ length: total }, (_, i) => (
      <View
        key={i}
        style={[
          styles.progressDot,
          i + 1 <= current && styles.progressDotActive
        ]}
      />
    ))}
  </View>
);

const StepOne: React.FC<{
  formData: ListingFormData;
  errors: Partial<ListingFormData>;
  onUpdateField: <K extends keyof ListingFormData>(field: K, value: ListingFormData[K]) => void;
}> = ({ formData, errors, onUpdateField }) => (
  <View>
    <Text style={styles.stepTitle}>Basic Information</Text>
    <Text style={styles.stepSubtitle}>Tell us about your property</Text>

    <Input
      label="Property Title"
      value={formData.title}
      onChangeText={val => onUpdateField('title', val)}
      placeholder="e.g. Cozy Downtown Apartment"
      error={errors.title}
    />

    <Input
      label="Location"
      value={formData.location}
      onChangeText={val => onUpdateField('location', val)}
      placeholder="e.g. Helsinki, Finland"
      error={errors.location}
    />

    <SectionLabel title="Property Type" />
    <View style={styles.typeGrid}>
      {PROPERTY_TYPES.map(type => (
        <TouchableOpacity
          key={type}
          style={[
            styles.typeOption,
            formData.type === type && styles.typeOptionActive
          ]}
          onPress={() => onUpdateField('type', type)}
        >
          <Text style={[
            styles.typeText,
            formData.type === type && styles.typeTextActive
          ]}>
            {type}
          </Text>
        </TouchableOpacity>
      ))}
    </View>

    <Input
      label="Monthly Rent ($)"
      value={formData.price}
      onChangeText={val => onUpdateField('price', val)}
      placeholder="1200"
      keyboardType="numeric"
      error={errors.price}
    />

    <View style={styles.row}>
      <View style={styles.halfWidth}>
        <Input
          label="Bedrooms"
          value={formData.beds}
          onChangeText={val => onUpdateField('beds', val)}
          keyboardType="numeric"
        />
      </View>
      <View style={styles.halfWidth}>
        <Input
          label="Bathrooms"
          value={formData.baths}
          onChangeText={val => onUpdateField('baths', val)}
          keyboardType="numeric"
        />
      </View>
    </View>

    <Input
      label="Square Feet"
      value={formData.sqft}
      onChangeText={val => onUpdateField('sqft', val)}
      placeholder="800"
      keyboardType="numeric"
    />
  </View>
);

const StepTwo: React.FC<{
  formData: ListingFormData;
  errors: Partial<ListingFormData>;
  onUpdateField: <K extends keyof ListingFormData>(field: K, value: ListingFormData[K]) => void;
  onToggleAmenity: (amenity: string) => void;
}> = ({ formData, errors, onUpdateField, onToggleAmenity }) => (
  <View>
    <Text style={styles.stepTitle}>Amenities & Description</Text>
    <Text style={styles.stepSubtitle}>What makes your property special?</Text>

    <SectionLabel title="Select Amenities" />
    <View style={styles.amenitiesGrid}>
      {AMENITIES.map(amenity => (
        <TouchableOpacity
          key={amenity}
          style={[
            styles.amenityChip,
            formData.amenities.includes(amenity) && styles.amenityChipActive
          ]}
          onPress={() => onToggleAmenity(amenity)}
        >
          <View style={[
            styles.checkbox,
            formData.amenities.includes(amenity) && styles.checkboxActive
          ]}>
            {formData.amenities.includes(amenity) && (
              <Text style={styles.checkmark}>✓</Text>
            )}
          </View>
          <Text style={styles.amenityText}>{amenity}</Text>
        </TouchableOpacity>
      ))}
    </View>

    <Input
      label="Description"
      value={formData.description}
      onChangeText={val => onUpdateField('description', val)}
      placeholder="Describe your property..."
      multiline
      error={errors.description}
    />
  </View>
);

const StepThree: React.FC<{
  formData: ListingFormData;
  errors: Partial<ListingFormData>;
  onUpdateField: <K extends keyof ListingFormData>(field: K, value: ListingFormData[K]) => void;
}> = ({ formData }) => (
  <View>
    <Text style={styles.stepTitle}>Review & Publish</Text>
    <Text style={styles.stepSubtitle}>Double-check your listing</Text>

    <View style={styles.reviewCard}>
      <ReviewRow label="Title" value={formData.title} />
      <ReviewRow label="Location" value={formData.location} />
      <ReviewRow label="Type" value={formData.type} />
      <ReviewRow label="Price" value={`$${formData.price}/month`} />
      <ReviewRow label="Bedrooms" value={formData.beds} />
      <ReviewRow label="Bathrooms" value={formData.baths} />
      <ReviewRow label="Square Feet" value={formData.sqft} />
      <ReviewRow label="Amenities" value={formData.amenities.join(', ')} />
    </View>

    <View style={styles.notice}>
      <Text style={styles.noticeIcon}>ℹ️</Text>
      <Text style={styles.noticeText}>
        Your listing will be reviewed within 24 hours before going live.
      </Text>
    </View>
  </View>
);

const SectionLabel: React.FC<{ title: string }> = ({ title }) => (
  <Text style={styles.sectionLabel}>{title}</Text>
);

const ReviewRow: React.FC<{ label: string; value: string }> = ({ label, value }) => (
  <View style={styles.reviewRow}>
    <Text style={styles.reviewLabel}>{label}</Text>
    <Text style={styles.reviewValue}>{value}</Text>
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF'
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
    borderBottomWidth: 1,
    borderColor: '#E2E8F0'
  },
  backButton: {
    width: 40,
    height: 40,
    justifyContent: 'center'
  },
  backIcon: {
    fontSize: 24,
    color: '#64748B'
  },
  placeholder: {
    width: 40
  },
  progressContainer: {
    flexDirection: 'row',
    gap: 8
  },
  progressDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#E2E8F0'
  },
  progressDotActive: {
    width: 24,
    backgroundColor: '#EF4444'
  },
  content: {
    flex: 1,
    padding: 24
  },
  stepTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: '#0F172A',
    marginBottom: 8
  },
  stepSubtitle: {
    fontSize: 14,
    color: '#64748B',
    marginBottom: 32
  },
  sectionLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: '#64748B',
    marginBottom: 12,
    textTransform: 'uppercase'
  },
  typeGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
    marginBottom: 24
  },
  typeOption: {
    flex: 1,
    minWidth: '30%',
    paddingVertical: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    alignItems: 'center'
  },
  typeOptionActive: {
    backgroundColor: '#EF4444',
    borderColor: '#EF4444'
  },
  typeText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#64748B'
  },
  typeTextActive: {
    color: '#FFFFFF'
  },
  row: {
    flexDirection: 'row',
    gap: 16
  },
  halfWidth: {
    flex: 1
  },
  amenitiesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
    marginBottom: 24
  },
  amenityChip: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#E2E8F0'
  },
  amenityChipActive: {
    backgroundColor: '#F0FDF4',
    borderColor: '#10B981'
  },
  checkbox: {
    width: 20,
    height: 20,
    borderRadius: 4,
    borderWidth: 2,
    borderColor: '#E2E8F0',
    justifyContent: 'center',
    alignItems: 'center'
  },
  checkboxActive: {
    backgroundColor: '#10B981',
    borderColor: '#10B981'
  },
  checkmark: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '700'
  },
  amenityText: {
    fontSize: 14,
    color: '#0F172A'
  },
  reviewCard: {
    backgroundColor: '#F8FAFC',
    borderRadius: 12,
    padding: 16,
    marginBottom: 24
  },
  reviewRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderColor: '#E2E8F0'
  },
  reviewLabel: {
    fontSize: 14,
    color: '#64748B',
    fontWeight: '600'
  },
  reviewValue: {
    fontSize: 14,
    color: '#0F172A',
    flex: 1,
    textAlign: 'right'
  },
  notice: {
    flexDirection: 'row',
    gap: 12,
    padding: 16,
    backgroundColor: '#F0F9FF',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#BAE6FD'
  },
  noticeIcon: {
    fontSize: 20
  },
  noticeText: {
    flex: 1,
    fontSize: 12,
    color: '#0C4A6E',
    lineHeight: 18
  },
  footer: {
    padding: 24,
    borderTopWidth: 1,
    borderColor: '#E2E8F0'
  }
});
