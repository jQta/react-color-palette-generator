import { useState, useEffect } from "react";
import { API } from "../../shared/services/api";

export default function Generator({ selectorColor, Data }) {
  const [paletteSaved, setPaletteSaved] = useState([]);
  const [title, setTitle] = useState("");

  useEffect(() => {
    setPaletteSaved({ ...selectorColor, title: title });
    Data();
  }, [selectorColor, title, Data]);

  function checkInput() {
    if (title.length !== 0) API.post("palettes/add", paletteSaved);
    setTitle(() => "");
  }

  return (
    <div className="generator-box">
      <h2 className="generator-box__title">Name</h2>
      <div className="generator-box__tools">
        <input className="generator-box__tools--input" placeholder="Website color scheme" onChange={e => setTitle(e.target.value)} value={title} required />
        <button className="generator-box__tools--add" onClick={checkInput}>
          +
        </button>
      </div>
    </div>
  );
}
