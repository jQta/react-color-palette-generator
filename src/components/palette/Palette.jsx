import "./Palette.scss";
import { CompactPicker } from "react-color";
import { useState, useRef } from "react";
import trash from "../../assets/icons/trash.svg";
import { useEffect } from "react";

export default function Palette() {
  const selector = [1, 2, 3, 4, 5];
  const ref = useRef(null);
  const [color, setColor] = useState("#999999");
  const [index, setIndex] = useState();
  const [selectorColor, setSelectorColor] = useState({
    selector1: color,
    selector2: color,
    selector3: color,
    selector4: color,
    selector5: color,
    title: "",
  });
  const [paletteSaved, setPaletteSaved] = useState([]);
  const [paletteList, setPaletteList] = useState([]);
  const [title, setTitle] = useState("");

  const toggleActive = ref => {
    if (!ref.current) {
      return;
    }
    if (!ref.current.classList.contains("palette-box__selector--circleactived")) {
      ref.current.classList.add("palette-box__selector--circleactived");
    } else {
      ref.current.classList.remove("palette-box__selector--circleactived");
      ref.current = null;
    }
  };

  const handleChange = e => {
    setColor(e.hex);
    if (ref.current) {
      ref.current.style.backgroundColor = e.hex;
    }
    switch (index) {
      case 0:
        setSelectorColor({ ...selectorColor, selector1: e.hex });
        break;
      case 1:
        setSelectorColor({ ...selectorColor, selector2: e.hex });
        break;
      case 2:
        setSelectorColor({ ...selectorColor, selector3: e.hex });
        break;
      case 3:
        setSelectorColor({ ...selectorColor, selector4: e.hex });
        break;
      case 4:
        setSelectorColor({ ...selectorColor, selector5: e.hex });
        break;
      default:
    }
  };

  function checkInput() {
    if (title.length !== 0) setPaletteList([...paletteList, paletteSaved]);
    setTitle(() => "");
  }

  useEffect(() => {
    setPaletteSaved({ ...selectorColor, title: title });
  }, [selectorColor, title]);

  const onDelete = index => {
    const newPalette = [...paletteList];
    newPalette.splice(index, 1);
    setPaletteList(newPalette);
  };

  return (
    <div className="palette-box">
      <div className="palette-box__selector">
        {selector.map((obj, index) => (
          <div
            key={index}
            className="palette-box__selector--circleinactived"
            onClick={e => {
              toggleActive(ref);
              ref.current = e.target;
              toggleActive(ref);
              setIndex(index);
            }}
          />
        ))}
      </div>
      <div className="compact-box__desktop">
        <div className="compact-box">
          <CompactPicker color={color} onChange={e => handleChange(e)} />
        </div>
        <div className="searcher-box">
          <h2 className="searcher-box__title">Name</h2>
          <div className="searcher-box__tools">
            <input className="searcher-box__tools--input" placeholder="Website color scheme" onChange={e => setTitle(e.target.value)} value={title} required />
            <button className="searcher-box__tools--add" onClick={checkInput}>
              +
            </button>
          </div>
        </div>
      </div>
      <div className="palettelist-box">
        <h2 className="palettelist-box__title">Saved palettes</h2>
        {paletteList.map((item, index) => (
          <div key={index}>
            <div className="palettelist-box__header">
              <h3 className="palettelist-box__header--title">{item.title}</h3>
              <img className="palettelist-box__header--trash" src={trash} alt="delete" onClick={() => onDelete(index)} />
            </div>
            <div className="palettelist-box__inventory">
              <div className="palettelist-box__inventory--circleinactived" style={{ background: item.selector1 }} />
              <div className="palettelist-box__inventory--circleinactived" style={{ background: item.selector2 }} />
              <div className="palettelist-box__inventory--circleinactived" style={{ background: item.selector3 }} />
              <div className="palettelist-box__inventory--circleinactived" style={{ background: item.selector4 }} />
              <div className="palettelist-box__inventory--circleinactived" style={{ background: item.selector5 }} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
