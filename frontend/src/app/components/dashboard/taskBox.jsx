import styled from "styled-components";
import { TaskBar } from "./taskBar";
import { useEffect, useState } from "react";
import { createClient } from '../../utils/supabase/client';

export const TasksBox = () => {
    const [tasks, setTasks] = useState([]);
    const [email, setEmail] = useState('test@uic.edu');

    useEffect(() => {
        const user = async () => {
            const supabase = createClient();
            const { data, error } = await supabase.auth.getUser();
            if (error || !data?.user) {
              router.push('/signin');
              return;
            }
            setEmail(data.user.email);
        }
        const GetTasks = async (email) => {
            try {
                const response = await fetch('http://localhost:4000/users/tasks', {
                    method: 'POST',
                    body: JSON.stringify({ email: email }), // Use email here
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });
                const data = await response.json();
                setTasks(data);
            } catch (error) {
                console.log("Error occurred while fetching tasks: ", error);
            }
        };
        user();
        GetTasks(email); // Call GetTasks with the email
    }, []);


    const GetRandom = async (id) => {
        try {
            const response = await fetch('http://localhost:4000/tasks/random', {
                method: 'POST',
                body: JSON.stringify({ email }), // Use email here too
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            const newTask = await response.json();

            // Replace the completed task with the new one
            setTasks((prevTasks) => [
                newTask,
                ...prevTasks.filter((task) => task.id !== id),
            ]);
        } catch (error) {
            console.log("Error while changing tasks: ", error);
        }
    };

    const handleTaskCompletion = (taskId) => {
        GetRandom(taskId); // Call GetRandom when a task is completed
    };

    return (
        <Container>
            {Array.isArray(tasks) ? 
            tasks.map((task) => (
                <TaskBar
                    key={task.id}
                    desc={task.task}
                    badge_number={task.id}
                    setCompleted={() => handleTaskCompletion(task.id)} // Pass the task ID when completed
                />
            )) : null}
        </Container>
    );
};

const Container = styled.div`
  display: flex;
  flex: 1;
  background-color: rgb(209, 201, 196);
  clip-path: polygon(20px 0px, calc(100% - 20px) 0px, 100% 20px, 100% calc(100% - 20px), calc(100% - 20px) 100%, 20px 100%, 0px calc(100% - 20px), 0px 20px);
  flex-direction: column;
  padding: 3vh;
  gap: 2vh;
  cursor: pointer;
`;
