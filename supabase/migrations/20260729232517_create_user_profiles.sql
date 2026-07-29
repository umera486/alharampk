
/*
# Create user_profiles table

1. New Tables
   - `user_profiles` — one row per auth user, created on sign-up
     - `id` (uuid, PK, FK → auth.users)
     - `full_name` (text)
     - `account_type` ('retail' | 'trade', default 'retail')
     - `created_at` (timestamptz)

2. Security
   - RLS enabled
   - Authenticated users can select/update only their own row
   - Insert allowed for authenticated users (row must match their uid)
*/

CREATE TABLE IF NOT EXISTS user_profiles (
  id            uuid PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  full_name     text,
  account_type  text NOT NULL DEFAULT 'retail' CHECK (account_type IN ('retail', 'trade')),
  created_at    timestamptz DEFAULT now()
);

ALTER TABLE user_profiles ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "profiles_select_own" ON user_profiles;
CREATE POLICY "profiles_select_own" ON user_profiles
  FOR SELECT TO authenticated USING (auth.uid() = id);

DROP POLICY IF EXISTS "profiles_insert_own" ON user_profiles;
CREATE POLICY "profiles_insert_own" ON user_profiles
  FOR INSERT TO authenticated WITH CHECK (auth.uid() = id);

DROP POLICY IF EXISTS "profiles_update_own" ON user_profiles;
CREATE POLICY "profiles_update_own" ON user_profiles
  FOR UPDATE TO authenticated USING (auth.uid() = id) WITH CHECK (auth.uid() = id);
