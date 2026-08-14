# Disconnect Lovable Cloud and connect to your own Supabase project

This plan switches the project's backend from Lovable Cloud to your own Supabase project.

## What will happen

1. **Disconnect Lovable Cloud** (you must do this step)
   - A workspace admin goes to **Cloud Tab → Advanced → Disconnect** in the Lovable editor.
   - This is irreversible and deletes all existing Cloud data. The current Cloud database has no public tables, so nothing needs to be migrated.
2. **Provide your Supabase project credentials**
   - Supabase project URL
   - Supabase publishable/anon key
   - Supabase service role key
3. **Update project configuration**
   - Replace the Supabase credentials in `.env` with yours.
   - Update `supabase/config.toml` with your Supabase project ID.
4. **Verify the connection**
   - Run a read query against your Supabase project to confirm the app can reach it.

## After this change

- The app will use your Supabase database, auth, and storage directly.
- Lovable Cloud features in the editor will no longer be available for this project.
- You will be able to manage the backend through your own Supabase dashboard.
