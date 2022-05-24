import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "./containers/login";
import Tab from "./containers/tab";
import Home from "./containers/home";

import NotFound from "./containers/NotFound";

function App() {
  return (
    <BrowserRouter>
          <Routes>
            <Route path="*" element={<NotFound />} />
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/tab" element={<Tab />} />
          </Routes>
      </BrowserRouter>
  );
}

export default App;
