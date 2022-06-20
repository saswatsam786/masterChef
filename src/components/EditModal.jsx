import * as React from "react";
import { Form, Button } from "react-bootstrap";
import { db, storage } from "../firebaseConfig";

export default function EditModal(props) {
  const [image, setImage] = React.useState(null);
  const [progress, setProgress] = React.useState(0);

  const initialState = {
    foodName: props.data.foodName,
    ingredients: props.data.ingredients,
    steps: props.data.steps,
  };

  const [data, setData] = React.useState(initialState);
  const { foodName, ingredients, steps } = data;

  const handleChange = (e) => {
    if (e.target.files[0]) {
      setImage(e.target.files[0]);
    }
  };

  const handleChangeInput = (e) => {
    const { name, value } = e.target;
    setData({ ...data, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(data);
    handleUpload();
  };

  const handleUpload = () => {
    const uploadTask = storage.ref(`images/${image.name}`).put(image);
    uploadTask.on(
      "state_changes",
      (snapshot) => {
        // progress function
        const progress = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );
        setProgress(progress);
      },
      (error) => {
        //Error Function
        console.log(error);
        alert(error.message);
      },
      () => {
        storage
          .ref("images")
          .child(image.name)
          .getDownloadURL()
          .then(async (url) => {
            const variable = db.collection("recipes").doc(props.id);

            await variable
              .update({
                imageUrl: url,
                foodName: data.foodName,
                ingredients: data.ingredients,
                steps: data.steps,
              })
              .then(() => {
                setData(initialState);
              })
              .catch((err) => {
                console.log(err);
              });
            setProgress(0);
            setImage(null);
          });
      }
    );
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Control
          name="foodName"
          type="text"
          value={foodName}
          onChange={handleChangeInput}
          placeholder="Enter Food Name"
        />
      </Form.Group>

      <Form.Group
        className="mb-3"
        controlId="formBasicPassword"
        style={{ width: "auto" }}
      >
        <Form.Control
          name="ingredients"
          value={ingredients}
          onChange={handleChangeInput}
          type="text"
          style={{ width: "100%" }}
          placeholder="Enter Ingredients"
        />
        <Form.Text className="text-muted">
          For new line use _(underscore) for separation.
        </Form.Text>
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicCheckbox">
        <Form.Control
          name="steps"
          value={steps}
          onChange={handleChangeInput}
          type="text"
          placeholder="Enter Steps"
        />
        <Form.Text className="text-muted">
          For new line use _(underscore) for separation.
        </Form.Text>
      </Form.Group>

      <Form.Group className="mb-3" controlId="form">
        <input type="file" onChange={handleChange} />
        <progress value={progress} max="100" />
      </Form.Group>
      <Button variant="primary" type="submit">
        Submit
      </Button>
    </Form>
  );
}
