# StandBy Clock — iOS StandBy Mode Inspired Web App

StandBy Clock is a Next.js (App Router) TypeScript project that replicates an iOS StandBy Mode experience optimized for OLED displays. It includes multiple watch faces, a settings bar with Night Mode and theme controls, server-side time/geolocation and weather API endpoints, and utilities to extend as a full-stack app.

## Features

- Oversized digital typography clock with bold overlapping digits, glowing separators, and live per-second updates.
- Dual-widget view: minimalist analog clock with tick marks plus a calendar widget with today's date highlighted and optional weather integration.
- World clock / map view with timezone pins and a simple day/night terminator visualization.
- Settings: 12/24 hour toggle, Night Mode (red OLED tint), theme color picker, and fullscreen toggle. Settings persist to `localStorage`.
- API endpoints: `/api/time` returns server time + IP geolocation; `/api/weather` proxies weather data for given coordinates (supports `OPENWEATHERMAP_API_KEY`).

## Architecture

- Next.js App Router (server + client components)
- Tailwind CSS for utilities and rapid styling
- Lucide React for icons
- `src/lib/time.ts` — server time & IP geolocation helper
- `src/lib/weather.ts` — weather fetch helper (OpenWeatherMap one-call, fallback mock)
- `src/app/api/time/route.ts` — time API route
- `src/app/api/weather/route.ts` — weather API route
- `src/components/*` — UI components (watch faces, settings)

Visual overview (high level):

```mermaid
graph TD
	A[Browser UI] --> B[Next.js Client Components]
	B --> C[Watch Faces]
	B --> D[SettingsBar]
	A --> E[API Routes]
	E --> F[/api/time]
	E --> G[/api/weather]
	F --> H[src/lib/time.ts]
	G --> I[src/lib/weather.ts]
```

## Quickstart

1. Install dependencies:

```bash
npm install
```

2. Add environment variables (optional for weather):

Create a `.env.local` file at the project root with:

```
OPENWEATHERMAP_API_KEY=your_api_key_here
```

3. Run dev server:

```bash
npm run dev
```

Visit `http://localhost:3000`.

## API Documentation

- GET `/api/time`
	- Response: `{ server: { iso, epoch, timezone, locale }, geo: { ip, city, region, country, latitude, longitude, timezone } | null }`
	- Uses `src/lib/time.ts#getGeoFromIP` which attempts `https://ipapi.co/:ip/json/` to resolve geolocation. In restricted environments it may return `null`.

- GET `/api/weather?lat={lat}&lon={lon}`
	- Parameters: `lat` and `lon` (required)
	- Response: `{ data: <openweather-like payload> }` or `{ error: '...' }`
	- If `OPENWEATHERMAP_API_KEY` is not set the endpoint returns a mocked minimal forecast payload for development.

## Environment variables

- `OPENWEATHERMAP_API_KEY` — Optional. If provided, `/api/weather` will fetch live data from OpenWeatherMap OneCall API.

## Extending & Notes

- Night Mode currently applies a red-tinted visual filter and color overlay for OLED-like effect. You can refine the color mapping in `src/styles/globals.css`.
- The weather integration is minimal; the calendar component can be extended to show hourly/daily forecasts.
- The time API uses `ipapi.co` for simple IP -> location mapping. Replace with a paid geolocation service for production-grade accuracy and rate limits.

## Contributing

1. Fork the repository and create a feature branch.
2. Implement your changes, add tests where appropriate.
3. Open a pull request describing the change and rationale.

Please keep changes focused and maintain TypeScript strictness.

## License

MIT-style (add your preferred license file).
# standby-clock