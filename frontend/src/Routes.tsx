import { Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage/HomePage";
import TCsPage from "./pages/TCsPage/TCsPage";
import CoursePage from "./pages/CoursePage/CoursePage";

const Router = () => (

  <Routes>
    <Route path="/" element={<HomePage />} />
    <Route path="/termsandconditions" element={<TCsPage />} />
    <Route path='/course/:courseCode' element={<CoursePage />} />
    <Route/>
  </Routes>
);

export default Router;
