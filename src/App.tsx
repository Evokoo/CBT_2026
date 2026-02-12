//Core
import { createSignal, For, onMount } from "solid-js";
import { createStore } from "solid-js/store";
//Data
import { distortions } from "./data/distortions";
import {
  deleteEntryDB,
  getEntry,
  loadEntries,
  saveEntry,
} from "./data/database";
//Styles
import $ from "./App.module.scss";
//Types
import type { Entry, TextareaProps } from "./types";
//Components
import { DistortionButtons } from "./components/DistortionButtons";
import { EntryList } from "./components/EntryList";
import { Textarea } from "./components/Textarea";
//Utils
import { newEntry } from "./utils";
//Constants
const DISTORTION_COUNT = distortions.length;

function App() {
  // Signals
  const [id, setID] = createSignal<string | null>(null);
  const [creation, setCreation] = createSignal<Date | null>(null);
  const [thought, setThought] = createSignal<string>("");
  const [response, setResponse] = createSignal<string>("");
  const [selection, setSelection] = createSignal(
    Array(DISTORTION_COUNT).fill(0),
  );
  // Store
  const [entries, setEntry] = createStore({ entries: [] as Entry[] });

  // Logic
  function clearFields() {
    setID(null);
    setCreation(null);
    setThought("");
    setResponse("");
    setSelection(Array(DISTORTION_COUNT).fill(0));
  }
  async function addEntry() {
    let entry: Entry;

    if (id() === null) {
      entry = newEntry(thought(), response(), selection());
      setEntry("entries", (n) => [...n, entry]);
    } else {
      entry = newEntry(thought(), response(), selection(), id()!, creation()!);
      setEntry("entries", (n) => n.map((e) => (e.id === id() ? entry : e)));
    }
    await saveEntry(entry);
    clearFields();
  }
  async function editEntry(id: string) {
    const entry = await getEntry(id);
    if (!entry) return;

    setID(entry.id);
    setCreation(entry.created);
    setThought(entry.thought);
    setResponse(entry.response);
    setSelection(entry.distortions);
  }
  async function deleteEntry(id: string) {
    setEntry("entries", (n) => n.filter((entry) => entry.id !== id));
    await deleteEntryDB(id);
  }
  onMount(async () => {
    const loaded = await loadEntries();
    setEntry("entries", loaded);
  });

  // Context
  const thoughtInputProps: TextareaProps = {
    title: "Test Title",
    placeholder: "Initial Thought",
    value: thought,
    onInputFn: setThought,
  };
  const responseInputProps: TextareaProps = {
    title: "Test Title",
    placeholder: "Processed thought",
    value: response,
    onInputFn: setResponse,
  };

  return (
    <>
      <div class={$.inputForm}>
        <Textarea {...thoughtInputProps} />
        <DistortionButtons selection={selection} setSelection={setSelection} />
        <Textarea {...responseInputProps} />
        <button onClick={addEntry}>{id() !== null ? "Update" : "Save"}</button>
        <button onClick={clearFields}>Clear</button>
      </div>

      {/* <div class={$.entries}>
        <For each={entries.entries} fallback={<li>No entries</li>}>
          {(entry) => (
            <EntryList
              entry={entry}
              onDelete={deleteEntry}
              onEdit={editEntry}
            />
          )}
        </For>
      </div> */}
    </>
  );
}

export default App;
