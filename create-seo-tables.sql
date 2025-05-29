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
  severity VARCHAR(20) DEFAULT 'medium',
  first_detected TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  last_seen TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  status VARCHAR(20) DEFAULT 'open',
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

-- Beispiel-Daten einfügen für Tests
INSERT INTO performance_metrics (metric_name, metric_value, url, device_type) VALUES
('lcp', 1200.5, 'https://rust-rocket.com', 'desktop'),
('fid', 45.2, 'https://rust-rocket.com', 'desktop'),
('cls', 0.05, 'https://rust-rocket.com', 'desktop'),
('lcp', 1800.3, 'https://rust-rocket.com', 'mobile'),
('fid', 78.1, 'https://rust-rocket.com', 'mobile'),
('cls', 0.12, 'https://rust-rocket.com', 'mobile');

INSERT INTO seo_audit_results (url, title, meta_description, score, issues) VALUES
('https://rust-rocket.com', 'Rust Rocket - Solana Trading Bot', 'The #1 Solana sniper bot for intelligent copy-trading', 85, '["Missing alt text on 2 images", "Meta description could be longer"]'),
('https://rust-rocket.com/solana-sniper-bot', 'Solana Sniper Bot - Rust Rocket', 'Advanced Solana sniping with 95% same-block execution', 92, '["Page loads slowly on mobile"]'),
('https://rust-rocket.com/faq', 'FAQ - Rust Rocket', 'Frequently asked questions about our Solana trading bot', 78, '["Missing canonical tag", "H1 tag too long", "No structured data"]');
