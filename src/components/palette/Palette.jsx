import "./Palette.scss";
import { CompactPicker } from "react-color";
import { useState } from "react";
import trash from "../../assets/icons/trash.svg";

export default function Palette() {
  const [selector, setSelector] = useState({
    activeObject: null,
    title: "",
    objects: [
      { id: 1, color: { backgroundColor: "#999999" } },
      { id: 2, color: { backgroundColor: "#999999" } },
      { id: 3, color: { backgroundColor: "#999999" } },
      { id: 4, color: { backgroundColor: "#999999" } },
      { id: 5, color: { backgroundColor: "#999999" } },
    ],
  });

  const handleClick = index => {
    setSelector({ ...selector, activeObject: selector.objects[index] });
  };

  const toggleActive = index => {
    if (selector.objects[index] === selector.activeObject) {
      return "palette-box__selector--circleactived";
    } else {
      return "palette-box__selector--circleinactived";
    }
  };

  const [color, setColor] = useState("#999999");

  const handleChange = color => {
    setColor(color.hex);
  };

  const styles = {
    backgroundColor: color,
  };

  const [input, setInput] = useState();
  const [paletteSaved, setPaletteSaved] = useState([]);
  const [paletteList, setPaletteList] = useState([]);

  function checkInput() {
    if (input === undefined) {
      console.log("escribe algo");
    } else {
      setPaletteSaved({ ...selector, title: input });
      setPaletteList([...paletteList, paletteSaved]);
    }
  }
  console.log("selector", selector);
  console.log(paletteList);

  return (
    <div className="palette-box">
      <div className="palette-box__selector">
        {selector.objects.map((obj, index) => (
          <div key={index} className={toggleActive(index)} style={selector.objects[index] === selector.activeObject ? styles : null} onClick={() => handleClick(index)} />
        ))}
      </div>
      <div className="compact-box">
        <CompactPicker color={color} onChange={handleChange} />
      </div>
      <div className="searcher-box">
        <h2 className="searcher-box__title">Name</h2>
        <div className="searcher-box__tools">
          <input className="searcher-box__tools--input" placeholder="Website color scheme" onChange={e => setInput(e.target.value)} />
          <button className="searcher-box__tools--add" onClick={checkInput}>
            +
          </button>
        </div>
        <div>
          <h2>Saved palettes</h2>
          {paletteList.map((item, index) => (
            <div key={index}>
              <h3>{item.title}</h3>
              <img src={trash} alt="delete" />
              {/* {item.objects.map((obj, index) => (
                <div key={index} />
              ))} */}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}


