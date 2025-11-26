-- Rentify Database Schema for Supabase (PostgreSQL)
-- This schema defines all tables, indexes, and constraints for the Rentify application

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Users table
CREATE TABLE IF NOT EXISTS users (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) UNIQUE NOT NULL,
  password VARCHAR(255),
  role VARCHAR(50) DEFAULT 'user' CHECK (role IN ('user', 'host', 'admin')),
  avatar TEXT,
  verified BOOLEAN DEFAULT false,
  trust_score DECIMAL(3, 2) DEFAULT 0.00 CHECK (trust_score >= 0 AND trust_score <= 5),
  phone VARCHAR(20),
  bio TEXT,
  last_login TIMESTAMP WITH TIME ZONE,
  response_time INTEGER DEFAULT 0, -- in minutes
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Properties table
CREATE TABLE IF NOT EXISTS properties (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  host_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  title VARCHAR(255) NOT NULL,
  description TEXT NOT NULL,
  type VARCHAR(50) NOT NULL CHECK (type IN ('apartment', 'house', 'condo', 'villa', 'studio')),
  price DECIMAL(10, 2) NOT NULL CHECK (price >= 0),
  bedrooms INTEGER NOT NULL CHECK (bedrooms >= 0),
  bathrooms INTEGER NOT NULL CHECK (bathrooms >= 0),
  location VARCHAR(255) NOT NULL,
  address TEXT NOT NULL,
  latitude DECIMAL(10, 8),
  longitude DECIMAL(11, 8),
  image TEXT, -- Primary image
  images TEXT[], -- Array of image URLs
  amenities TEXT[] DEFAULT '{}', -- Array of amenities (wifi, parking, pool, etc.)
  status VARCHAR(50) DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'rejected')),
  rejection_reason TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Bookings table
CREATE TABLE IF NOT EXISTS bookings (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  property_id UUID NOT NULL REFERENCES properties(id) ON DELETE CASCADE,
  check_in DATE NOT NULL,
  check_out DATE NOT NULL,
  guests INTEGER NOT NULL CHECK (guests > 0),
  total_price DECIMAL(10, 2) NOT NULL CHECK (total_price >= 0),
  status VARCHAR(50) DEFAULT 'pending' CHECK (status IN ('pending', 'confirmed', 'cancelled', 'completed')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT check_dates CHECK (check_out > check_in)
);

-- Reviews table
CREATE TABLE IF NOT EXISTS reviews (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  property_id UUID NOT NULL REFERENCES properties(id) ON DELETE CASCADE,
  host_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  rating INTEGER NOT NULL CHECK (rating >= 1 AND rating <= 5),
  comment TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  UNIQUE(user_id, property_id) -- User can only review a property once
);

-- Messages table
CREATE TABLE IF NOT EXISTS messages (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  sender_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  receiver_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  property_id UUID REFERENCES properties(id) ON DELETE CASCADE,
  content TEXT NOT NULL,
  read BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Saved/Liked Properties table
CREATE TABLE IF NOT EXISTS saved_properties (
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  property_id UUID NOT NULL REFERENCES properties(id) ON DELETE CASCADE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (user_id, property_id)
);

-- Indexes for better query performance
CREATE INDEX IF NOT EXISTS idx_properties_host_id ON properties(host_id);
CREATE INDEX IF NOT EXISTS idx_properties_status ON properties(status);
CREATE INDEX IF NOT EXISTS idx_properties_type ON properties(type);
CREATE INDEX IF NOT EXISTS idx_properties_location ON properties(location);
CREATE INDEX IF NOT EXISTS idx_properties_price ON properties(price);
CREATE INDEX IF NOT EXISTS idx_properties_created_at ON properties(created_at DESC);

CREATE INDEX IF NOT EXISTS idx_bookings_user_id ON bookings(user_id);
CREATE INDEX IF NOT EXISTS idx_bookings_property_id ON bookings(property_id);
CREATE INDEX IF NOT EXISTS idx_bookings_status ON bookings(status);
CREATE INDEX IF NOT EXISTS idx_bookings_dates ON bookings(check_in, check_out);

CREATE INDEX IF NOT EXISTS idx_reviews_property_id ON reviews(property_id);
CREATE INDEX IF NOT EXISTS idx_reviews_host_id ON reviews(host_id);
CREATE INDEX IF NOT EXISTS idx_reviews_user_id ON reviews(user_id);

CREATE INDEX IF NOT EXISTS idx_messages_sender_id ON messages(sender_id);
CREATE INDEX IF NOT EXISTS idx_messages_receiver_id ON messages(receiver_id);
CREATE INDEX IF NOT EXISTS idx_messages_property_id ON messages(property_id);
CREATE INDEX IF NOT EXISTS idx_messages_created_at ON messages(created_at DESC);

CREATE INDEX IF NOT EXISTS idx_users_email ON users(email);
CREATE INDEX IF NOT EXISTS idx_users_verified ON users(verified);
CREATE INDEX IF NOT EXISTS idx_users_role ON users(role);

-- Function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = CURRENT_TIMESTAMP;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Triggers to auto-update updated_at
CREATE TRIGGER update_users_updated_at
  BEFORE UPDATE ON users
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_properties_updated_at
  BEFORE UPDATE ON properties
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_bookings_updated_at
  BEFORE UPDATE ON bookings
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- Row Level Security (RLS) Policies
-- Enable RLS on all tables
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE properties ENABLE ROW LEVEL SECURITY;
ALTER TABLE bookings ENABLE ROW LEVEL SECURITY;
ALTER TABLE reviews ENABLE ROW LEVEL SECURITY;
ALTER TABLE messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE saved_properties ENABLE ROW LEVEL SECURITY;

-- Users policies
CREATE POLICY "Users can view all users" ON users
  FOR SELECT USING (true);

CREATE POLICY "Users can update own profile" ON users
  FOR UPDATE USING (auth.uid() = id);

-- Properties policies
CREATE POLICY "Anyone can view approved properties" ON properties
  FOR SELECT USING (status = 'approved' OR host_id = auth.uid());

CREATE POLICY "Hosts can insert properties" ON properties
  FOR INSERT WITH CHECK (auth.uid() = host_id);

CREATE POLICY "Hosts can update own properties" ON properties
  FOR UPDATE USING (auth.uid() = host_id);

CREATE POLICY "Hosts can delete own properties" ON properties
  FOR DELETE USING (auth.uid() = host_id);

-- Bookings policies
CREATE POLICY "Users can view own bookings" ON bookings
  FOR SELECT USING (
    auth.uid() = user_id OR
    auth.uid() IN (SELECT host_id FROM properties WHERE id = property_id)
  );

CREATE POLICY "Users can create bookings" ON bookings
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own bookings" ON bookings
  FOR UPDATE USING (auth.uid() = user_id);

-- Reviews policies
CREATE POLICY "Anyone can view reviews" ON reviews
  FOR SELECT USING (true);

CREATE POLICY "Users can create reviews" ON reviews
  FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Messages policies
CREATE POLICY "Users can view own messages" ON messages
  FOR SELECT USING (auth.uid() = sender_id OR auth.uid() = receiver_id);

CREATE POLICY "Users can send messages" ON messages
  FOR INSERT WITH CHECK (auth.uid() = sender_id);

CREATE POLICY "Users can update own received messages" ON messages
  FOR UPDATE USING (auth.uid() = receiver_id);

-- Saved properties policies
CREATE POLICY "Users can view own saved properties" ON saved_properties
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can save properties" ON saved_properties
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can unsave properties" ON saved_properties
  FOR DELETE USING (auth.uid() = user_id);
