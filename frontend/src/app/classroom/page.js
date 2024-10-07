'use client'

import ClassroomBackground from '../public/background/classroomBackground.png';
import styled from 'styled-components';

export default function ClassroomPage() {
    return (
        <Container>
            <ClassroomHeader>
                <h1>Classroom</h1>
            </ClassroomHeader>
            <Content>
                <TeacherSection>
                    <TeacherInfo>
                        <h2>Test@uic.edu</h2>
                        <p>Aerospace Engineering</p>
                    </TeacherInfo>
                </TeacherSection>

                <BoardSection>
                    <BoardTitle>Class Goal</BoardTitle>
                    <BoardContent>
                        <p>Today we will be learning about the principles of aerodynamics.</p>
                    </BoardContent>
                </BoardSection>

                <StudentsSection>
                    <h2>Students</h2>
                    <StudentList>
                        <Student>Jane Smith</Student>
                        <Student>Tom Brown</Student>
                        <Student>Mary Johnson</Student>
                        <Student>Chris Evans</Student>
                    </StudentList>
                </StudentsSection>
            </Content>
        </Container>
    );
}

const Container = styled.div`
  background-image: url(${ClassroomBackground?.src});
  background-size: cover;
  background-position: center;
  height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  align-items: center;
  border-radius: 20px;
  overflow: hidden;
  margin: 5vh auto; /* Center the container */
  box-shadow: 0px 4px 15px rgba(0, 0, 0, 0.3);
`;

const ClassroomHeader = styled.header`
  text-align: center;
  background-color: rgba(139, 69, 19, 0.9); /* dark brown */
  color: white;
  padding: 10px;
  border-radius: 10px;
  margin-bottom: 20px;
  width: 70%;
  font-family: 'Courier New', Courier, monospace;
  margin-top: 20px;
`;

const Content = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 70%;
`;

const TeacherSection = styled.section`
  display: flex;
  align-items: center;
  background-color: rgba(210, 180, 140, 0.9); /* tan */
  padding: 15px;
  border-radius: 10px;
  margin-bottom: 20px;
  width: 100%;
  box-shadow: 0px 2px 8px rgba(0, 0, 0, 0.1);
`;

const TeacherInfo = styled.div`
  h2 {
    margin: 0;
    font-family: 'Courier New', Courier, monospace;
  }
  p {
    margin: 5px 0 0 0;
    font-family: 'Courier New', Courier, monospace;
  }
`;

const BoardSection = styled.div`
  background-color: rgba(160, 82, 45, 0.9); /* sienna */
  padding: 20px;
  border-radius: 10px;
  margin-bottom: 20px;
  width: 100%;
  box-shadow: 0px 2px 8px rgba(0, 0, 0, 0.1);
  color: white;
`;

const BoardTitle = styled.h3`
  margin: 0;
  font-size: 24px;
  font-family: 'Courier New', Courier, monospace;
`;

const BoardContent = styled.div`
  margin-top: 10px;
  p {
    margin: 5px 0;
    font-family: 'Courier New', Courier, monospace;
  }
`;

const StudentsSection = styled.section`
  background-color: rgba(222, 184, 135, 0.9); /* burlywood */
  padding: 20px;
  border-radius: 10px;
  width: 100%;
  box-shadow: 0px 2px 8px rgba(0, 0, 0, 0.1);
`;

const StudentList = styled.ul`
  list-style-type: none;
  padding: 0;
  font-family: 'Courier New', Courier, monospace;
`;

const Student = styled.li`
  padding: 10px;
  background-color: rgba(255, 228, 196, 0.8); /* bisque */
  border: 1px solid #deb887;
  border-radius: 5px;
  margin-bottom: 10px;
`;
