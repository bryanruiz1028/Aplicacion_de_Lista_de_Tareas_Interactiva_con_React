import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [task, setTask] = useState(''); // Estado para almacenar el valor del campo de entrada de texto
  const [taskList, setTaskList] = useState(() => {
    // Estado para almacenar la lista de tareas
    const storedTasks = JSON.parse(localStorage.getItem('tasks')); // Obtener las tareas almacenadas en el local storage
    return storedTasks ? storedTasks : []; // Si hay tareas almacenadas, se utilizan, de lo contrario, se inicializa como una lista vacía
  });

  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(taskList)); // Almacenar las tareas en el local storage cada vez que se actualice el estado de la lista
  }, [taskList]);

  const [editIndex, setEditIndex] = useState(null); // Índice de la tarea que se está editando

  const handleInputChange = (event) => {
    setTask(event.target.value); // Actualizar el estado de la tarea con el valor del campo de entrada de texto
  };

  const addTask = () => {
    if (task.trim() !== '') {
      if (editIndex !== null) {
        // Si hay un índice de edición, se actualiza la tarea existente
        const updatedTasks = [...taskList];
        updatedTasks[editIndex] = task;
        setTaskList(updatedTasks);
        setEditIndex(null); // Restablecer el índice de edición a null
      } else {
        // Si no hay un índice de edición, se agrega una nueva tarea
        setTaskList([...taskList, task]);
      }
      setTask(''); // Restablecer el campo de entrada de texto a un valor vacío
    }
  };

  const editTask = (index) => {
    setTask(taskList[index]); // Establecer el valor de la tarea que se está editando en el campo de entrada de texto
    setEditIndex(index); // Guardar el índice de la tarea que se está editando
  };

  const deleteTask = (index) => {
    const updatedTasks = [...taskList];
    updatedTasks.splice(index, 1); // Eliminar la tarea del índice especificado
    setTaskList(updatedTasks); // Actualizar la lista de tareas
  };

  return (
    <div className="App">
      <h1>Todo List</h1>
      <input type="text" value={task} onChange={handleInputChange} /> {/* Campo de entrada de texto */}
      <button onClick={addTask}>{editIndex !== null ? 'Edit Task' : 'Add Task'}</button> {/* Botón para agregar o editar tarea */}
      <ul>
        {taskList.map((task, index) => (
          <li key={index}>
            {task}
            <button onClick={() => editTask(index)}>Edit</button> {/* Botón para editar tarea */}
            <button onClick={() => deleteTask(index)}>Delete</button> {/* Botón para eliminar tarea */}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
