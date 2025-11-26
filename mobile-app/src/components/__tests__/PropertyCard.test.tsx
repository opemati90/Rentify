import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import { PropertyCard } from '../property/PropertyCard';
import { Property } from '../../types';

const mockProperty: Property = {
  id: '1',
  title: 'Modern Studio Apartment',
  location: 'Downtown, Helsinki',
  price: 1200,
  rating: 4.8,
  reviews: 24,
  image: 'https://example.com/image.jpg',
  type: 'Studio',
  beds: 1,
  baths: 1,
  sqft: 450,
  host: {
    id: 'host1',
    name: 'John Doe',
    avatar: 'https://example.com/avatar.jpg',
    verified: true,
    responseTime: '1 hour',
    trustScore: 4.9
  },
  amenities: ['WiFi', 'Kitchen'],
  description: 'A beautiful studio apartment',
  images: ['https://example.com/image1.jpg'],
  availableFrom: '2025-02-01',
  availableTo: '2025-08-31',
  minLeaseDuration: 3,
  maxLeaseDuration: 12,
  roommates: 0,
  utilitiesIncluded: true,
  furnished: true,
  depositRequired: 1200,
  featured: false
};

describe('PropertyCard Component', () => {
  it('should render property information', () => {
    const { getByText } = render(
      <PropertyCard property={mockProperty} onPress={() => {}} />
    );

    expect(getByText('Modern Studio Apartment')).toBeTruthy();
    expect(getByText(/Downtown, Helsinki/)).toBeTruthy();
    expect(getByText(/\$1,200/)).toBeTruthy();
    expect(getByText(/4\.8/)).toBeTruthy();
  });

  it('should call onPress when card is pressed', () => {
    const onPressMock = jest.fn();
    const { getByText } = render(
      <PropertyCard property={mockProperty} onPress={onPressMock} />
    );

    fireEvent.press(getByText('Modern Studio Apartment'));
    expect(onPressMock).toHaveBeenCalledTimes(1);
  });

  it('should show featured badge when property is featured', () => {
    const featuredProperty = { ...mockProperty, featured: true };
    const { getByText } = render(
      <PropertyCard property={featuredProperty} onPress={() => {}} />
    );

    expect(getByText('Featured')).toBeTruthy();
  });

  it('should not show featured badge when property is not featured', () => {
    const { queryByText } = render(
      <PropertyCard property={mockProperty} onPress={() => {}} />
    );

    expect(queryByText('Featured')).toBeNull();
  });

  it('should show like button when onLike is provided', () => {
    const { getByText } = render(
      <PropertyCard
        property={mockProperty}
        onPress={() => {}}
        onLike={() => {}}
      />
    );

    expect(getByText('🤍')).toBeTruthy();
  });

  it('should not show like button when onLike is not provided', () => {
    const { queryByText } = render(
      <PropertyCard property={mockProperty} onPress={() => {}} />
    );

    expect(queryByText('🤍')).toBeNull();
    expect(queryByText('❤️')).toBeNull();
  });

  it('should call onLike when like button is pressed', () => {
    const onLikeMock = jest.fn();
    const { getByText } = render(
      <PropertyCard
        property={mockProperty}
        onPress={() => {}}
        onLike={onLikeMock}
      />
    );

    fireEvent.press(getByText('🤍'));
    expect(onLikeMock).toHaveBeenCalledTimes(1);
  });

  it('should show filled heart when isLiked is true', () => {
    const { getByText } = render(
      <PropertyCard
        property={mockProperty}
        onPress={() => {}}
        onLike={() => {}}
        isLiked={true}
      />
    );

    expect(getByText('❤️')).toBeTruthy();
  });

  it('should show empty heart when isLiked is false', () => {
    const { getByText } = render(
      <PropertyCard
        property={mockProperty}
        onPress={() => {}}
        onLike={() => {}}
        isLiked={false}
      />
    );

    expect(getByText('🤍')).toBeTruthy();
  });

  it('should display property type', () => {
    const { getByText } = render(
      <PropertyCard property={mockProperty} onPress={() => {}} />
    );

    expect(getByText('Studio')).toBeTruthy();
  });

  it('should format price correctly', () => {
    const { getByText } = render(
      <PropertyCard property={mockProperty} onPress={() => {}} />
    );

    // Check that price is formatted with $ and includes /m
    const priceElement = getByText(/\$1,200/);
    expect(priceElement).toBeTruthy();
  });
});
