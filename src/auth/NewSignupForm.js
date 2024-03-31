import React, { useState } from "react";
import { Button, Form, FormGroup, Col, Row, Label, Input } from "reactstrap";
import { useHistory } from "react-router-dom";
import Error from "../Error";
import "./NewSignupForm.css";

const NewSignupForm = ({ signup }) => {
  const history = useHistory();
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    firstName: "",
    lastName: "",
    email: ""
  });
  const [formErrors, setFormErrors] = useState([]);

  const handleSubmit = async (evt) => {
    evt.preventDefault();
    try {
      const result = await signup(formData); 
      console.log("Signup Response:", result); 
      if (result.success) {
        history.push("/login"); 
      } else {
        setFormErrors(result.errors || ["An error occurred. Please try again later."]);
      }
    } catch (error) {
      setFormErrors(["An error occurred. Please try again later."]);
    }
  }; 
  
  const handleChange = evt => {
    const { name, value } = evt.target;
    setFormData(data => ({
      ...data, [name]: value
    }));
  };

  return (
    <div className="SignupForm-Container">
        <Form className="Signup-Form"onSubmit={handleSubmit}>
        <h2 className="">Sign Up</h2>
          <Row>
            {formErrors && formErrors.length > 0 && <Error messages={formErrors.map(error => error.message)} />}
            <Col md={6}>
              <FormGroup>
                <Label for="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                  />
                <Label for="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                />
                <Label for="username">Username</Label>
                      <Input
                        id="username"
                        type="text"
                        name="username"
                        value={formData.username}
                        onChange={handleChange}
                      />
                <Label for="firstName">First name</Label>
                  <Input
                    id="firstName"
                    type="text"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                  />
                <Label for="lastName">Last name</Label>
                <Input
                  id="lastName"
                  type="text"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                />
              </FormGroup>
            </Col>
          </Row>
          <Button type="submit" color="primary">Submit</Button>
        </Form>
    </div>
  );
}

export default NewSignupForm;
