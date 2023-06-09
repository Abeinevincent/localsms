import { Routes, Route } from "react-router-dom";
import { AddTeacher } from "./add/AddTeacher";
import { Teachers } from "./list/Teachers";
import PageNotFound from "../404/PageNotFound";

const Teacher = () => {
  return (
    <Routes>
      <Route path="/list/" element={<Teachers />} />
      <Route path="/add/" element={<AddTeacher />} />
      <Route path="*" element={<PageNotFound />} />
    </Routes>
  );
};
export default Teacher;
