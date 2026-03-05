import { useState, useEffect, useMemo } from 'react';
import type { WireLookupData, CompleteDatabase, WireEntry, ComponentEntry } from '../types';

interface WiringData {
  lookup: WireLookupData | null;
  complete: CompleteDatabase | null;
  loading: boolean;
  error: string | null;
}

export interface ComponentInfo {
  id: string;
  description: string;
  track: number | string | null;
  wires: WireEntry[];
  circuits: string[];
}

export function useWiringData(): WiringData & {
  wiresByCircuit: Map<string, WireEntry[]>;
  componentMap: Map<string, ComponentInfo>;
  allComponents: ComponentEntry[];
  allColours: string[];
  allDimensions: number[];
} {
  const [lookup, setLookup] = useState<WireLookupData | null>(null);
  const [complete, setComplete] = useState<CompleteDatabase | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    Promise.all([
      fetch('/data/vw_lt_wire_lookup.json').then(r => r.json()),
      fetch('/data/vw_lt_complete_wiring_database.json').then(r => r.json()),
    ])
      .then(([lookupData, completeData]) => {
        setLookup(lookupData);
        setComplete(completeData);
        setLoading(false);
      })
      .catch(err => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  const wiresByCircuit = useMemo(() => {
    const map = new Map<string, WireEntry[]>();
    if (!lookup) return map;
    for (const w of lookup.wires) {
      const list = map.get(w.circuit) || [];
      list.push(w);
      map.set(w.circuit, list);
    }
    return map;
  }, [lookup]);

  const allComponents = useMemo(() => {
    if (!complete) return [];
    const comps: ComponentEntry[] = [];
    const seen = new Set<string>();
    const addComps = (list?: ComponentEntry[]) => {
      if (!list) return;
      for (const c of list) {
        if (!seen.has(c.id)) {
          seen.add(c.id);
          comps.push(c);
        }
      }
    };
    addComps(complete.diagrams.chapter_10_original.fig_10_34.component_key);
    const ch13 = complete.diagrams.chapter_13_supplement;
    if (ch13) {
      for (const fig of Object.values(ch13)) {
        if (fig?.component_key) addComps(fig.component_key);
      }
    }
    return comps.sort((a, b) => a.id.localeCompare(b.id, undefined, { numeric: true }));
  }, [complete]);

  const componentMap = useMemo(() => {
    const map = new Map<string, ComponentInfo>();
    if (!lookup) return map;
    // seed from all components
    for (const c of allComponents) {
      map.set(c.id, { ...c, wires: [], circuits: [] });
    }
    // add wire references
    for (const w of lookup.wires) {
      for (const compId of [w.from_component, w.to_component]) {
        let info = map.get(compId);
        if (!info) {
          info = { id: compId, description: compId, track: null, wires: [], circuits: [] };
          map.set(compId, info);
        }
        info.wires.push(w);
        if (!info.circuits.includes(w.circuit)) {
          info.circuits.push(w.circuit);
        }
      }
    }
    return map;
  }, [lookup, allComponents]);

  const allColours = useMemo(() => {
    if (!lookup) return [];
    const set = new Set<string>();
    for (const w of lookup.wires) {
      if (w.colour_main) set.add(w.colour_main);
    }
    return Array.from(set).sort();
  }, [lookup]);

  const allDimensions = useMemo(() => {
    if (!lookup) return [];
    const set = new Set<number>();
    for (const w of lookup.wires) {
      if (w.mm2 != null) set.add(w.mm2);
    }
    return Array.from(set).sort((a, b) => a - b);
  }, [lookup]);

  return { lookup, complete, loading, error, wiresByCircuit, componentMap, allComponents, allColours, allDimensions };
}
