import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

const App = () => {
  return (
    <>
      <BrowserRouter basename="/">
        <Routes>
          <Route path="/" element={<>Base Page</>} />
          <Route path="/login" element={<>LoginPage</>} />
          <Route path="/test" element={<>TestPage</>} />
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default App;
