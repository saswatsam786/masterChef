import "./App.css";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Home from "./pages/Home";
import Recipe from "./pages/Recipe";
import { auth } from "./firebaseConfig";
import { useAuthState } from "react-firebase-hooks/auth";
import styled from "styled-components";
import { mobile } from "./Utilities/responsive";
import LoginHeader from "./components/LoginHeader";
import Header from "./components/Header";

import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  const [user] = useAuthState(auth);

  return (
    <BrowserRouter className="App">
      <Container>
        {/* Home Container */}
        <HomeCon>
          <MainBox>
            {user ? <Header /> : <LoginHeader />}
            <Routes>
              <Route exact path="/" element={<Login />} />
              <Route
                exact
                path="/home"
                element={user ? <Home /> : <Navigate to="/" />}
              />
              <Route
                exact
                path="/home/:id"
                element={user ? <Recipe /> : <Login />}
              />
            </Routes>
          </MainBox>
        </HomeCon>
        <Circle top="4%" right="1.5%"></Circle>
        <Circle bottom="4%" left="2%"></Circle>
      </Container>
    </BrowserRouter>
  );
}

export default App;

const Container = styled.section`
  overflow: hidden;
`;

const HomeCon = styled.div`
  width: 100%;
  min-height: 100vh;
  background: linear-gradient(to right top, #65dfc9, #6cdbeb);
  display: flex;
  justify-content: center;
  align-items: center;
  box-shadow: 2px 2px 2px 4px #65dfc9;
`;

const MainBox = styled.div`
  background: white;
  width: 80%;
  min-height: 80vh;
  background: linear-gradient(
    to right bottom,
    rgba(255, 255, 255, 0.7),
    rgba(255, 255, 255, 0.3)
  );
  border-radius: 1rem;
  backdrop-filter: blur(0.5rem);
  z-index: 4;

  ${mobile({ width: "97%" })};
`;

const Circle = styled.div`
  background: white;
  height: 15rem;
  width: 15rem;
  border-radius: 50%;
  position: absolute;
  background: linear-gradient(
    to right bottom,
    rgba(255, 255, 255, 0.9),
    rgba(255, 255, 255, 0.2)
  );
  z-index: 2;
  top: ${(props) => props.top};
  right: ${(props) => props.right};
  bottom: ${(props) => props.bottom};
  left: ${(props) => props.left};
`;
