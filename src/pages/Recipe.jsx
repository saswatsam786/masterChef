import React from "react";
import styled from "styled-components";

import { useParams } from "react-router-dom";
import Food from "../components/Food";
import { auth } from "../firebaseConfig";
import { useNavigate } from "react-router-dom";
import { useAuthState } from "react-firebase-hooks/auth";

const Recipe = () => {
  const { id } = useParams();
  const [user] = useAuthState(auth);
  const Navigate = useNavigate();

  React.useEffect(() => {
    if (!user) Navigate("/");
  }, [Navigate, user]);
  console.log(id);
  return (
    <Container>
      <Food id={id} />
    </Container>
  );
};

export default Recipe;

const Container = styled.div`
  height: 100%;
`;
