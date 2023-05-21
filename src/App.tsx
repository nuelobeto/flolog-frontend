import { BrowserRouter, Route, Routes } from "react-router-dom";
import { PhoneContainer } from "./components/phone-container/PhoneContainer";
import Landing from "./pages/landing/Landing";

const App = () => {
  return (
    <BrowserRouter>
      <PhoneContainer>
        <Routes>
          <Route path="/" element={<Landing />} />
        </Routes>
      </PhoneContainer>
    </BrowserRouter>
  );
};

export default App;
