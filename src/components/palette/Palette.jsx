import "./Palette.scss";
import { CompactPicker } from "react-color";
import { useState, useRef } from "react";
import { API } from "../../shared/services/api";
import trash from "../../assets/icons/trash.svg";
import axios from "axios";
import Generator from "../generator/Generator";

const baseURL = process.env.REACT_APP_BACK_URL;

export default function Palette() {
  const selector = [1, 2, 3, 4, 5];
  const ref = useRef(null);
  const [color, setColor] = useState("#2c2c2c");
  const [index, setIndex] = useState();
  const [selectorColor, setSelectorColor] = useState({
    selector1: color,
    selector2: color,
    selector3: color,
    selector4: color,
    selector5: color,
  });
  const [paletteList, setPaletteList] = useState([]);

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

  const Data = async () => {
    const res = await axios.get(baseURL + "palettes");
    setPaletteList(res.data);
  };

  const onDelete = item => {
    API.delete(`palettes/${item._id}`).then(() => {
      Data();
    });
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
        <Generator Data={Data} selectorColor={selectorColor} />
      </div>
      <div className="palettelist-box">
        <h2 className="palettelist-box__title">Saved palettes</h2>
        <div className="palettelist-container">
          {paletteList.map((item, index) => (
            <div key={index}>
              <div className="palettelist-box__header">
                <h3 className="palettelist-box__header--title">{item.title}</h3>
                <img className="palettelist-box__header--trash" src={trash} alt="delete" onClick={() => onDelete(item)} />
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
    </div>
  );
}
