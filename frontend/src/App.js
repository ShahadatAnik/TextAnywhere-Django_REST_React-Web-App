import { BrowserRouter, Routes, Route } from "react-router-dom";

import Tab from "./containers/tab";
import Home from "./containers/home";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/:userName" element={<Tab />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
