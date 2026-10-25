import { useState } from 'react';

function TodoForm({ onAgregar }) {
  const [texto, setTexto] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    const limpio = texto.trim();

    if (limpio.length < 3) {
      setError('La tarea debe tener al menos 3 caracteres');
      return;
    }

    setError('');
    onAgregar(limpio);
    setTexto('');
  };

  return (
    <div className="todo-form-container">
      <form onSubmit={handleSubmit} className="todo-form" noValidate>
        <label htmlFor="todo-input" className="sr-only">
          Nueva tarea
        </label>
        <input
          id="todo-input"
          type="text"
          placeholder="Escribe una nueva tarea..."
          value={texto}
          onChange={(e) => {
            setTexto(e.target.value);
            if (error) setError('');
          }}
          aria-invalid={error ? 'true' : 'false'}
          aria-describedby="todo-error"
        />
        <button type="submit" className="btn-add">
          Agregar
        </button>
      </form>

      {error && (
        <p id="todo-error" className="error-msg" role="alert">
          {error}
        </p>
      )}
    </div>
  );
}

export default TodoForm;
