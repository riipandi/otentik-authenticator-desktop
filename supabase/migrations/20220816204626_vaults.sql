/**
* VAULTS
*/
create table vaults (
  id uuid DEFAULT uuid_generate_v4(),
  user_id uuid references auth.users not null,
  issuer text not null,
  user_identity text not null,
  secret_key text not null,
  algorithm text not null,
  token_type text not null DEFAULT 'TOTP',
  period numeric not null CHECK (period > 0) DEFAULT 30,
  digits numeric not null CHECK (digits > 0) DEFAULT 6,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null,
  PRIMARY KEY (id)
);
alter table vaults enable row level security;
create policy "Can only view own vault data." on vaults for select using (auth.uid() = user_id);
create policy "Users can insert their own vault data." on vaults for insert with check (auth.uid() = user_id);
create policy "Users can update own vault data." on vaults for update using (auth.uid() = user_id);

create function public.handle_updated_at()
returns trigger as
$$
  begin
    new.updated_at = now();
    return new;
  end;
$$
language plpgsql security definer;

create trigger on_vault_updated before update on vaults
  for each row execute procedure handle_updated_at();
