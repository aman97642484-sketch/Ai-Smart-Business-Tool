CREATE TABLE public.ai_tool_submissions (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  full_name TEXT NOT NULL,
  email TEXT NOT NULL,
  tool_name TEXT NOT NULL,
  input_data JSONB NOT NULL DEFAULT '{}'::jsonb,
  ai_response TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

ALTER TABLE public.ai_tool_submissions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow anonymous inserts" ON public.ai_tool_submissions
  FOR INSERT TO anon, authenticated
  WITH CHECK (true);

CREATE POLICY "No public reads" ON public.ai_tool_submissions
  FOR SELECT TO anon, authenticated
  USING (false);