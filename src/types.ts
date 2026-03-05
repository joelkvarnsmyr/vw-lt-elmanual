// === Wire Lookup JSON ===
export interface WireEntry {
  id: string;
  figure: string;
  from_component: string;
  from_terminal: string | null;
  to_component: string;
  to_terminal: string | null;
  wire_id: string | null;
  mm2: number | null;
  colour_main: string | null;
  colour_stripe: string | null;
  colour_code: string | null;
  track: number | string | null;
  circuit: string;
  description: string;
}

export interface CircuitInfo {
  fuse: string | null;
  description: string;
  power_rail: string;
}

export interface WireLookupData {
  _description: string;
  _query_examples: string[];
  wires: WireEntry[];
  circuits_index: Record<string, CircuitInfo>;
}

// === Complete Wiring Database ===
export interface ColourDef {
  en: string;
  sv: string;
}

export interface EarthPoint {
  id: string;
  location: string;
  location_sv?: string;
}

export interface ComponentEntry {
  id: string;
  description: string;
  track: number | string | null;
}

export interface FuseEntry {
  id: string;
  rating_A: number | null;
  circuits: string;
}

export interface FaultSymptom {
  symptom: string;
  reasons: string[];
}

export interface CompleteDatabase {
  meta: {
    source: string;
    colour_code: Record<string, ColourDef>;
    total_components: number;
    total_wire_entries: number;
  };
  reference: {
    earth_points: {
      title: string;
      description: string;
      check_list: string[];
      earth_point_table_fig_10_34: EarthPoint[];
      earth_point_table_fig_13_77_4cyl: EarthPoint[];
      earth_point_table_fig_13_78_6cyl: EarthPoint[];
    };
    fault_diagnosis: {
      title: string;
      symptoms: FaultSymptom[];
    };
  };
  diagrams: {
    chapter_10_original: {
      fig_10_34: {
        component_key: ComponentEntry[];
        fuse_key: FuseEntry[];
      };
    };
    chapter_13_supplement?: {
      fig_13_80?: { component_key: ComponentEntry[] };
      fig_13_81?: { component_key: ComponentEntry[] };
      fig_13_82?: { component_key: ComponentEntry[] };
      fig_13_83?: { component_key: ComponentEntry[] };
      fig_13_84?: { component_key: ComponentEntry[] };
      fig_13_85?: { component_key: ComponentEntry[] };
      fig_13_86?: { component_key: ComponentEntry[] };
    };
  };
}

// === Colour hex mapping ===
export const COLOUR_HEX: Record<string, string> = {
  bl: '#2196F3',
  br: '#795548',
  ge: '#FFEB3B',
  gn: '#4CAF50',
  gr: '#9E9E9E',
  li: '#CE93D8',
  pi: '#F48FB1',
  ro: '#F44336',
  sw: '#212121',
  ws: '#FAFAFA',
};

// === Diagram mapping ===
export const CIRCUIT_DIAGRAM_MAP: Record<string, string> = {
  starting: '11_starter_circuit.mermaid',
  charging: '15_charging_circuit.mermaid',
  ignition: '11_starter_circuit.mermaid',
  headlights: '02_lighting_circuit.mermaid',
  lighting: '02_lighting_circuit.mermaid',
  panel_illumination: '02_lighting_circuit.mermaid',
  dash_lights: '13_dash_lights_rev_counter.mermaid',
  turn_signal_L: '04_turn_signals.mermaid',
  turn_signal_R: '04_turn_signals.mermaid',
  emergency_lights: '04_turn_signals.mermaid',
  brake_lights: '08_brake_circuit.mermaid',
  brake_warning: '08_brake_circuit.mermaid',
  wiper: '03_wiper_washer.mermaid',
  wiper_washer: '03_wiper_washer.mermaid',
  headlight_washer: '03_wiper_washer.mermaid',
  blower: '09_supplementary.mermaid',
  heated_rear_window: '09_supplementary.mermaid',
  interior_light: '09_supplementary.mermaid',
  horn: '09_supplementary.mermaid',
  oil_pressure: '05_instruments.mermaid',
  fuel_gauge: '05_instruments.mermaid',
  temp_gauge: '05_instruments.mermaid',
  reversing_light: '09_supplementary.mermaid',
  foglight: '06_foglight.mermaid',
  foglight_front: '06_foglight.mermaid',
  foglight_rear: '06_foglight.mermaid',
  trailer_turn_L: '07_trailer_towing.mermaid',
  trailer_turn_R: '07_trailer_towing.mermaid',
  trailer_tail_L: '07_trailer_towing.mermaid',
  trailer_tail_R: '07_trailer_towing.mermaid',
  trailer_brake: '07_trailer_towing.mermaid',
  trailer_earth: '07_trailer_towing.mermaid',
};
