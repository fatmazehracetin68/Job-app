import React from "react";
import AutoInput from "../components/AutoInput";
import Select from "../components/Select";
import { statusOpt, typeOpt } from "../constans";
import SubmitButton from "../components/SubmitButton";
import { v4 } from "uuid";
import api from "../utils/api";
import { useDispatch } from "react-redux";
import { createJob } from "../app/slice/jobSlice";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const AddJob = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const newJobData = Object.fromEntries(formData.entries());
    newJobData.id = v4();
    newJobData.date = Date.now();

    api
      .post("/jobs", newJobData)
      .then(() => {
        toast.success("İş başarıyla eklendi");
        dispatch(createJob(newJobData));
        navigate("/");
      })
      .catch(() => toast.error("iş eklenirken bir sorun oluştu"));
  };

  return (
    <div className="add-page">
      <section className="container">
        <h2>Yeni İş Ekle</h2>

        <form onSubmit={handleSubmit}>
          <AutoInput label="Pozisyon" name="position" />
          <AutoInput label="Şirket" name="company" />
          <AutoInput label="Lokasyon" name="location" />

          <Select label={"Durum"} options={statusOpt} name="status" />
          <Select label={"Tür"} options={typeOpt} name="type" />

          <div>
            <SubmitButton type="submit" text="Oluştur" />
          </div>
        </form>
      </section>
    </div>
  );
};

export default AddJob;
