import { useEffect, useRef, useState, useCallback } from 'react';
import { FIXTURES, driftFixture, type Fixture } from '@/data/fixtures';
import { isDemoMode } from '@/lib/api';

const WS_URL = import.meta.env.VITE_WS_URL ?? 'ws://localhost:8080/ws/odds';

type OddsHandler = (fixtures: Fixture[]) => void;

/** Live odds: WebSocket when backend available, sub-second simulated stream in demo */
export function useLiveOdds(filter?: { sportSlug?: string; inPlayOnly?: boolean }) {
  const [fixtures, setFixtures] = useState<Fixture[]>(() => {
    let list = [...FIXTURES];
    if (filter?.sportSlug) list = list.filter((f) => f.sportSlug === filter.sportSlug);
    if (filter?.inPlayOnly) list = list.filter((f) => f.inPlay);
    return list;
  });
  const [connected, setConnected] = useState(false);
  const [latencyMs, setLatencyMs] = useState(0);
  const wsRef = useRef<WebSocket | null>(null);

  const applyUpdate = useCallback((list: Fixture[]) => {
    const start = performance.now();
    setFixtures(list);
    setLatencyMs(Math.round(performance.now() - start));
  }, []);

  useEffect(() => {
    let list = [...FIXTURES];
    if (filter?.sportSlug) list = list.filter((f) => f.sportSlug === filter.sportSlug);
    if (filter?.inPlayOnly) list = list.filter((f) => f.inPlay);
    applyUpdate(list);
  }, [filter?.sportSlug, filter?.inPlayOnly, applyUpdate]);

  useEffect(() => {
    if (isDemoMode) {
      setConnected(true);
      const id = setInterval(() => {
        setFixtures((prev) => prev.map(driftFixture));
        setLatencyMs(Math.floor(Math.random() * 40) + 15);
      }, 1200);
      return () => clearInterval(id);
    }

    let alive = true;
    const connect = () => {
      try {
        const ws = new WebSocket(WS_URL);
        wsRef.current = ws;
        ws.onopen = () => alive && setConnected(true);
        ws.onclose = () => {
          setConnected(false);
          if (alive) setTimeout(connect, 3000);
        };
        ws.onmessage = (ev) => {
          try {
            const data = JSON.parse(ev.data) as { fixtures?: Fixture[] };
            if (data.fixtures) applyUpdate(data.fixtures);
            setLatencyMs(Date.now() - (data as { ts?: number }).ts! || 0);
          } catch { /* ignore */ }
        };
      } catch {
        setConnected(false);
      }
    };
    connect();
    return () => { alive = false; wsRef.current?.close(); };
  }, [applyUpdate]);

  return { fixtures, connected, latencyMs };
}

export function subscribeOddsEvent(eventId: string, onUpdate: OddsHandler) {
  if (isDemoMode) {
    const base = FIXTURES.find((f) => f.id === eventId);
    if (!base) return () => {};
    const id = setInterval(() => onUpdate([driftFixture(base)]), 1000);
    return () => clearInterval(id);
  }
  const ws = new WebSocket(`${WS_URL}?event=${eventId}`);
  ws.onmessage = (ev) => {
    try {
      const data = JSON.parse(ev.data);
      if (data.fixture) onUpdate([data.fixture]);
    } catch { /* ignore */ }
  };
  return () => ws.close();
}
