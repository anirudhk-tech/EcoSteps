import styled from "styled-components";
import { TaskBar } from "./taskBar";
import { useEffect, useState } from "react";
import { createClient } from '../../utils/supabase/client';

export const TasksBox = () => {
    const [completedTask, setCompletedTask] = useState(null);
    const [tasks, setTasks] = useState([]);
    const [email, setEmail] = useState('');
    const supabase = createClient();
    
    const FetchUser = async () => {
        const { data, error } = await supabase.auth.getUser();
        if (error || !data?.user) {
          throw new Error('Failed to fetch user');
        }
      
        setEmail(data.user.email);
    };

    const GetTasks = async () => {
        try {
            const response = await fetch('http://localhost:4000/tasks/', {
                method: 'GET',
            })
            const data = await response.json();
            setTasks(data.slice(0,3));
        } catch (error) {
            console.log("Error occurred while fetching tasks: ", error);
        }
    };

    const GetRandom = async (id) => {
        try {
            const response = await fetch('http://localhost:4000/tasks/random', {
                method: 'POST',
                body: JSON.stringify({ email: email })
            })
            const task = await response.json();

            setTasks([task, ...tasks.filter(task => task.id != id)]);
        } catch (error) {
            console.log("Error while changing tasks: ", error);
        }
    }

    useEffect(() => {
        GetTasks();
        FetchUser();
    }, []);

    useEffect(() => {
        if (completedTask !== null) {
            GetRandom(completedTask);
        };
    }, [completedTask]);

    console.log(tasks);
    
    return (
        <Container>
            {
            tasks.map((task) => (
                <TaskBar 
                key={task.id + 1} 
                desc={task.task} 
                badge_number={task.id} 
                setCompleted={setCompletedTask}
                />
            ))
            }
        </Container>
    ) 
}

const Container = styled.div`
  display: flex;
  flex: 1;
  background-color: rgb(209,201,196);
  clip-path: polygon(20px 0px, calc(100% - 20px) 0px, 100% 20px, 100% calc(100% - 20px), calc(100% - 20px) 100%, 20px 100%, 0px calc(100% - 20px), 0px 20px);
  flex-direction: column;
  padding: 3vh;
  gap: 2vh;
  cursor: pointer;
`