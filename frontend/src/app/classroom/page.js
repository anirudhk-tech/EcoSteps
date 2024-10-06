'use client';
import styled from 'styled-components';

export default function Classroom() {
  return (
    <ClassroomContainer>
      <ClassroomHeader>
        <h1>Classroom</h1>
      </ClassroomHeader>
      
      <TeacherSection>
        <TeacherInfo>
          <h2>Mr. John Doe</h2>
          <p>Subject: Mathematics</p>
        </TeacherInfo>
      </TeacherSection>

      <BoardSection>
        <BoardTitle>Today's Lesson</BoardTitle>
        <BoardContent>
          <p>Topic: Algebraic Expressions</p>
          <p>Homework: Solve 5 practice questions from Chapter 4</p>
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
    </ClassroomContainer>
  );
}

const ClassroomContainer = styled.div`
  display: flex;
  flex-direction: column;
  background-color: #f5f5f5;
  border-radius: 10px;
  padding: 20px;
  width: 80vw;
  margin: 0 auto;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
`;

const ClassroomHeader = styled.header`
  text-align: center;
  background-color: #4caf50;
  color: white;
  padding: 10px;
  border-radius: 10px;
  margin-bottom: 20px;
`;

const TeacherSection = styled.section`
  display: flex;
  align-items: center;
  background-color: #e0f7fa;
  padding: 15px;
  border-radius: 10px;
  margin-bottom: 20px;
`;

const TeacherImage = styled.img`
  width: 80px;
  height: 80px;
  border-radius: 50%;
  margin-right: 20px;
`;

const TeacherInfo = styled.div`
  h2 {
    margin: 0;
  }
  p {
    margin: 5px 0 0 0;
  }
`;

const BoardSection = styled.div`
  background-color: #ffe0b2;
  padding: 20px;
  border-radius: 10px;
  margin-bottom: 20px;
`;

const BoardTitle = styled.h3`
  margin: 0;
  font-size: 24px;
`;

const BoardContent = styled.div`
  margin-top: 10px;
  p {
    margin: 5px 0;
  }
`;

const StudentsSection = styled.section`
  background-color: #fff;
  padding: 20px;
  border-radius: 10px;
`;

const StudentList = styled.ul`
  list-style-type: none;
  padding: 0;
`;

const Student = styled.li`
  padding: 10px;
  background-color: #e3f2fd;
  border: 1px solid #bbdefb;
  border-radius: 5px;
  margin-bottom: 10px;
`;
