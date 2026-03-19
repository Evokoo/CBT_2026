import { For } from "solid-js";
import { onMount } from "solid-js";
import { deleteEntryDB, loadEntries } from "../data/database";
import { Entry } from "../components/Entry";
import { entries, setEntries } from "../data/store";
import { useNavigate } from "@solidjs/router";

import $ from "./Entries.module.scss";

export default function EntriesPage() {
  const navigate = useNavigate();

  async function editEntry(id: string) {
    navigate(`/edit/${id}`);
  }
  async function deleteEntry(id: string) {
    setEntries((n) => n.filter((entry) => entry.id !== id));
    await deleteEntryDB(id);
  }

  onMount(async () => {
    const loaded = await loadEntries();
    loaded.sort((a, b) => b.created.getTime() - a.created.getTime());
    setEntries(loaded);
  });

  return (
    <div class={$.entries}>
      <For each={entries} fallback={<span>No entries</span>}>
        {(entry) => (
          <Entry entry={entry} onDelete={deleteEntry} onEdit={editEntry} />
        )}
      </For>
    </div>
  );
}
