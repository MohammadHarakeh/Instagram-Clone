import "./index.css";
import { Route, Routes } from "react-router-dom";

import Authentication from "./componenets/Authentication/Authentication";

function App() {
  return (
    <>
      <Routes>
        <Route path="/auth" element={<Authentication />}></Route>
      </Routes>
    </>
  );
}

export default App;
