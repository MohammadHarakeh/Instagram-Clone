import "./index.css";
import { Route, Routes } from "react-router-dom";

import Authentication from "./componenets/Authentication/Authentication";
import Profile from "./componenets/Profile/Profile";
import Homepage from "./componenets/Homepage/Homepage";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Authentication />}></Route>
        <Route path="/profile" element={<Profile />}></Route>
        <Route path="/homepage" element={<Homepage />}></Route>
      </Routes>
    </>
  );
}

export default App;
