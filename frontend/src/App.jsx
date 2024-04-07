import "./index.css";
import { Route, Routes } from "react-router-dom";

import Authentication from "./componenets/Authentication/Authentication";
import Profile from "./componenets/Profile/Profile";

function App() {
  return (
    <>
      <Routes>
        <Route path="/auth" element={<Authentication />}></Route>
        <Route path="/profile" element={<Profile />}></Route>
      </Routes>
    </>
  );
}

export default App;
