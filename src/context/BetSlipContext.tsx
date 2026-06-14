import { createContext, useContext, useState, type ReactNode } from 'react';

export interface BetSlipItem {
  selectionId: string;
  selectionName: string;
  marketName: string;
  fixtureLabel: string;
  odds: number;
}

interface BetSlipCtx {
  items: BetSlipItem[];
  add: (item: BetSlipItem) => void;
  remove: (selectionId: string) => void;
  clear: () => void;
  stake: number;
  setStake: (n: number) => void;
}

const BetSlipContext = createContext<BetSlipCtx | null>(null);

export function BetSlipProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<BetSlipItem[]>([]);
  const [stake, setStake] = useState(100);

  const add = (item: BetSlipItem) => {
    setItems((prev) => {
      const filtered = prev.filter((i) => i.fixtureLabel !== item.fixtureLabel);
      return [...filtered, item];
    });
  };

  return (
    <BetSlipContext.Provider
      value={{
        items,
        add,
        remove: (id) => setItems((p) => p.filter((i) => i.selectionId !== id)),
        clear: () => setItems([]),
        stake,
        setStake,
      }}
    >
      {children}
    </BetSlipContext.Provider>
  );
}

export function useBetSlip() {
  const ctx = useContext(BetSlipContext);
  if (!ctx) throw new Error('useBetSlip required');
  return ctx;
}
