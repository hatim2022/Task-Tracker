import { useEffect, useState } from "react";
import AddTask from "./components/AddTask";
import Header from "./components/Header";
import Tasks from "./components/Tasks";


function App() {
    const [showAddTask,setShowAddTask]=useState(false)
    const [tasks,setTasks] = useState([]) 

    useEffect( function(){
      const getTasks = async () => {
      const tasksFromServer = await fetchTasks()
      setTasks(tasksFromServer)
      }
      getTasks()
      },[]);
      
      async function fetchTasks(){
        const res = await fetch('http://localhost:5000/tasks')
        const data = await res.json()
        return data;
      }

      async function fetchTask(id){
        const res = await fetch(`http://localhost:5000/tasks/${id}`)
        const data = await res.json()
        return data;
      }


  const deleteTask = async (id) => {
    await fetch(`http://localhost:5000/tasks/${id}`,{
      method: 'DELETE'
    })

    setTasks(tasks.filter((task)=> task.id !== id ))
  }

  async function toggleReminder(id){
    
    const taskToToggle = await fetchTask(id)
    const updTask = {...taskToToggle,
    reminder: !taskToToggle.reminder}

    const res = await fetch(`http://localhost:5000/tasks/${id}`,{
      method:'PUT',
      headers:{
        'Content-type': 'application/json'
      },
      body: JSON.stringify(updTask)
    })
    
    const data = await res.json()

    setTasks(
      tasks.map((task)=>
      task.id === id ? {...task,
        reminder:data.reminder}: task)
    )
  } 

  async function addTask(task) {

    const res = await fetch(`http://localhost:5000/tasks`,{
      method:'POST',
      headers:{
        'Content-type':'application/json'
      },
      body: JSON.stringify(task),
    });

    console.log(res);
    const data = await res.json()
    setTasks([...tasks,data])

  }

  return (
    <div className="container">
        <Header onAdd={() => setShowAddTask(!showAddTask)} 
          showAddTask={showAddTask}
        />
    {showAddTask && <AddTask onAdd={addTask}/> }
    {tasks.length > 0 ? <Tasks tasks={tasks} onDelete=
    {deleteTask} onToggle={toggleReminder} /> : 'no tasks to show'} 
    </div>
  );
}

export default App;
