import React, { useState, useContext } from "react";
import { Button, Form, FormGroup, Col, Row, Label, Input } from "reactstrap";
import JoblyApi from "../JoblyApi";
import Error from "../Error";
import UserContext from "../UserContext";
import "./ProfileForm.css";

function ProfileForm() {
  const { currentUser, setCurrentUser } = useContext(UserContext);
  const [formData, setFormData] = useState({
    firstName: currentUser.firstName,
    lastName: currentUser.lastName,
    email: currentUser.email,
    username: currentUser.username,
    password: "",
  });
  const [formErrors, setFormErrors] = useState([]);
  const [saveConfirmed, setSaveConfirmed] = useState(false);

  console.debug(
    "ProfileForm",
    "currentUser=", currentUser,
    "formData=", formData,
    "formErrors=", formErrors,
    "saveConfirmed=", saveConfirmed,
  );

  const handleSubmit = async (evt) => {
    evt.preventDefault();

    let profileData = {
      firstName: formData.firstName,
      lastName: formData.lastName,
      email: formData.email,
      password: formData.password,
    };

    console.log("Submitting profile data:", profileData);

    let username = formData.username;
    let updatedUser;

    try {
      // Call JoblyApi method to update user profile
      updatedUser = await JoblyApi.saveProfile(username, profileData);
      console.log("Updated User:", updatedUser);
    } catch (errors) {
      setFormErrors(errors);
      return;
    }

    setFormData(prevFormData => ({...prevFormData, password: "" }));
    setFormErrors([]);
    setSaveConfirmed(true);
    // reloads user information
    setCurrentUser(updatedUser);
  };

  const handleChange = (evt) => {
    const { name, value } = evt.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value
    }));
    setFormErrors([]);
  };

  return (
    <div className="ProfileForm-Container">
      <Form className="Profile-Form"onSubmit={handleSubmit}>
      <h2 className="">Profile</h2>
        <Row>
          {formErrors && formErrors.length > 0 && <Error messages={formErrors.map(error => error.message)} />}
          <Col md={6}>
            <FormGroup>
              <Label for="username">Username</Label>
              <Input
                id="username"
                type="text"
                name="username"
                value={formData.username}
                disabled
              />
              <Label for="password">Password</Label>
              <Input
                id="password"
                type="password"
                name="password"
                value={formData.password}
                placeholder="********"
                onChange={handleChange}
              />
              <Label for="first_name">First name</Label>
              <Input
                id="first_name"
                type="text"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
              />
              <Label for="last_name">Last name</Label>
              <Input
                id="last_name"
                type="text"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
              />
              <Label for="email">Email</Label>
              <Input
                id="email"
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
              />
            </FormGroup>
          </Col>
        </Row>
        <Button type="submit" color="primary">
          Save Changes
        </Button>
      </Form>
    </div>
  );
}

export default ProfileForm;