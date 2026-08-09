type WeatherResponse = any

export async function fetchWeatherForCoords(lat: number, lon: number): Promise<WeatherResponse> {
  const key = process.env.OPENWEATHERMAP_API_KEY
  if (!key) {
    // return a mocked minimal response
    return {
      current: {
        temp: 18.5,
        weather: [{ id: 800, main: 'Clear', description: 'clear sky' }],
      },
      daily: Array.from({ length: 5 }).map((_, i) => ({ dt: Date.now() + i * 86400000, temp: { day: 18 + i }, weather: [{ main: 'Clear' }] })),
    }
  }

  const url = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&units=metric&exclude=minutely&appid=${key}`
  const res = await fetch(url)
  if (!res.ok) throw new Error('weather fetch failed')
  const json = await res.json()
  return json
}
