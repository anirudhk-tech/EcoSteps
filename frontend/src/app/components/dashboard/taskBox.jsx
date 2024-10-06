import styled from "styled-components";
import { TaskBar } from "./taskBar";
import { useState } from "react";

export const TasksBox = () => {
    const [hoveredTask, setHoveredTask] = useState(null);

    const tasks = [
        "Don't use a plastic water bottle today",
        "Go for a 15 minute walk",
        "Read a GLOBE article",
    ]
    
    if (!hoveredTask) {
        return (
            <Container>
                {
                tasks.map((task, idx) => (
                    <TaskBar desc={task} badge_number={idx + 1} taskState={setHoveredTask}/>
                ))
                }
            </Container>
        )
    } else {
        <Container>
        </Container>
    }
}

const Container = styled.div`
  display: flex;
  flex: 1;
  background-color: rgb(209,201,196);
  border-radius: 17px;
  border: 2px solid black;
  flex-direction: column;
  padding: 3vh;
  gap: 2vh;
`