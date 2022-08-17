/**
* USER PROFILE
* Note: This table contains user data. Users should only be able to view and update their own data.
*/
create table users_profiles (
  id uuid references auth.users not null primary key,
  first_name varchar(255) not null,
  last_name varchar(255),
  avatar_url text
);
alter table users_profiles enable row level security;
create policy "Public profiles are viewable by everyone." on users_profiles for select using (true);
create policy "Users can insert their own profile." on users_profiles for insert with check (auth.uid() = id);
create policy "Users can update own profile." on users_profiles for update using (auth.uid() = id);

/**
* This trigger automatically creates a user entry when a new user signs up via Supabase Auth.
*/
create function public.handle_new_user()
returns trigger as
$$
  begin
    insert into public.users_profiles (id, first_name, last_name, avatar_url)
    values (new.id, new.raw_user_meta_data->>'first_name', new.raw_user_meta_data->>'last_name', new.raw_user_meta_data->>'avatar_url');
    return new;
  end;
$$
language plpgsql security definer;

create trigger on_auth_user_created after insert on auth.users
  for each row execute procedure public.handle_new_user();

-- Set up Realtime!
begin;
  drop publication if exists supabase_realtime;
  create publication supabase_realtime;
commit;
alter publication supabase_realtime add table users_profiles;

-- Set up Storage!
insert into storage.buckets (id, name) values ('avatars', 'avatars');
create policy "Avatar images are publicly accessible." on storage.objects for select using (bucket_id = 'avatars');
create policy "Anyone can upload an avatar." on storage.objects for insert with check (bucket_id = 'avatars');
create policy "Anyone can update an avatar." on storage.objects for update with check (bucket_id = 'avatars');
