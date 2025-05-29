-- Performance Metrics Tabelle
CREATE TABLE IF NOT EXISTS performance_metrics (
  id SERIAL PRIMARY KEY,
  metric_name VARCHAR(50) NOT NULL,
  metric_value DECIMAL(10,2) NOT NULL,
  url TEXT NOT NULL,
  user_agent TEXT,
  connection_type VARCHAR(20),
  device_type VARCHAR(20),
  timestamp TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  session_id VARCHAR(100),
  page_load_time DECIMAL(10,2),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- SEO Audit Results Tabelle
CREATE TABLE IF NOT EXISTS seo_audit_results (
  id SERIAL PRIMARY KEY,
  url TEXT NOT NULL,
  title TEXT,
  meta_description TEXT,
  h1_tag TEXT,
  canonical_url TEXT,
  robots_meta TEXT,
  og_title TEXT,
  og_description TEXT,
  og_image TEXT,
  issues JSONB DEFAULT '[]',
  score INTEGER DEFAULT 0,
  audit_timestamp TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  response_time INTEGER,
  status_code INTEGER,
  content_length INTEGER,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Sitemap Status Tabelle
CREATE TABLE IF NOT EXISTS sitemap_status (
  id SERIAL PRIMARY KEY,
  total_urls INTEGER NOT NULL,
  last_generated TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  generation_time_ms INTEGER,
  file_size_bytes INTEGER,
  status VARCHAR(20) DEFAULT 'active',
  errors JSONB DEFAULT '[]',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- SEO Issues Tracking Tabelle
CREATE TABLE IF NOT EXISTS seo_issues (
  id SERIAL PRIMARY KEY,
  url TEXT NOT NULL,
  issue_type VARCHAR(100) NOT NULL,
  issue_description TEXT NOT NULL,
  severity VARCHAR(20) DEFAULT 'medium', -- low, medium, high, critical
  first_detected TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  last_seen TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  status VARCHAR(20) DEFAULT 'open', -- open, resolved, ignored
  resolution_notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Indizes für bessere Performance
CREATE INDEX IF NOT EXISTS idx_performance_metrics_timestamp ON performance_metrics(timestamp);
CREATE INDEX IF NOT EXISTS idx_performance_metrics_metric_name ON performance_metrics(metric_name);
CREATE INDEX IF NOT EXISTS idx_performance_metrics_url ON performance_metrics(url);
CREATE INDEX IF NOT EXISTS idx_seo_audit_results_url ON seo_audit_results(url);
CREATE INDEX IF NOT EXISTS idx_seo_audit_results_timestamp ON seo_audit_results(audit_timestamp);
CREATE INDEX IF NOT EXISTS idx_seo_issues_url ON seo_issues(url);
CREATE INDEX IF NOT EXISTS idx_seo_issues_status ON seo_issues(status);
