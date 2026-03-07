//Core & Router
import { createSignal, onMount } from "solid-js";
import { useNavigate, useParams } from "@solidjs/router";
//Data
import { getEntry, saveEntry } from "../data/database";
import { setEntries } from "../data/store";
import { distortions } from "../data/distortions";
//Components
import { DistortionButtons } from "../components/DistortionButtons";
import { Textarea } from "../components/Textarea";
//Utils & Types
import { newEntry } from "../utils";
import type { Entry, TextareaProps } from "../types";

//Constants
const DISTORTION_COUNT = distortions.length;

export default function FormPage() {
  //Routing
  const params = useParams();
  const navigate = useNavigate();
  //State
  const [id, setID] = createSignal<string | null>(null);
  const [creation, setCreation] = createSignal<Date | null>(null);
  const [thought, setThought] = createSignal<string>("");
  const [response, setResponse] = createSignal<string>("");
  const [selection, setSelection] = createSignal(
    Array(DISTORTION_COUNT).fill(0),
  );
  //Logic
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
      setEntries("entries", (n) => [...n, entry]);
    } else {
      entry = newEntry(thought(), response(), selection(), id()!, creation()!);
      setEntries("entries", (n) => n.map((e) => (e.id === id() ? entry : e)));
    }
    await saveEntry(entry);
    navigate("/entries");
  }
  onMount(async () => {
    clearFields();

    if (!params.id) {
      navigate("/");
    }

    if (params.id) {
      const entry = (await getEntry(params.id)) as Entry;

      if (!entry) {
        navigate("/");
      }

      setID(entry.id);
      setCreation(entry.created);
      setThought(entry.thought.trim());
      setResponse(entry.response.trim());
      setSelection(entry.distortions);
    }
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
    <div>
      <Textarea {...thoughtInputProps} />
      <DistortionButtons selection={selection} setSelection={setSelection} />
      <Textarea {...responseInputProps} />
      <button onClick={addEntry}>{id() !== null ? "Update" : "Save"}</button>
      <button onClick={clearFields}>Clear</button>
    </div>
  );
}
