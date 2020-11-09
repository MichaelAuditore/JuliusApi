import React, { useState } from "react";
import $ from "jquery";
import { useHistory, Link } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import { signIn } from "../../utils/auth";
import "./Signin.css";

function SignIn() {
  const [show, setShow] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const history = useHistory();
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const SigninEvent = async (e) => {
    e.preventDefault();
    if (email === "" || password === "") {
      handleShow();
      if (email === "") {
        $(".modal-body").html("Ingresa tu email");
      } else {
        $(".modal-body").html("Ingresa tu contraseña");
      }
    } else {
      const req = await signIn({ email: email, password: password });
      if (req.message) {
        handleShow();
        $(".modal-body").html(req.message);
      } else {
        history.push("/home");
      }
    }
  };
  return (
    <div className="justify-content-center align-items-center display-flex text-center login">
      <Container className="col-sm-12">
        <div className="logo"></div>
        <Form>
          <Form.Group controlId="emailInput">
            <Form.Label>Dirección email</Form.Label>
            <Form.Control
              type="email"
              placeholder="Ingresa email"
              onChange={(e) => setEmail(e.target.value)}
            />
            <Form.Text>Nunca compartas tu email con otras personas.</Form.Text>
          </Form.Group>

          <Form.Group controlId="passwordInput">
            <Form.Label>Contraseña</Form.Label>
            <Form.Control
              type="password"
              placeholder="Ingresa contraseña"
              onChange={(e) => setPassword(e.target.value)}
            />
          </Form.Group>
          <Button
            variant="primary"
            className="custom mr-1"
            type="submit"
            onClick={SigninEvent}
          >
            Ingresar
          </Button>
          <Link
            to="/signup"
            variant="primary"
            className="btn btn-primary registerButton"
          >
            Registrarse
          </Link>
        </Form>
        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Error</Modal.Title>
          </Modal.Header>
          <Modal.Body>No has ingresado tus datos correctamente</Modal.Body>
          <Modal.Footer>
            <Button
              variant="secondary"
              className="custom"
              onClick={handleClose}
            >
              Close
            </Button>
          </Modal.Footer>
        </Modal>
      </Container>
    </div>
  );
}

export default SignIn;
