import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import { Link } from "react-router-dom";
import Modal from "react-bootstrap/Modal";
import { signUp } from "../../utils/auth";
import { useHistory } from "react-router-dom";
import { useState } from "react";
import "./Signup.css";

function Signup() {
  const [message, setMessage] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirm] = useState("");
  const [show, setShow] = useState(false);
  const history = useHistory();

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const checkEmail = () => {
    let urlRegex = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/g;
    let Reg = new RegExp(urlRegex);
    return Reg.test(email);
  };

  const samePasswords = () => {
    return password === confirmPassword;
  };

  const signUpEvent = async (e) => {
    e.preventDefault();
    if (
      username === "" &&
      email === "" &&
      password === "" &&
      confirmPassword === ""
    ) {
      setMessage("No has ingresado ningún dato");
    } else if (username === "") {
      setMessage("Ingresa un nombre de usuario");
    } else if (email === "" || !checkEmail()) {
      setMessage(
        "El correo ingresado no es válido o no se ha digitado\nexample@domain.com"
      );
    } else if (password.length < 8 || !samePasswords()) {
      setMessage(
        "Tu contraseña debe tener una longitud igual o mayor a 8 y deben coincidir"
      );
    } else {
      await signUp({
        username: username,
        email: email,
        password: password,
      }).then((resp) => {
        if (resp.message) {
          handleShow();
          setMessage(resp.message);
        } else {
          history.push("/home");
        }
      });
    }
    if (message !== "") handleShow();
  };

  return (
    <div className="justify-content-center align-items-center display-flex text-center login">
      <Container className="col-sm-12">
        <div className="logo"></div>
        <Form>
          <Form.Group controlId="usernameInput">
            <Form.Label>Nombre de usuario</Form.Label>
            <Form.Control
              type="text"
              placeholder="Ingresa tu nombre de usuario"
              onChange={(e) => setUsername(e.target.value)}
            />
          </Form.Group>

          <Form.Group controlId="emailInput">
            <Form.Label>Dirección email</Form.Label>
            <Form.Control
              type="email"
              placeholder="Ingresa tu email"
              onChange={(e) => setEmail(e.target.value)}
            />
          </Form.Group>
          <Form.Group controlId="passwordInput">
            <Form.Label>Contraseña</Form.Label>
            <Form.Control
              type="password"
              placeholder="Ingresa tu contraseña"
              onChange={(e) => setPassword(e.target.value)}
            />
          </Form.Group>

          <Form.Group controlId="confirmPasswordInput">
            <Form.Label>Confirma tu contraseña</Form.Label>
            <Form.Control
              type="password"
              placeholder="Confirma tu contraseña"
              onChange={(e) => setConfirm(e.target.value)}
            />
          </Form.Group>

          <Button
            variant="primary"
            className="custom mr-1"
            onClick={signUpEvent}
          >
            Registrarse
          </Button>

          <Link variant="primary" to="/" className="btn btn-primary">
            Ingresar
          </Link>
        </Form>
        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Error</Modal.Title>
          </Modal.Header>
          <Modal.Body>{message}</Modal.Body>
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

export default Signup;
