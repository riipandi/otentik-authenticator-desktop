/**
* MasterKeys
*/
create table masterkeys (
  id bigserial primary key,
  user_id uuid references auth.users not null,
  passphrase text not null,
  hints text,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);
alter table masterkeys enable row level security;
create policy "Can only view own vault data." on masterkeys for select using (auth.uid() = user_id);
create policy "Users can insert their own vault data." on masterkeys for insert with check (auth.uid() = user_id);
create policy "Users can update own vault data." on masterkeys for update using (auth.uid() = user_id);

create function public.handle_masterkeys_updated_at()
returns trigger as
$$
  begin
    new.updated_at = now();
    return new;
  end;
$$
language plpgsql security definer;


create trigger on_masterkeys_updated before update on masterkeys
  for each row execute procedure handle_masterkeys_updated_at();

/**
* VAULTS
*/
create table vaults (
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
alter table vaults enable row level security;
create policy "Can only view own vault data." on vaults for select using (auth.uid() = user_id);
create policy "Users can insert their own vault data." on vaults for insert with check (auth.uid() = user_id);
create policy "Users can update own vault data." on vaults for update using (auth.uid() = user_id);

create function public.handle_vaults_updated_at()
returns trigger as
$$
  begin
    new.updated_at = now();
    return new;
  end;
$$
language plpgsql security definer;


create trigger on_vaults_updated before update on vaults
  for each row execute procedure handle_vaults_updated_at();
