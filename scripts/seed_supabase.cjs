const { createClient } = require("@supabase/supabase-js");

const supabaseUrl = process.env.VITE_SUPABASE_URL || "https://xzhlfpvgjmnaribsrytq.supabase.co";
const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!serviceRoleKey) {
  console.log("Note: SUPABASE_SERVICE_ROLE_KEY environment variable required to run manual administrative seed.");
  process.exit(0);
}

const supabase = createClient(supabaseUrl, serviceRoleKey);
console.log("Supabase admin seeder ready.");
