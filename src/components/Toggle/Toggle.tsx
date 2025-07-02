import React from "react";
import "./Toggle.scss";

interface FavoritesToggleProps {
  checked: boolean;
  onToggle: (checked: boolean) => void;
}

const Toggle: React.FC<FavoritesToggleProps> = ({ checked, onToggle }) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onToggle(e.target.checked);
  };

  return (
    <div className="favorites_toggle">
      <label htmlFor="genre-switch" className="switch_label">
        Show Favorites
      </label>
      <label className="switch">
        <input
          id="genre-switch"
          type="checkbox"
          checked={checked}
          onChange={handleChange}
        />
        <span className="slider round"></span>
      </label>
    </div>
  );
};

export default Toggle;
