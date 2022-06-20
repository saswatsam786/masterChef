import React from "react";
import styled from "styled-components";
import { db } from "../firebaseConfig";

const Home = () => {
  const [data, setData] = React.useState([]);
  React.useEffect(() => {
    db.collection("recipes").onSnapshot((snapshot) => {
      setData(
        snapshot.docs.map((snap) => ({
          label: snap.data().imageUrl,
          id: snap.id,
          foodName: snap.data().foodName,
        }))
      );
    });
  }, []);

  return (
    <Container>
      <Box>
        {data.map((value, key) => (
          <Food
            src={value.label}
            alt={value.foodName}
            onClick={() => {
              window.location = `/home/${value.id}`;
            }}
            key={key}
          />
        ))}
      </Box>
    </Container>
  );
};

export default Home;

const Container = styled.div`
  height: 80vh;
  overflow: scroll;
`;

const Box = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
`;

const Food = styled.img`
  max-width: 300px;
  margin: 10px;
  border-radius: 10px;
  cursor: pointer;
  transition: all 0.5s;

  &:hover {
    transform: scale(1.05);
    border-radius: 10px;
  }
`;
