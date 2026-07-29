// Compatibilidade com as páginas existentes. Edite somente campus-config.js.
const campus = window.CAMPUS_CONFIG || {};
window.SUPABASE_CONFIG = window.SUPABASE_CONFIG || {
  url: campus.supabaseUrl || "",
  anonKey: campus.supabaseAnonKey || "",
  turnstileSiteKey: campus.turnstileSiteKey || ""
};
