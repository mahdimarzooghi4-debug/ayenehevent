import { cmsGetSettings, getCmsToken } from './backend';
import { requireSupabase } from './supabase';

export type HeroStats = {
  registrations: string;
  solutions: string;
  provinces: string;
  axes: string;
};

export type SitePresentationSettings = {
  maxUploadBytes: number;
  heroStats: HeroStats;
};

export const DEFAULT_HERO_STATS: HeroStats = {
  registrations: '۱۲۰۰+',
  solutions: '۳۵۰+',
  provinces: '۳۱',
  axes: '۵',
};

export const DEFAULT_MAX_UPLOAD_BYTES = 10 * 1024 * 1024;

function parseHeroStats(value: unknown): HeroStats {
  if (!value || typeof value !== 'object') return DEFAULT_HERO_STATS;
  const row = value as Record<string, unknown>;
  return {
    registrations: String(row.registrations ?? DEFAULT_HERO_STATS.registrations),
    solutions: String(row.solutions ?? DEFAULT_HERO_STATS.solutions),
    provinces: String(row.provinces ?? DEFAULT_HERO_STATS.provinces),
    axes: String(row.axes ?? DEFAULT_HERO_STATS.axes),
  };
}

function parseBytes(value: unknown) {
  const number = Number(value);
  return Number.isFinite(number) && number > 0 ? number : DEFAULT_MAX_UPLOAD_BYTES;
}

export async function getPublicSitePresentationSettings(): Promise<SitePresentationSettings> {
  const { data, error } = await requireSupabase().rpc('get_public_settings');
  if (error) throw error;
  const settings = (data ?? {}) as Record<string, unknown>;
  return {
    maxUploadBytes: parseBytes(settings['public.max_upload_bytes']),
    heroStats: parseHeroStats(settings['public.hero_stats']),
  };
}

export async function getCmsSitePresentationSettings(): Promise<SitePresentationSettings> {
  const rows = await cmsGetSettings();
  const map = new Map(rows.map((row) => [row.key, row.value]));
  return {
    maxUploadBytes: parseBytes(map.get('public.max_upload_bytes') ?? map.get('admin.max_upload_bytes')),
    heroStats: parseHeroStats(map.get('public.hero_stats')),
  };
}

export async function saveCmsSitePresentationSettings(settings: SitePresentationSettings) {
  const { error } = await requireSupabase().rpc('cms_save_site_presentation_settings', {
    p_token: getCmsToken(),
    p_max_upload_bytes: Math.round(settings.maxUploadBytes),
    p_hero_stats: settings.heroStats,
  });
  if (error) throw error;
}
