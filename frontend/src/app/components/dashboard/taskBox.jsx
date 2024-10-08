'use client'
import styled from "styled-components";
import { TaskBar } from "./taskBar";
import { useEffect, useState } from "react";
import { createClient } from '../../utils/supabase/client';
import { useRouter } from 'next/navigation';

export const TasksBox = () => {
    const [tasks, setTasks] = useState([]);
    const router = useRouter();
    
    useEffect(() => {
        const GetTasks = async () => {
            try {
                const supabase = createClient();
                const info = await supabase.auth.getSession()
                if (!info) {
                    router.push('/signin');
                    return;
                }
                const response = await fetch('http://localhost:4000/tasks', {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });
                const data = await response.json();
                console.log("Tasks fetched successfully: ", data);
                setTasks(data);
            } catch (error) {
                console.log("Error occurred while fetching tasks: ", error);
            }
        };
        GetTasks();
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
            {tasks?.map((task) => (
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
