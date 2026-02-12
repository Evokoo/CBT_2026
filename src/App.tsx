//Router
import { Router, Route } from "@solidjs/router";
// Pages
import Form from "./pages/FormPage";
import Entries from "./pages/EntriesPage";

export default function App() {
  return (
    <>
      <header> Header </header>
      <Router>
        <Route path={["/", "*"]} component={Form} />
        <Route path="/edit/:id?" component={Form} />
        <Route path="/entries" component={Entries} />
      </Router>
      <footer> footer </footer>
    </>
  );
}
