import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "./containers/login";
import Tab from "./containers/tab";
import Home from "./containers/home";
import LoginDialog from "./containers/loginDialog";

import NotFound from "./containers/NotFound";

function App() {
  return (
    <BrowserRouter
      getUserConfirmation={(message, callback) => {
        // this is the default behavior
        const allowTransition = window.confirm(message);
        callback(allowTransition);
      }}
    >
      <Routes>
        <Route path="*" element={<NotFound />} />
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/:userName" element={<Tab />} />
        <Route path="/log" element={<LoginDialog />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
