import "./App.scss";
import palette from "./assets/icons/palette.svg";
import Palette from "./components/palette/Palette";

function App() {
  return (
    <div className="app">
      <header className="header">
        <img src={palette} className="header__logo" alt="logo" />
        <h1 className="header__title">Color palette generator</h1>
      </header>
      <Palette />
    </div>
  );
}

export default App;
