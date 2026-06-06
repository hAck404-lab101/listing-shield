-- Listing Shield initial database schema
-- Target database: PostgreSQL / Supabase

create extension if not exists "pgcrypto";

create type audit_status as enum (
  'draft',
  'active',
  'completed',
  'paused',
  'archived'
);

create type candidate_classification as enum (
  'original',
  'official_branch',
  'suspicious_duplicate',
  'likely_impersonator',
  'needs_review'
);

create type report_status as enum (
  'not_reported',
  'prepared',
  'reported',
  'pending_review',
  'removed',
  'rejected',
  'monitoring'
);

create table businesses (
  id uuid primary key default gen_random_uuid(),
  owner_user_id uuid,
  client_name text,
  official_name text not null,
  official_place_id text,
  official_maps_url text,
  official_phone text,
  official_website text,
  city text,
  country text default 'Ghana',
  notes text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table audits (
  id uuid primary key default gen_random_uuid(),
  business_id uuid not null references businesses(id) on delete cascade,
  status audit_status not null default 'draft',
  title text,
  summary text,
  started_at timestamptz,
  completed_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table candidate_places (
  id uuid primary key default gen_random_uuid(),
  audit_id uuid not null references audits(id) on delete cascade,
  place_id text not null,
  display_name text,
  formatted_address text,
  phone text,
  website text,
  maps_url text,
  rating numeric(3,2),
  user_rating_count integer,
  suspicion_score integer not null default 0,
  classification candidate_classification not null default 'needs_review',
  classification_reason text,
  report_status report_status not null default 'not_reported',
  operator_notes text,
  last_checked_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (audit_id, place_id)
);

create table evidence_items (
  id uuid primary key default gen_random_uuid(),
  candidate_place_id uuid not null references candidate_places(id) on delete cascade,
  evidence_type text not null,
  file_url text,
  notes text,
  created_at timestamptz not null default now()
);

create table audit_activity_log (
  id uuid primary key default gen_random_uuid(),
  audit_id uuid not null references audits(id) on delete cascade,
  actor_user_id uuid,
  action text not null,
  metadata jsonb default '{}'::jsonb,
  created_at timestamptz not null default now()
);

create index idx_businesses_owner_user_id on businesses(owner_user_id);
create index idx_audits_business_id on audits(business_id);
create index idx_candidate_places_audit_id on candidate_places(audit_id);
create index idx_candidate_places_place_id on candidate_places(place_id);
create index idx_candidate_places_classification on candidate_places(classification);
create index idx_candidate_places_report_status on candidate_places(report_status);
create index idx_evidence_items_candidate_place_id on evidence_items(candidate_place_id);
create index idx_audit_activity_log_audit_id on audit_activity_log(audit_id);

-- Supabase production reminder:
-- Enable Row Level Security before production and create policies so users
-- only access businesses, audits, candidates, evidence, and logs they are authorized to manage.
