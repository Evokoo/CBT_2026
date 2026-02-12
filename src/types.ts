import type { Setter, Accessor } from "solid-js";
import type { SetStoreFunction } from "solid-js/store";

export interface Entry {
  id: string;
  thought: string;
  response: string;
  distortions: number[];
  created: Date;
  edited: Date;
}

export interface Distortion {
  label: string;
  description?: string;
}

export interface EntryListProps {
  entry: Entry;
  onDelete: (id: string) => void;
  onEdit: (id: string) => void;
}

export interface DistortionButtonsProps {
  selection: Accessor<number[]>;
  setSelection: Setter<number[]>;
}

export interface TextareaProps {
  title: string;
  placeholder: string;
  value: Accessor<string>;
  onInputFn: Setter<string>;
}

export interface Store {
  setEntries: SetStoreFunction<{ entries: Entry[] }>;
  getEntries: { entries: Entry[] };
}
