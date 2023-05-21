import { BrowserRouter, Route, Routes } from "react-router-dom";
import AppRoutes from "./AppRoutes";

const App = () => {
  return (
    <BrowserRouter>
      <AppRoutes />
    </BrowserRouter>
  );
};

export default App;
