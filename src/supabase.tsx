import { createClient } from '@supabase/supabase-js'

const supabaseUrl = "https://ejvptagpazmojxlvmjqa.supabase.co"
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVqdnB0YWdwYXptb2p4bHZtanFhIiwicm9sZSI6ImFub24iLCJpYXQiOjE2ODE0MDY5MjIsImV4cCI6MTk5Njk4MjkyMn0.0nFGE0d_fZhmG4fwMs2k9UoLd5ySAPpZI55ZWPDd1Dc"
const supabase = createClient(supabaseUrl, supabaseKey)

export default supabase