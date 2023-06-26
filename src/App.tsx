import { BrowserRouter } from "react-router-dom";
import AppRoutes from "./app-navigation/AppRoutes";

const App = () => {
  return (
    <BrowserRouter>
      <AppRoutes />
    </BrowserRouter>
  );
};

export default App;
