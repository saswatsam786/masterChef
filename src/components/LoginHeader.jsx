import React from "react";
import styled from "styled-components";
import Logo from "../Utilities/Logo.png";
import { auth } from "../firebaseConfig";
import { useAuthState } from "react-firebase-hooks/auth";

const Header = () => {
  const [user] = useAuthState(auth);

  return user ? (
    ""
  ) : (
    <NavBar>
      <NavUl>
        <Navli>
          <ImageLogo src={Logo} alt="Logo" />
        </Navli>
      </NavUl>
    </NavBar>
  );
};

export default Header;

const NavBar = styled.nav`
  padding: 30px 30px 20px 30px;
`;

const NavUl = styled.ul`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Navli = styled.li`
  ${(props) =>
    props.login && {
      padding: "10px",
      borderRadius: "10px",
      color: "#426696",
      background: `linear-gradient(
    to left top,
    #65dfc9,
    #6cdbeb
  )`,
      transition: "0.3s ease-in-out",
      listStyleType: "none",
    }}
  cursor: pointer;

  &::marker {
    font-size: 0;
  }

  &:hover {
    background: ${(props) =>
      props.login &&
      `linear-gradient(
    to right bottom,
    #26a890, #3fe3fb
  )`};
  }
`;

const ImageLogo = styled.img`
  max-width: 140px;
  object-fit: contain;
  border-radius: 20px;
`;
