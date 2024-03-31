import React, { useState } from "react";
import { Button, Form, FormGroup, Col, Row, Label, Input } from "reactstrap";
import { useHistory } from "react-router-dom"; 
import Error from "../Error";
import "./NewLoginForm.css";

const NewLoginForm = ({ login }) => { 
  const history = useHistory();
  const [formData, setFormData] = useState({
    username: "",
    password: ""
  });
  const [formErrors, setFormErrors] = useState([]);

  const handleSubmit = async (evt) => {
    evt.preventDefault();
    try {
      let result = await login(formData);
      if (result.success) {
        history.push("/");
      } else {
        setFormErrors([result.error]);
      }
    } catch (error) {
      setFormErrors([error.message || "An unknown error occurred."]);
    }
  };

  const handleChange = (evt) => {
    const { name, value } = evt.target;
    setFormData((formData) => ({
      ...formData,
      [name]: value
    }));
  };

  return (
    <div className="LoginForm-Container">
      <Form className="Login-Form" onSubmit={handleSubmit}>
        <h2 className="">Log In</h2>
          <Row>
            {formErrors && formErrors.length > 0 && <Error messages={formErrors.map(error => error.message)} />}
            <Col md={6}>
              <FormGroup>
                <Label for="username">Username:</Label>
                <Input
                  id="username"
                  type="text"
                  name="username"
                  value={formData.username}
                  onChange={handleChange}
                />
                
                <Label for="password">Password:</Label>
                <Input
                  id="password"
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                />
                
                <Button type="submit" color="primary">
                  Submit
                </Button>
              </FormGroup>
            </Col>
          </Row>
      </Form>
    </div>
  );
};

export default NewLoginForm;
