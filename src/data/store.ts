import { createStore } from "solid-js/store";
import type { Entry } from "../types";

const [entries, setEntries] = createStore([] as Entry[]);

export { entries, setEntries };
