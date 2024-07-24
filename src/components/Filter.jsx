import React, { useEffect, useState } from "react";
import SubmitButton from "../components/SubmitButton";
import Select from "./Select";
import { statusOpt, typeOpt, sortOpt } from "../constans/index";
import { useDispatch } from "react-redux";
import { setLoading, setError, setJobs } from "../app/slice/jobSlice";
import api from "../utils/api";

const Filter = () => {
  const dispatch = useDispatch();
  const [text, setText] = useState();
  const [sort, setSort] = useState();
  const [status, setStatus] = useState();
  const [type, setType] = useState();
  const [debouncedText, setDebouncedText] = useState();

  useEffect(() => {
    if (text === undefined) return;
    const timer = setTimeout(() => setDebouncedText(text), 500);
    return () => {
      clearTimeout(timer);
    };
  }, [text]);

  useEffect(() => {
    const sortParam =
      sort === "a-z" || sort === "z - a"
        ? "company"
        : sort === "En yeni" || sort === "En Eski"
        ? "date"
        : undefined;

    const orderParam =
      sort === "a-z"
        ? "asc"
        : sort === "z-a"
        ? "desc"
        : sort === "En Yeni"
        ? "desc"
        : sort === "En Eski"
        ? "asc"
        : undefined;

    const params = {
      q: text,
      _sort: sortParam,
      _order: orderParam,
      type: type || undefined,
      status: status || undefined,
    };
    dispatch(setLoading());
    api
      .get("/jobs", { params })
      .then((res) => dispatch(setJobs(res.data)))
      .catch((err) => dispatch(setError(err.message)));
  }, [debouncedText, text, sort, type, status]);

  const handleReset = (e) => {
    e.preventDefault();

    setText();
    setDebouncedText();
    setSort();
    setStatus();
    setType();
    e.target.reset();
  };

  return (
    <div className="filter-section">
      <h2>Filtreleme Formu</h2>

      <form onSubmit={handleReset}>
        <div>
          <label>Ara</label>
          <input type="text" onChange={(e) => setText(e.target.value)}></input>
        </div>

        <Select
          handleChange={(e) => setStatus(e.target.value)}
          label={"Durum"}
          options={statusOpt}
        />
        <Select handleChange={(e) => setType(e.target.value)} label={"Tür"} options={typeOpt} />
        <Select handleChange={(e) => setSort(e.target.value)} label={"Sırala"} options={sortOpt} />

        <div>
          <SubmitButton text={"Filtreyi Sıfırla"} />
        </div>
      </form>
    </div>
  );
};

export default Filter;
