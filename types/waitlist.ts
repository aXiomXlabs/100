export interface WaitlistEntry {
  id: string
  email: string
  telegram_username: string | null
  referral_source: string | null
  created_at: string
  utm_source: string | null
  utm_medium: string | null
  utm_campaign: string | null
  utm_content: string | null
  utm_term: string | null
  conversion_value: number | null
  conversion_currency: string | null
  transaction_id: string | null
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
