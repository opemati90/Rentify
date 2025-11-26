-- Rentify Database Seed Data
-- This file contains sample data for development and testing

-- Insert admin user (password: admin123)
INSERT INTO users (id, name, email, password, role, verified, trust_score, created_at)
VALUES (
  '00000000-0000-0000-0000-000000000001',
  'Admin User',
  'admin@rentify.com',
  '$2a$10$vI8aWBnW3fID.ZQ4/zo1G.q1lRps.9cGLcZEiGDMVr5yUP1KUOYTa', -- admin123
  'admin',
  true,
  5.00,
  CURRENT_TIMESTAMP
) ON CONFLICT (email) DO NOTHING;

-- Insert sample host users
INSERT INTO users (id, name, email, password, role, verified, trust_score, phone, bio, created_at)
VALUES
  (
    '00000000-0000-0000-0000-000000000002',
    'John Smith',
    'john@example.com',
    '$2a$10$vI8aWBnW3fID.ZQ4/zo1G.q1lRps.9cGLcZEiGDMVr5yUP1KUOYTa', -- password123
    'host',
    true,
    4.80,
    '+1234567890',
    'Experienced host with multiple properties in downtown area. Love meeting new people!',
    CURRENT_TIMESTAMP
  ),
  (
    '00000000-0000-0000-0000-000000000003',
    'Sarah Johnson',
    'sarah@example.com',
    '$2a$10$vI8aWBnW3fID.ZQ4/zo1G.q1lRps.9cGLcZEiGDMVr5yUP1KUOYTa', -- password123
    'host',
    true,
    4.95,
    '+1234567891',
    'Professional property manager with focus on luxury rentals. Available 24/7 for guests.',
    CURRENT_TIMESTAMP
  ),
  (
    '00000000-0000-0000-0000-000000000004',
    'Mike Davis',
    'mike@example.com',
    '$2a$10$vI8aWBnW3fID.ZQ4/zo1G.q1lRps.9cGLcZEiGDMVr5yUP1KUOYTa', -- password123
    'host',
    true,
    4.60,
    '+1234567892',
    'Local host offering cozy apartments near the beach. Quick response time guaranteed!',
    CURRENT_TIMESTAMP
  )
ON CONFLICT (email) DO NOTHING;

-- Insert sample regular users
INSERT INTO users (id, name, email, password, role, verified, created_at)
VALUES
  (
    '00000000-0000-0000-0000-000000000005',
    'Emily Brown',
    'emily@example.com',
    '$2a$10$vI8aWBnW3fID.ZQ4/zo1G.q1lRps.9cGLcZEiGDMVr5yUP1KUOYTa', -- password123
    'user',
    true,
    CURRENT_TIMESTAMP
  ),
  (
    '00000000-0000-0000-0000-000000000006',
    'David Wilson',
    'david@example.com',
    '$2a$10$vI8aWBnW3fID.ZQ4/zo1G.q1lRps.9cGLcZEiGDMVr5yUP1KUOYTa', -- password123
    'user',
    true,
    CURRENT_TIMESTAMP
  )
ON CONFLICT (email) DO NOTHING;

-- Insert sample properties
INSERT INTO properties (id, host_id, title, description, type, price, bedrooms, bathrooms, location, address, latitude, longitude, image, images, amenities, status, created_at)
VALUES
  (
    '10000000-0000-0000-0000-000000000001',
    '00000000-0000-0000-0000-000000000002',
    'Modern Downtown Apartment',
    'Beautiful modern apartment in the heart of downtown. Walking distance to restaurants, shops, and entertainment. Features stunning city views, high-speed WiFi, and luxury amenities.',
    'apartment',
    120.00,
    2,
    2,
    'New York, NY',
    '123 Main St, New York, NY 10001',
    40.7589,
    -73.9851,
    'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267',
    ARRAY['https://images.unsplash.com/photo-1522708323590-d24dbb6b0267', 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688', 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2'],
    ARRAY['wifi', 'parking', 'gym', 'air_conditioning', 'heating', 'kitchen', 'washer', 'dryer'],
    'approved',
    CURRENT_TIMESTAMP
  ),
  (
    '10000000-0000-0000-0000-000000000002',
    '00000000-0000-0000-0000-000000000003',
    'Luxury Beachfront Villa',
    'Exclusive 4-bedroom villa with private beach access. Perfect for families or groups. Includes infinity pool, hot tub, and outdoor entertainment area. Absolutely breathtaking ocean views!',
    'villa',
    450.00,
    4,
    3,
    'Miami, FL',
    '456 Ocean Drive, Miami Beach, FL 33139',
    25.7907,
    -80.1300,
    'https://images.unsplash.com/photo-1564013799919-ab600027ffc6',
    ARRAY['https://images.unsplash.com/photo-1564013799919-ab600027ffc6', 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750', 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9'],
    ARRAY['wifi', 'pool', 'beach_access', 'hot_tub', 'air_conditioning', 'kitchen', 'bbq', 'parking'],
    'approved',
    CURRENT_TIMESTAMP
  ),
  (
    '10000000-0000-0000-0000-000000000003',
    '00000000-0000-0000-0000-000000000002',
    'Cozy Studio in Arts District',
    'Charming studio apartment in the vibrant Arts District. Perfect for solo travelers or couples. Close to galleries, cafes, and public transportation. Recently renovated with modern finishes.',
    'studio',
    75.00,
    0,
    1,
    'Los Angeles, CA',
    '789 Art Street, Los Angeles, CA 90013',
    34.0407,
    -118.2468,
    'https://images.unsplash.com/photo-1536376072261-38c75010e6c9',
    ARRAY['https://images.unsplash.com/photo-1536376072261-38c75010e6c9', 'https://images.unsplash.com/photo-1493809842364-78817add7ffb'],
    ARRAY['wifi', 'air_conditioning', 'heating', 'kitchen'],
    'approved',
    CURRENT_TIMESTAMP
  ),
  (
    '10000000-0000-0000-0000-000000000004',
    '00000000-0000-0000-0000-000000000003',
    'Spacious Family House',
    'Beautiful 3-bedroom house in quiet suburban neighborhood. Large backyard, modern kitchen, and family-friendly amenities. Great schools nearby. Perfect for longer stays.',
    'house',
    200.00,
    3,
    2,
    'Austin, TX',
    '321 Maple Avenue, Austin, TX 78701',
    30.2672,
    -97.7431,
    'https://images.unsplash.com/photo-1570129477492-45c003edd2be',
    ARRAY['https://images.unsplash.com/photo-1570129477492-45c003edd2be', 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c'],
    ARRAY['wifi', 'parking', 'backyard', 'air_conditioning', 'heating', 'kitchen', 'washer', 'dryer'],
    'approved',
    CURRENT_TIMESTAMP
  ),
  (
    '10000000-0000-0000-0000-000000000005',
    '00000000-0000-0000-0000-000000000004',
    'Elegant City Condo',
    'Sophisticated 2-bedroom condo with panoramic city views. Building features concierge, fitness center, and rooftop terrace. Walking distance to major attractions and business district.',
    'condo',
    180.00,
    2,
    2,
    'Chicago, IL',
    '555 Michigan Avenue, Chicago, IL 60611',
    41.8781,
    -87.6298,
    'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00',
    ARRAY['https://images.unsplash.com/photo-1545324418-cc1a3fa10c00', 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c'],
    ARRAY['wifi', 'parking', 'gym', 'concierge', 'air_conditioning', 'heating', 'kitchen'],
    'approved',
    CURRENT_TIMESTAMP
  ),
  (
    '10000000-0000-0000-0000-000000000006',
    '00000000-0000-0000-0000-000000000004',
    'Pending Review Property',
    'New listing awaiting admin approval. Charming cottage in the countryside with beautiful garden.',
    'house',
    95.00,
    1,
    1,
    'Portland, OR',
    '777 Country Lane, Portland, OR 97201',
    45.5152,
    -122.6784,
    'https://images.unsplash.com/photo-1580587771525-78b9dba3b914',
    ARRAY['https://images.unsplash.com/photo-1580587771525-78b9dba3b914'],
    ARRAY['wifi', 'parking', 'garden'],
    'pending',
    CURRENT_TIMESTAMP
  )
ON CONFLICT (id) DO NOTHING;

-- Insert sample reviews
INSERT INTO reviews (user_id, property_id, host_id, rating, comment, created_at)
VALUES
  (
    '00000000-0000-0000-0000-000000000005',
    '10000000-0000-0000-0000-000000000001',
    '00000000-0000-0000-0000-000000000002',
    5,
    'Amazing apartment! The location was perfect and the host was very responsive. Would definitely stay again.',
    CURRENT_TIMESTAMP - INTERVAL '5 days'
  ),
  (
    '00000000-0000-0000-0000-000000000006',
    '10000000-0000-0000-0000-000000000001',
    '00000000-0000-0000-0000-000000000002',
    4,
    'Great place, very clean and comfortable. Only minor issue was street noise at night, but overall excellent stay.',
    CURRENT_TIMESTAMP - INTERVAL '10 days'
  ),
  (
    '00000000-0000-0000-0000-000000000005',
    '10000000-0000-0000-0000-000000000002',
    '00000000-0000-0000-0000-000000000003',
    5,
    'Absolutely stunning villa! The beach access and pool were incredible. Host thought of everything. Perfect vacation!',
    CURRENT_TIMESTAMP - INTERVAL '15 days'
  ),
  (
    '00000000-0000-0000-0000-000000000006',
    '10000000-0000-0000-0000-000000000003',
    '00000000-0000-0000-0000-000000000002',
    5,
    'Perfect studio for my solo trip. Walkable to everything in the Arts District. Host was super helpful with recommendations.',
    CURRENT_TIMESTAMP - INTERVAL '3 days'
  ),
  (
    '00000000-0000-0000-0000-000000000005',
    '10000000-0000-0000-0000-000000000004',
    '00000000-0000-0000-0000-000000000003',
    4,
    'Great house for our family stay. Kids loved the backyard. Very spacious and clean. Would recommend!',
    CURRENT_TIMESTAMP - INTERVAL '7 days'
  )
ON CONFLICT (user_id, property_id) DO NOTHING;

-- Insert sample bookings
INSERT INTO bookings (user_id, property_id, check_in, check_out, guests, total_price, status, created_at)
VALUES
  (
    '00000000-0000-0000-0000-000000000005',
    '10000000-0000-0000-0000-000000000001',
    CURRENT_DATE + INTERVAL '7 days',
    CURRENT_DATE + INTERVAL '10 days',
    2,
    360.00,
    'confirmed',
    CURRENT_TIMESTAMP
  ),
  (
    '00000000-0000-0000-0000-000000000006',
    '10000000-0000-0000-0000-000000000002',
    CURRENT_DATE + INTERVAL '14 days',
    CURRENT_DATE + INTERVAL '21 days',
    4,
    3150.00,
    'confirmed',
    CURRENT_TIMESTAMP
  ),
  (
    '00000000-0000-0000-0000-000000000005',
    '10000000-0000-0000-0000-000000000003',
    CURRENT_DATE - INTERVAL '10 days',
    CURRENT_DATE - INTERVAL '7 days',
    1,
    225.00,
    'completed',
    CURRENT_TIMESTAMP - INTERVAL '15 days'
  )
ON CONFLICT DO NOTHING;

-- Insert sample messages
INSERT INTO messages (sender_id, receiver_id, property_id, content, read, created_at)
VALUES
  (
    '00000000-0000-0000-0000-000000000005',
    '00000000-0000-0000-0000-000000000002',
    '10000000-0000-0000-0000-000000000001',
    'Hi! Is this property available for the dates I selected?',
    true,
    CURRENT_TIMESTAMP - INTERVAL '2 days'
  ),
  (
    '00000000-0000-0000-0000-000000000002',
    '00000000-0000-0000-0000-000000000005',
    '10000000-0000-0000-0000-000000000001',
    'Yes, it is available! Feel free to book. Let me know if you have any questions.',
    true,
    CURRENT_TIMESTAMP - INTERVAL '2 days' + INTERVAL '30 minutes'
  ),
  (
    '00000000-0000-0000-0000-000000000005',
    '00000000-0000-0000-0000-000000000002',
    '10000000-0000-0000-0000-000000000001',
    'Great! Is parking included?',
    true,
    CURRENT_TIMESTAMP - INTERVAL '2 days' + INTERVAL '1 hour'
  ),
  (
    '00000000-0000-0000-0000-000000000002',
    '00000000-0000-0000-0000-000000000005',
    '10000000-0000-0000-0000-000000000001',
    'Yes, one parking spot is included with the rental. See you soon!',
    false,
    CURRENT_TIMESTAMP - INTERVAL '2 days' + INTERVAL '2 hours'
  )
ON CONFLICT DO NOTHING;

-- Insert sample saved properties
INSERT INTO saved_properties (user_id, property_id, created_at)
VALUES
  ('00000000-0000-0000-0000-000000000005', '10000000-0000-0000-0000-000000000002', CURRENT_TIMESTAMP),
  ('00000000-0000-0000-0000-000000000005', '10000000-0000-0000-0000-000000000005', CURRENT_TIMESTAMP),
  ('00000000-0000-0000-0000-000000000006', '10000000-0000-0000-0000-000000000001', CURRENT_TIMESTAMP),
  ('00000000-0000-0000-0000-000000000006', '10000000-0000-0000-0000-000000000004', CURRENT_TIMESTAMP)
ON CONFLICT (user_id, property_id) DO NOTHING;

-- Update trust scores based on reviews
UPDATE users SET trust_score = 4.50 WHERE id = '00000000-0000-0000-0000-000000000002';
UPDATE users SET trust_score = 4.50 WHERE id = '00000000-0000-0000-0000-000000000003';
