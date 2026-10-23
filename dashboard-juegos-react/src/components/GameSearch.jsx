import { memo } from 'react';

const GameSearch = memo(function GameSearch({ value, onChange }) {
  return (
    <div className="search-container">
      <label htmlFor="search-input" className="sr-only">
        Buscar juego
      </label>
      <input
        type="text"
        placeholder="Buscar juego ..."
        id="search-input"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="search-input"
      />
    </div>
  );
});

export default GameSearch;
