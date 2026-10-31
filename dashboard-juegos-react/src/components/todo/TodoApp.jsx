import { useState, useEffect } from 'react';
import TodoForm from './TodoForm';
import TodoList from './TodoList';

function TodoApp() {
  const [tareas, setTareas] = useState(() => {
    const guardadas = localStorage.getItem('react-todo-tareas');
    return guardadas
      ? JSON.parse(guardadas)
      : [
          { id: '1', texto: 'Aprender React', completada: true },
          { id: '2', texto: 'Hacer el Dashboard', completada: false },
        ];
  });

  useEffect(() => {
    localStorage.setItem('react-todo-tareas', JSON.stringify(tareas));
  }, [tareas]);

  const agregarTarea = (texto) => {
    const nuevaTarea = {
      id: crypto.randomUUID(),
      texto,
      completada: false,
    };
    setTareas([...tareas, nuevaTarea]);
  };

  const toggleTarea = (id) => {
    setTareas(
      tareas.map((t) =>
        t.id === id ? { ...t, completada: !t.completada } : t,
      ),
    );
  };

  const eliminarTarea = (id) => {
    setTareas(tareas.filter((t) => t.id !== id));
  };

  return (
    <div className="todo-app-react">
      <h2>To-Do App (React)</h2>
      <TodoForm onAgregar={agregarTarea} />
      <TodoList
        tareas={tareas}
        onToggle={toggleTarea}
        onEliminar={eliminarTarea}
      />
    </div>
  );
}

export default TodoApp;
