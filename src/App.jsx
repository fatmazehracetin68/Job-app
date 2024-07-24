import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Joblist from "./pages/Joblist";
import AddJob from "./pages/AddJob";
import { useDispatch } from "react-redux";
import api from "./utils/api";
import { useEffect } from "react";
import { setJobs, setLoading, setError } from "./app/slice/jobSlice";

function App() {
  const dispatch = useDispatch();

  const getJob = () => {
    dispatch(setLoading());
    api
      .get("/jobs")
      .then((res) => dispatch(setJobs(res.data)))
      .catch((err) => dispatch(setError(err.message)));
  };
  useEffect(() => {
    getJob();
  }, []);
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Joblist retry={getJob} />} />
        <Route path="/new" element={<AddJob />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
