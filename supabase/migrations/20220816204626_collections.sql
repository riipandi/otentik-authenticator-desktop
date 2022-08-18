create table collections (
  id uuid DEFAULT uuid_generate_v4(),
  user_id uuid references auth.users not null,
  issuer text not null,
  user_identity text not null,
  secret_key text unique not null,
  algorithm text not null default 'SHA1',
  token_type text not null DEFAULT 'TOTP',
  period numeric not null CHECK (period > 0) DEFAULT 30,
  digits numeric not null CHECK (digits > 0) DEFAULT 6,
  backup_code text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null,
  primary key (id),
  unique(secret_key),
  constraint secret_key_length check (char_length(secret_key) >= 3)
);

alter table collections enable row level security;
create policy "Can only view own collections data." on collections for select using (auth.uid() = user_id);
create policy "Users can insert their own collections data." on collections for insert with check (auth.uid() = user_id);
create policy "Users can update own collections data." on collections for update using (auth.uid() = user_id);

create function public.handle_collections_updated_at()
returns trigger as
$$
  begin
    new.updated_at = now();
    return new;
  end;
$$
language plpgsql security definer;

create trigger on_collections_updated before update on collections
  for each row execute procedure handle_collections_updated_at();
