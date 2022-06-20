import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { mobile } from "../Utilities/responsive";
import { db, auth, provider } from "../firebaseConfig";
import { useAuthState } from "react-firebase-hooks/auth";

const Home = () => {
  const navigate = useNavigate();
  const [user] = useAuthState(auth);

  useEffect(() => {
    if (user) navigate("/home");
  }, [navigate, user]);

  // Google authentication sign in
  const signin = async (e) => {
    e.preventDefault();
    provider.setCustomParameters({ prompt: "select_account" });
    await auth
      .signInWithPopup(provider)
      .catch(alert)
      .then(() => {
        const user = auth.currentUser;
        let acc = false;
        db.collection("accounts")
          .get()
          .then((querySnapshot) => {
            querySnapshot.forEach(async (doc) => {
              if (doc.data().email === user.email) {
                acc = true;
              }
            });
            if (acc === false) createAccount();
          });
      });
  };

  // first login adds data to database and creates new account
  async function createAccount() {
    const user = auth.currentUser;

    db.collection("accounts")
      .add({
        name: user.displayName,
        email: user.email,
      })
      .catch((err) => {
        console.log(err);
      });
  }

  return (
    <>
      <MainContent>
        <MainText>
          <h1>
            Master <span>Chef</span>
          </h1>
          <h2>A recipe website for the common man and woman</h2>
          <p>Get recipe of various dishes at the tip of you hand</p>
          <Button onClick={signin}>Login Now</Button>
        </MainText>
        <MainImage>
          <lottie-player
            src="https://assets3.lottiefiles.com/packages/lf20_ysas4vcp.json"
            background="transparent"
            loop
            autoplay
            style={{ width: "80%" }}
          ></lottie-player>
        </MainImage>
      </MainContent>
    </>
  );
};

export default Home;

const MainContent = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px 50px;
  ${mobile({ flexDirection: "column-reverse" })}
`;

const MainText = styled.div`
  flex: 1;
  & > h1 {
    font-size: 2.5rem;
    margin-bottom: 10px;
    color: #426696;
  }
  & > h2 {
    font-size: 2rem;
    font-weight: 200;
  }

  & > p {
    font-size: 1rem;
    font-weight: 100;
    margin: 18px 0 40px;
  }

  &:after {
    content: "";
    width: 5px;
    height: 20%;
    background: #089d8f;
    position: absolute;
    left: 2.4rem;
    top: 19rem;
    ${mobile({ bottom: "11rem" })}
  }

  ${mobile({ marginTop: "10px" })}
`;

const Button = styled.button`
  padding: 15px;
  border-radius: 10px;
  color: #426696;
  font-size: 1.2rem;
  background: linear-gradient(to left top, #65dfc9, #6cdbeb);
  transition: 0.3s ease-in-out;
  outline: none;
  border: none;
  transition: all 1s ease;
  cursor: pointer;
  &:hover {
    background: linear-gradient(to right bottom, #26a890, #3fe3fb);
    transition: all 1s ease-in-out;
  }
`;

const MainImage = styled.div`
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
`;
