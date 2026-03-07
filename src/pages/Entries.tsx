import { For } from "solid-js";
import { onMount } from "solid-js";
import { deleteEntryDB, loadEntries } from "../data/database";
import { EntryList } from "../components/Entry";
import { entries, setEntries } from "../data/store";
import { useNavigate } from "@solidjs/router";
// import $ from "./"

export default function EntriesPage() {
  const navigate = useNavigate();

  async function editEntry(id: string) {
    navigate(`/edit/${id}`);
  }
  async function deleteEntry(id: string) {
    setEntries("entries", (n) => n.filter((entry) => entry.id !== id));
    await deleteEntryDB(id);
  }

  onMount(async () => {
    const loaded = await loadEntries();
    setEntries("entries", loaded);
  });

  return (
    <div class="$.entries">
      <For each={entries.entries} fallback={<li>No entries</li>}>
        {(entry) => (
          <EntryList entry={entry} onDelete={deleteEntry} onEdit={editEntry} />
        )}
      </For>
    </div>
  );
}
