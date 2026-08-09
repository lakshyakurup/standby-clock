export function serverTimeInfo() {
  const now = new Date()
  return {
    iso: now.toISOString(),
    epoch: now.getTime(),
    timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
    locale: Intl.DateTimeFormat().resolvedOptions().locale,
  }
}

export async function getGeoFromIP(ip: string) {
  // Attempt to use ipapi.co for a simple geolocation lookup. If environment restricts external calls,
  // this will fail — callers should handle null fallback.
  try {
    const res = await fetch(`https://ipapi.co/${ip}/json/`, { cache: 'no-store' })
    if (!res.ok) return null
    const json = await res.json()
    return {
      ip: json.ip || ip,
      city: json.city || null,
      region: json.region || null,
      country: json.country_name || null,
      latitude: json.latitude || json.lat || null,
      longitude: json.longitude || json.lon || null,
      timezone: json.timezone || null,
    }
  } catch (e) {
    return null
  }
}
