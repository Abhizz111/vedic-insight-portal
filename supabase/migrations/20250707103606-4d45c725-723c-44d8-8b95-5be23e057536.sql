
-- Create profiles table for additional user information
CREATE TABLE public.profiles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  full_name TEXT NOT NULL,
  phone TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  UNIQUE(user_id)
);

-- Create numerology_reports table
CREATE TABLE public.numerology_reports (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  full_name TEXT NOT NULL,
  date_of_birth DATE NOT NULL,
  phone TEXT NOT NULL,
  email TEXT NOT NULL,
  life_path_number INTEGER,
  destiny_number INTEGER,
  soul_urge_number INTEGER,
  personality_number INTEGER,
  report_pdf_url TEXT,
  payment_status TEXT DEFAULT 'pending' CHECK (payment_status IN ('pending', 'completed', 'failed')),
  payment_id TEXT,
  amount DECIMAL(10,2),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Create payment_history table
CREATE TABLE public.payment_history (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  report_id UUID REFERENCES public.numerology_reports(id) ON DELETE CASCADE,
  payment_id TEXT NOT NULL,
  amount DECIMAL(10,2) NOT NULL,
  currency TEXT DEFAULT 'INR',
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'completed', 'failed', 'refunded')),
  payment_gateway TEXT DEFAULT 'razorpay',
  gateway_response JSONB,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.numerology_reports ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.payment_history ENABLE ROW LEVEL SECURITY;

-- RLS Policies for profiles
CREATE POLICY "Users can view their own profile" ON public.profiles
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own profile" ON public.profiles
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own profile" ON public.profiles
  FOR UPDATE USING (auth.uid() = user_id);

-- RLS Policies for numerology_reports
CREATE POLICY "Users can view their own reports" ON public.numerology_reports
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own reports" ON public.numerology_reports
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own reports" ON public.numerology_reports
  FOR UPDATE USING (auth.uid() = user_id);

-- RLS Policies for payment_history
CREATE POLICY "Users can view their own payment history" ON public.payment_history
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own payment history" ON public.payment_history
  FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Function to automatically create profile when user signs up
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (user_id, full_name)
  VALUES (NEW.id, COALESCE(NEW.raw_user_meta_data->>'full_name', ''));
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger to create profile on user signup
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Function to calculate numerology numbers (basic implementation)
CREATE OR REPLACE FUNCTION public.calculate_life_path_number(birth_date DATE)
RETURNS INTEGER AS $$
DECLARE
  day_sum INTEGER;
  month_sum INTEGER;
  year_sum INTEGER;
  total_sum INTEGER;
  result INTEGER;
BEGIN
  -- Sum digits of day
  day_sum := EXTRACT(DAY FROM birth_date);
  WHILE day_sum >= 10 LOOP
    day_sum := (day_sum / 10)::INTEGER + (day_sum % 10);
  END LOOP;
  
  -- Sum digits of month
  month_sum := EXTRACT(MONTH FROM birth_date);
  WHILE month_sum >= 10 LOOP
    month_sum := (month_sum / 10)::INTEGER + (month_sum % 10);
  END LOOP;
  
  -- Sum digits of year
  year_sum := EXTRACT(YEAR FROM birth_date);
  WHILE year_sum >= 10 LOOP
    year_sum := (year_sum / 10)::INTEGER + (year_sum % 10);
  END LOOP;
  
  -- Calculate total and reduce to single digit
  total_sum := day_sum + month_sum + year_sum;
  WHILE total_sum >= 10 AND total_sum NOT IN (11, 22, 33) LOOP
    total_sum := (total_sum / 10)::INTEGER + (total_sum % 10);
  END LOOP;
  
  RETURN total_sum;
END;
$$ LANGUAGE plpgsql;
