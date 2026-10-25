function TodoList({ tareas, onToggle, onEliminar }) {
  if (tareas.length === 0) {
    return <p className="todo-empty">No hay tareas pendientes.</p>;
  }

  return (
    <ul className="todo-list">
      {tareas.map((tarea) => (
        <li key={tarea.id} className={tarea.completada ? 'completada' : ''}>
          <span className="todo-texto">{tarea.texto}</span>
          
          <div className="todo-actions">
            <button
              onClick={() => onToggle(tarea.id)}
              className="btn-toggle"
              aria-label={`Marcar ${tarea.texto} como ${
                tarea.completada ? 'pendiente' : 'completada'
              }`}
            >
              {tarea.completada ? '↺' : '✓'}
            </button>
            
            <button
              onClick={() => onEliminar(tarea.id)}
              className="btn-delete"
              aria-label={`Eliminar ${tarea.texto}`}
            >
              ✕
            </button>
          </div>
        </li>
      ))}
    </ul>
  );
}

export default TodoList;