import ClassroomBackground from '../public/background/classroomBacground.png'

export default function ClassroomPage() {
    return (
        <Container></Container>
    );
};

const Container = styled.div`
  background-image: url(${ClassroomBackground?.src});
  background-size: cover;
  background-position: center;
  height: 100vh;
  width: 100vw;
  display: flex;
  flex: 1;
`
