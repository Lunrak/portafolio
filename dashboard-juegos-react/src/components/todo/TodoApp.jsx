import { useState } from 'react';
import { TodoForm } from './TodoForm';
import { TodoList } from './TodoList';

const TAREAS_INICIALES = [
  { id: '1', texto: 'Aprender React', completada: true },
  { id: '2', texto: 'Hacer el Dashboard', completada: false },
];

function TodoApp() {
  const [tareas, setTareas] = useState(TAREAS_INICIALES);

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
      <h2>To-Do App</h2>

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
