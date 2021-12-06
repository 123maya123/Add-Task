import React, { useEffect, useState } from "react";
import Tasks from "./components/Tasks/Tasks";
import NewTask from "./components/NewTask/NewTask";
import useHttp from "./hooks/use_http";

function App() {
  const [tasks, setTasks] = useState([]);
  
  const { isLoading, error, sendRequest: fetchTasks } = useHttp();
  //in firebase click on realtime DB then add that link above to connect to firebase DB

  useEffect(() => {
    const transformTasks = ((tasksObj) => {
      const loadedTasks = [];
  
      for (const taskkey in tasksObj) {
        loadedTasks.push({ id: taskkey, text: tasksObj[taskkey].text });
      }
      setTasks(loadedTasks);
    });//estTasks are ever gonna change so leave empthy array

    fetchTasks({ url: 'https://demo3-4033d-default-rtdb.firebaseio.com/tasks.json'}, transformTasks);
  }, [fetchTasks]);
 
  const taskAddHandler = (task) => {
    setTasks((prevTasks) => prevTasks.concat(task));
  }


  return (
    <React.Fragment>
      <NewTask onAddTask={taskAddHandler} />
      <Tasks
        items={tasks}
        loading={isLoading}
        error={error}
        onFetch={fetchTasks}
      />
    </React.Fragment>
  );
}

export default App;
