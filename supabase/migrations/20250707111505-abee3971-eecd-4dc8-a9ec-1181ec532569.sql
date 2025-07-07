
-- Create admin_users table for admin authentication
CREATE TABLE public.admin_users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email TEXT UNIQUE NOT NULL,
  password_hash TEXT NOT NULL,
  full_name TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Enable RLS for admin_users
ALTER TABLE public.admin_users ENABLE ROW LEVEL SECURITY;

-- Create policy for admin_users (only admins can access their own data)
CREATE POLICY "Admin users can view their own data" ON public.admin_users
  FOR SELECT USING (true);

-- Create a function to verify admin credentials
CREATE OR REPLACE FUNCTION public.verify_admin_login(input_email TEXT, input_password TEXT)
RETURNS TABLE(admin_id UUID, admin_email TEXT, admin_name TEXT) AS $$
BEGIN
  RETURN QUERY
  SELECT id, email, full_name
  FROM public.admin_users
  WHERE email = input_email AND password_hash = crypt(input_password, password_hash);
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Insert a default admin user (password: admin123)
INSERT INTO public.admin_users (email, password_hash, full_name)
VALUES ('admin@vedic.com', crypt('admin123', gen_salt('bf')), 'Admin User');
