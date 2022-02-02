import { useEffect, useState } from "react";
import AddTask from "./components/AddTask";
import Header from "./components/Header";
import Tasks from "./components/Tasks";
import agent from "./service/agent"

const API_URL = "https://task-manager-v-12.herokuapp.com"

function App() {
    const [showAddTask,setShowAddTask]=useState(false)
    const [tasks,setTasks] = useState([]) 

    useEffect(() => {
      async function fetchMyApi(){
      agent.getAllTasks().then(setTasks);
      }
      fetchMyApi()
    },[]);
      

  const deleteTask = async (id) => {
    
    agent.deleteTask(id);
    setTasks(tasks.filter((task)=> task.id !== id ))
  }

  async function toggleReminder(id){
    
    const taskToToggle = await agent.getTask(id)
    const updTask = {...taskToToggle,
    reminder: !taskToToggle.reminder}

    const res = await agent.updateTask(updTask,id);    
    const data = await res.data

    setTasks(
      tasks.map((task)=>
      task.id === id ? {...task,
        reminder:data.reminder}: task)
    )
  } 

  async function addTask(task) {

    const res = await agent.addTask(task);

    console.log(res);
    const data = await res.data
    setTasks([...tasks,data])

  }

  return (
    <div className="container">
        <Header onAdd={() => setShowAddTask(!showAddTask)} 
          showAddTask={showAddTask}
        />
    {showAddTask && <AddTask onAdd={addTask}/> }
    {tasks.length > 0 ? <Tasks tasks={tasks} onDelete=
    {deleteTask} onToggle={toggleReminder} /> : 'No tasks to show '} 
    </div>
  );
}

export default App;
