//Router
import { Router, Route } from "@solidjs/router";
// Pages
import Form from "./pages/Form";
import Entries from "./pages/Entries";
// Styles
import "./App.scss";

export default function App() {
  return (
    <>
      <header>
        <ul>
          <li>
            <a href="/">New Item</a>
          </li>
          <li>
            <a href="/entries">Entries</a>
          </li>
        </ul>
      </header>
      <main>
        <Router>
          <Route path={["/", "*"]} component={Form} />
          <Route path="/edit/:id?" component={Form} />
          <Route path="/entries" component={Entries} />
        </Router>
      </main>
      <footer> footer </footer>
    </>
  );
}
