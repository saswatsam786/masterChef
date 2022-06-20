import React from "react";
import styled from "styled-components";
import { db } from "../firebaseConfig";
import { mobile } from "../Utilities/responsive";
import EditIcon from "@mui/icons-material/Edit";
import IconButton from "@mui/material/IconButton";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { Button } from "react-bootstrap";
import EditModal from "./EditModal";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../firebaseConfig";
import CircularProgress from "@mui/material/CircularProgress";

const Food = ({ id }) => {
  const [user] = useAuthState(auth);
  const [data, setData] = React.useState([]);
  const [open, setOpen] = React.useState(false);

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
  };

  React.useEffect(() => {
    db.collection("recipes")
      .doc(id)
      .onSnapshot((snapshot) => {
        setData(snapshot.data());
      });
  }, [id]);

  let ingredients = data.ingredients + "_";
  let steps = data.steps + "_";

  ingredients = ingredients.split("_");
  steps = steps.split("_");

  console.log(user);

  return user ? (
    <>
      <Modal
        open={open}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Edit recipe Details
          </Typography>
          <EditModal data={data} id={id} />
          <Button
            onClick={() => {
              setOpen(!open);
            }}
            style={{ marginTop: "10px", backgroundColor: "red" }}
          >
            Cancel
          </Button>
        </Box>
      </Modal>
      <Container>
        <FoodImage>
          <Image src={data.imageUrl} alt={data.foodName} />
        </FoodImage>
        <Description>
          <FoodName>
            {data.foodName}{" "}
            {user.email === data.email ? (
              <span>
                <IconButton
                  onClick={() => {
                    setOpen(!open);
                  }}
                  style={{ color: "rgb(66, 102, 150)" }}
                >
                  <EditIcon />
                </IconButton>
              </span>
            ) : (
              ""
            )}
          </FoodName>
          <TotalIngredients>
            <Title>Ingredients</Title>
            <Ingredients>
              {[...ingredients].map((string) => {
                return <div> {string}</div>;
              })}
            </Ingredients>
          </TotalIngredients>
          <TotalSteps>
            <Title>Steps</Title>
            <Steps>
              {[...steps].map((string) => {
                return <div> {string}</div>;
              })}
            </Steps>
          </TotalSteps>
          <Courtesy>-By {data.user || "Anonymous"}</Courtesy>
        </Description>
      </Container>
    </>
  ) : (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <CircularProgress color="success" />
    </div>
  );
};

export default Food;

const Container = styled.div`
  display: flex;
  height: 80vh;
  ${mobile({ flexDirection: "column" })};
`;

const Courtesy = styled.div`
  color: rgb(101, 142, 198);
  float: right;
  margin-right: 10px;
`;

const FoodImage = styled.div`
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
`;

const Image = styled.img`
  object-fit: contain;
  max-width: 95%;
  border-radius: 10px;
`;

const Description = styled.div`
  flex: 2;
  overflow: scroll;
  margin: 10px;
  ${mobile({ margin: "20px" })};
`;

const FoodName = styled.h1`
  font-size: 50px;
  color: rgb(66, 102, 150);
`;

const TotalIngredients = styled.div`
  font-size: 18px;
`;

const Title = styled.h3`
  font-size: 25px;
  color: rgb(66, 102, 150);
`;

const Ingredients = styled.p`
  color: rgb(101, 142, 198);
  font-weight: 500;
  display: flex;
  flex-direction: column;
`;

const TotalSteps = styled.div``;

const Steps = styled.p`
  font-size: 18px;
  color: rgb(101, 142, 198);
  font-weight: 500;
`;
