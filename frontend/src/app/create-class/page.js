'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import styled from 'styled-components';
import ClassroomBackground from '../public/background/classroomBackground.png';


export default function CreateClassForm() {
    const [teacherEmail, setTeacherEmail] = useState('');
    const [teacherGoal, setTeacherGoal] = useState('');
    const [classes, setClasses] = useState([]);
    const [errorMessage, setErrorMessage] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const router = useRouter();

    useEffect(() => {
        // Fetch the list of classes 
        const fetchClasses = async () => {
            try {
                const response = await fetch('http://localhost:4000/users/classes');
                const data = await response.json();

                if (response.ok) {
                    setClasses(data); // Assuming the data is an array of classes
                } else {
                    setErrorMessage(data.error || 'Failed to fetch classes.');
                }
            } catch (error) {
                setErrorMessage('Failed to fetch classes.');
            }
        };

        fetchClasses();
    }, []);

    const handleCreateClass = async (e) => {
        e.preventDefault();

        // Clear previous messages
        setErrorMessage('');
        setSuccessMessage('');

        // Send the class creation request to the backend
        try {
            const response = await fetch('http://localhost:4000/users/createclass', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    teacher: teacherEmail,
                    goal: teacherGoal,
                }),
            });

            const data = await response.json();

            if (response.ok) {
                // Class created successfully
                setSuccessMessage('Class created successfully!');
                setClasses([...classes, data.newClass]); // Add the new class to the list
                router.push('/dashboard'); // Redirect to the dashboard
            } else {
                // Handle errors from the backend
                setErrorMessage(data.error || 'Failed to create class.');
            }
        } catch (error) {
            // Handle any network errors
            setErrorMessage('Something went wrong. Please try again.');
        }
    };

    return (
        <Container>
            <FormContainer>
                <h2>Create a New Class</h2>
                <Form onSubmit={handleCreateClass}>
                    <Input
                        type="email"
                        placeholder="Teacher's Email"
                        value={teacherEmail}
                        onChange={(e) => setTeacherEmail(e.target.value)}
                        required
                    />
                    <Textarea
                        placeholder="Teacher's Goal"
                        value={teacherGoal}
                        onChange={(e) => setTeacherGoal(e.target.value)}
                        required
                    />
                    <Button type="submit">Create Class</Button>
                </Form>
                {successMessage && <SuccessText>{successMessage}</SuccessText>}
                {errorMessage && <ErrorText>{errorMessage}</ErrorText>}
            </FormContainer>

            <ClassesContainer>
                <h3>Your Classes</h3>
                {classes.length > 0 ? (
                    <ClassList>
                        {classes.map((classItem) => (
                            <ClassItem key={classItem.code} className='flex-col'>
                                <div className='flex-col'>
                                    <strong>Teacher:</strong> {classItem?.teacher}<br />
                                    <strong>Goal:</strong> {classItem?.goal}<br />
                                    <strong>Created At:</strong> {new Date(classItem?.created_at).toLocaleString()}<br />
                                    <strong>Number of Students:</strong> {classItem?.students.length}
                                </div>
                                <Button className='btn btn-primary'>Join</Button>
                            </ClassItem>
                        ))}
                    </ClassList>
                ) : (
                    <p>No classes created yet.</p>
                )}
            </ClassesContainer>
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
`;

const FormContainer = styled.div`
    width: 70%;
    margin-bottom: 20px;
`;

const Form = styled.form`
    display: flex;
    flex-direction: column;
    gap: 10px;
`;

const Input = styled.input`
    padding: 10px;
    border: 1px solid #b07e53;  // Brown border color
    border-radius: 4px;
    font-size: 16px;
`;

const Textarea = styled.textarea`
    padding: 10px;
    border: 1px solid #b07e53;  // Brown border color
    border-radius: 4px;
    font-size: 16px;
    resize: none;
`;

const Button = styled.button`
    padding: 10px;
    background-color: #6b4226;  // Dark brown button
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    font-size: 16px;

    &:hover {
        background-color: #54331c;  // Darker shade on hover
    }
`;

const SuccessText = styled.p`
    color: #3b7d2b;  // Dark green for success message
    font-size: 14px;
    margin-top: 10px;
`;

const ErrorText = styled.p`
    color: #b03030;  // Dark red for error message
    font-size: 14px;
    margin-top: 10px;
`;

const ClassesContainer = styled.div`
    width: 70%;
    background-color: #fff;
    border-radius: 8px;
    padding: 20px;
    box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.05);
`;

const ClassList = styled.ul`
    list-style-type: none;
    padding: 0;
`;

const ClassItem = styled.li`
    background-color: #e0c6a9;  // Light brown for class items
    padding: 10px;
    margin: 5px 0;
    border-radius: 4px;
`;

