import "./Palette.scss";
import { CompactPicker } from "react-color";
import { useState } from "react";

export default function Palette() {
  const [selector, setSelector] = useState({
    activeObject: null,
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
          <input className="searcher-box__tools--input" placeholder="Website color scheme" />
          <button className="searcher-box__tools--add">+</button>
        </div>
      </div>
    </div>
  );
}
