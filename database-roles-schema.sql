-- Erweitere die existierende users Tabelle (angenommen sie existiert durch Supabase Auth)
-- oder erstelle eine einfache users Tabelle, falls du eine eigene Benutzerverwaltung nutzt.
-- Supabase Auth hat bereits eine 'users' Tabelle im 'auth' Schema.
-- Wir fügen eine 'user_roles' Tabelle im 'public' Schema hinzu,
-- um Rollen den Supabase Auth Benutzern zuzuordnen.

CREATE TABLE IF NOT EXISTS public.user_profiles (
    id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    username TEXT UNIQUE,
    full_name TEXT,
    avatar_url TEXT,
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Tabelle für Rollen
CREATE TABLE IF NOT EXISTS public.roles (
    id SERIAL PRIMARY KEY,
    name TEXT UNIQUE NOT NULL,
    description TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Zwischentabelle für User-Rollen-Beziehung (Many-to-Many, falls ein User mehrere Rollen haben kann)
-- Für eine einfache Implementierung (ein User hat eine Rolle) kann die Rolle direkt in user_profiles gespeichert werden.
-- Hier eine Many-to-Many Implementierung für Flexibilität:
CREATE TABLE IF NOT EXISTS public.user_role_assignments (
    user_id UUID REFERENCES public.user_profiles(id) ON DELETE CASCADE,
    role_id INTEGER REFERENCES public.roles(id) ON DELETE CASCADE,
    PRIMARY KEY (user_id, role_id),
    assigned_at TIMESTAMPTZ DEFAULT NOW()
);

-- Standardrollen einfügen
INSERT INTO public.roles (name, description)
VALUES
    ('admin', 'Full access to all features and settings.'),
    ('editor', 'Can create and manage content, but not site settings.'),
    ('viewer', 'Can view dashboards and reports, but cannot make changes.'),
    ('user', 'Standard registered user with basic access.')
ON CONFLICT (name) DO NOTHING;

-- Funktion, um die Rollen eines Benutzers abzurufen
CREATE OR REPLACE FUNCTION get_user_roles(user_id_input UUID)
RETURNS TABLE(role_name TEXT) AS $$
BEGIN
    RETURN QUERY
    SELECT r.name
    FROM public.user_role_assignments ura
    JOIN public.roles r ON ura.role_id = r.id
    WHERE ura.user_id = user_id_input;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- RLS Policies für user_profiles (Beispiel)
ALTER TABLE public.user_profiles ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view their own profile."
ON public.user_profiles FOR SELECT
USING (auth.uid() = id);

CREATE POLICY "Users can update their own profile."
ON public.user_profiles FOR UPDATE
USING (auth.uid() = id);

-- RLS Policies für user_role_assignments (Beispiel)
ALTER TABLE public.user_role_assignments ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Admins can manage role assignments."
ON public.user_role_assignments FOR ALL
USING (EXISTS (SELECT 1 FROM get_user_roles(auth.uid()) WHERE role_name = 'admin'))
WITH CHECK (EXISTS (SELECT 1 FROM get_user_roles(auth.uid()) WHERE role_name = 'admin'));

CREATE POLICY "Users can view their own role assignments."
ON public.user_role_assignments FOR SELECT
USING (auth.uid() = user_id);

-- Trigger, um ein Profil zu erstellen, wenn ein neuer Supabase-Benutzer erstellt wird
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.user_profiles (id, username)
  VALUES (new.id, new.email); -- oder einen anderen Standard-Benutzernamen
  -- Standardmäßig die Rolle 'user' zuweisen
  INSERT INTO public.user_role_assignments (user_id, role_id)
  VALUES (new.id, (SELECT id FROM public.roles WHERE name = 'user'));
  RETURN new;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();
