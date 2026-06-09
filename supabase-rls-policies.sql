-- Manual Supabase setup reference.
-- Run this in the Supabase SQL editor after reviewing existing policies.

alter table public.profiles enable row level security;
alter table public.bookings enable row level security;

create policy "Users can read own profile"
on public.profiles
for select
to authenticated
using (id = auth.uid());

create policy "Users can insert own profile"
on public.profiles
for insert
to authenticated
with check (id = auth.uid());

create policy "Users can update own profile"
on public.profiles
for update
to authenticated
using (id = auth.uid())
with check (id = auth.uid());

create policy "Users can read own bookings"
on public.bookings
for select
to authenticated
using (user_id = auth.uid());

create policy "Users can create own bookings"
on public.bookings
for insert
to authenticated
with check (user_id = auth.uid());

create index if not exists profiles_email_idx on public.profiles (email);
create index if not exists bookings_user_id_idx on public.bookings (user_id);
create index if not exists bookings_booking_date_idx on public.bookings (booking_date);
create index if not exists bookings_status_idx on public.bookings (status);
create index if not exists bookings_created_at_idx on public.bookings (created_at);

alter table public.bookings
alter column status set default 'pending';

alter table public.profiles
alter column created_at set default now();

alter table public.bookings
alter column created_at set default now();

do $$
begin
  if not exists (
    select 1
    from pg_constraint
    where conname = 'bookings_status_allowed'
  ) then
    alter table public.bookings
    add constraint bookings_status_allowed
    check (status in ('pending', 'confirmed', 'cancelled'));
  end if;
end $$;
