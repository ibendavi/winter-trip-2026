'use client';

import { useEffect, useState } from 'react';

type Place = { key: string; label: string; lat: number; lon: number; elevationFt: number };
type Daily = { time: string[]; temperature_2m_max: number[]; temperature_2m_min: number[]; precipitation_sum: number[]; snowfall_sum: number[] };
type Loaded = { dates: string[]; rows: Array<{ place: Place; daily: Daily | null }> };

const TRIP_START = '2026-12-21';
const TRIP_END = '2027-01-02';
const HORIZON_DAYS = 15; // Open-Meteo serves about 16 days including today

function isoDay(date: Date) {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, '0');
  const d = String(date.getDate()).padStart(2, '0');
  return `${y}-${m}-${d}`;
}

function addDays(iso: string, days: number) {
  const [y, m, d] = iso.split('-').map(Number);
  return isoDay(new Date(y, m - 1, d + days));
}

function label(iso: string) {
  const [, m, d] = iso.split('-').map(Number);
  return `${m}/${d}`;
}

export default function LiveForecast({ places }: { places: Place[] }) {
  const [state, setState] = useState<{ status: 'idle' | 'early' | 'over' | 'loading' | 'error' | 'ready'; note?: string; data?: Loaded }>({ status: 'idle' });

  useEffect(() => {
    let cancelled = false;
    const today = isoDay(new Date());
    const test = new URLSearchParams(window.location.search).has('forecastTest');
    const windowStart = test ? today : TRIP_START;
    const windowEnd = test ? addDays(today, 12) : TRIP_END;
    const horizonEnd = addDays(today, HORIZON_DAYS);

    if (!test && today > TRIP_END) {
      // eslint-disable-next-line react-hooks/set-state-in-effect -- depends on the visitor's date, which is unknown at build time
      setState({ status: 'over' });
      return;
    }
    const start = windowStart < today ? today : windowStart;
    const end = windowEnd > horizonEnd ? horizonEnd : windowEnd;
    if (start > end) {
      setState({ status: 'early', note: addDays(TRIP_START, -HORIZON_DAYS) });
      return;
    }

    setState({ status: 'loading' });
    Promise.all(
      places.map(async (place) => {
        const params = new URLSearchParams({
          latitude: String(place.lat),
          longitude: String(place.lon),
          elevation: String(Math.round(place.elevationFt * 0.3048)),
          daily: 'temperature_2m_max,temperature_2m_min,precipitation_sum,snowfall_sum',
          temperature_unit: 'fahrenheit',
          precipitation_unit: 'inch',
          timezone: 'auto',
          start_date: start,
          end_date: end,
        });
        try {
          const response = await fetch(`https://api.open-meteo.com/v1/forecast?${params.toString()}`);
          if (!response.ok) return { place, daily: null };
          const json = (await response.json()) as { daily: Daily };
          return { place, daily: json.daily };
        } catch {
          return { place, daily: null };
        }
      }),
    ).then((rows) => {
      if (cancelled) return;
      const first = rows.find((row) => row.daily)?.daily;
      if (!first) {
        setState({ status: 'error' });
        return;
      }
      setState({ status: 'ready', data: { dates: first.time, rows }, note: test ? 'test' : undefined });
    });

    return () => {
      cancelled = true;
    };
  }, [places]);

  if (state.status === 'idle' || state.status === 'loading') {
    return <p className="forecast-note">Loading the live forecast…</p>;
  }
  if (state.status === 'early') {
    const [, m, d] = (state.note ?? '').split('-').map(Number);
    return (
      <p className="forecast-note">
        <strong>Live forecast:</strong> opens about {m}/{d}, when Dec 21 comes within 16 days. Until then, use the typical conditions above.
        Add <code>?forecastTest</code> to the address to preview the next 13 days.
      </p>
    );
  }
  if (state.status === 'over') {
    return <p className="forecast-note">The trip window has passed.</p>;
  }
  if (state.status === 'error' || !state.data) {
    return <p className="forecast-note">The live forecast could not be loaded. Use the National Weather Service links above.</p>;
  }

  const { dates, rows } = state.data;
  return (
    <div className="forecast-live">
      <p className="forecast-note">
        <strong>Live forecast</strong> from Open-Meteo{state.note === 'test' ? ' (test: next 13 days, not the trip dates)' : ''}. High / low in °F, with expected snowfall in inches.
        Forecasts beyond about a week are rough.
      </p>
      <div className="forecast-scroll">
        <table className="forecast-table">
          <thead>
            <tr>
              <th scope="col">Place</th>
              {dates.map((date) => (
                <th scope="col" key={date}>{label(date)}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map(({ place, daily }) => (
              <tr key={place.key}>
                <th scope="row">{place.label}</th>
                {dates.map((date, index) => {
                  if (!daily) return <td key={date}>–</td>;
                  const hi = Math.round(daily.temperature_2m_max[index]);
                  const lo = Math.round(daily.temperature_2m_min[index]);
                  const snow = daily.snowfall_sum[index];
                  const rain = daily.precipitation_sum[index];
                  return (
                    <td key={date}>
                      {hi}/{lo}
                      {snow >= 0.1 ? <small>❄ {snow.toFixed(1)}″</small> : rain >= 0.04 ? <small>💧 {rain.toFixed(2)}″</small> : null}
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
