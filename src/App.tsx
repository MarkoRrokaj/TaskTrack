import LoginForm from "./components/LoginForm";
import RegisterForm from "./components/RegisterForm";
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/register" element={<RegisterForm />}></Route>
        <Route path="/login" element={<LoginForm />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
