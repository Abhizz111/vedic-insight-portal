
-- Create function to handle guest report creation
CREATE OR REPLACE FUNCTION public.create_guest_report(
  p_user_id UUID DEFAULT NULL,
  p_full_name TEXT,
  p_email TEXT,
  p_phone TEXT,
  p_date_of_birth DATE,
  p_amount DECIMAL DEFAULT 199.00
)
RETURNS UUID
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
  report_id UUID;
BEGIN
  INSERT INTO public.numerology_reports (
    user_id,
    full_name,
    email,
    phone,
    date_of_birth,
    payment_status,
    amount
  ) VALUES (
    p_user_id,
    p_full_name,
    p_email,
    p_phone,
    p_date_of_birth,
    'pending',
    p_amount
  ) RETURNING id INTO report_id;
  
  RETURN report_id;
END;
$$;

-- Create function to handle guest order creation
CREATE OR REPLACE FUNCTION public.create_guest_order(
  p_user_id UUID DEFAULT NULL,
  p_report_id UUID,
  p_customer_name TEXT,
  p_customer_email TEXT,
  p_customer_phone TEXT,
  p_amount DECIMAL DEFAULT 199.00,
  p_payment_id TEXT DEFAULT NULL
)
RETURNS UUID
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
  order_id UUID;
BEGIN
  INSERT INTO public.orders (
    user_id,
    report_id,
    customer_name,
    customer_email,
    customer_phone,
    amount,
    payment_id,
    payment_status
  ) VALUES (
    p_user_id,
    p_report_id,
    p_customer_name,
    p_customer_email,
    p_customer_phone,
    p_amount,
    p_payment_id,
    'completed'
  ) RETURNING id INTO order_id;
  
  RETURN order_id;
END;
$$;

-- Add gender column to numerology_reports table
ALTER TABLE public.numerology_reports ADD COLUMN IF NOT EXISTS gender TEXT;
