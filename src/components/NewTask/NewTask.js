import Section from "../UI/Section";
import TaskForm from "./TaskForm";
import useHttp from "../../hooks/use_http";
//we have some code duplications in App.js n NewTask.js where we try to get n post data so use customHook
//here useHttp is our custom hook
const NewTask = (props) => {
  const { isLoading, error, sendRequest: sendTaskRequest } = useHttp();

const createTask = (taskText, taskData) => {
  const generatedId = taskData.name; // firebase-specific => "name" contains generated id
      const createdTask = { id: generatedId, text: taskText };

      props.onAddTask(createdTask);

}
  const enterTaskHandler = async (taskText) => {
    sendTaskRequest({
      url: "https://demo3-4033d-default-rtdb.firebaseio.com/tasks.json",
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: { text: taskText }
    }, createTask.bind(null, taskText)
    );
  };

  return (
    <Section>
      <TaskForm onEnterTask={enterTaskHandler} loading={isLoading} />
      {error && <p>{error}</p>}
    </Section>
  );
};

export default NewTask;
