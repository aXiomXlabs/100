export interface WaitlistEntry {
  id?: string
  email: string
  telegram_username?: string | null
  referral_source?: string | null
  utm_source?: string | null
  utm_medium?: string | null
  utm_campaign?: string | null
  utm_term?: string | null
  utm_content?: string | null
  ip_address?: string | null
  user_agent?: string | null
  consent_marketing?: boolean
  consent_terms?: boolean
  // Wir entfernen transaction_id, conversion_value und conversion_currency
  created_at?: string
  updated_at?: string
}

export interface CampaignPerformance {
  source: string
  medium: string
  campaign: string
  signups: number
  total_value: number
  first_signup: string
  last_signup: string
}
