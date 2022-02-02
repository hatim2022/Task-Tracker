import axios from "axios"


const API_URL = "https://task-manager-v-12.herokuapp.com/";


class Agent {

  
   getAllTasks = async() => {
       const data= await axios.get(API_URL+"tasks").then(
        res => {
            return res.data;
        })
        .catch(function(){
          return null;
        })
        return data;
      }
      

    getTask = async(id) => {
       const data = await axios.get(API_URL+`tasks/${id}`).then(
          res => {
            return res.data;
          }).catch(function(){
            return null;
          }
          )
          return data;
      }


    deleteTask = async (id) => {
      await axios.delete(API_URL+`tasks/${id}`);
    }

    addTask =  async (task) => {
      console.log(task)
        const res = await axios.post(API_URL+`tasks/add`,{
            "title":task.text,
            "description":task.text,
            "date":task.day,
            "reminder":task.reminder
        }).then(
          response => {
            return response
          }
        ).catch(
          err => {console.log(err)}
        )
        console.log(res);
        return res;
      }

    updateTask = async(updTask,id) => {
        const res = await axios.put(API_URL+`/tasks/${id}`,{
          "title":updTask.title,
          "description":updTask.description,
          "date":updTask.date,
          "reminder":updTask.reminder
          }).then(
            response => {
              return response
            }
          ).catch(
            err => {
              console.log(err)
            }
          )
          return res;
    }   

}
export default new Agent();