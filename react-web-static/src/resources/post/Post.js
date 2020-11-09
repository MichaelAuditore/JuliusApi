import Button from "react-bootstrap/Button";
import { updateOne, deleteOne } from "../../utils/crud";
import FormControl from "react-bootstrap/FormControl";
import InputGroup from "react-bootstrap/InputGroup";
import Jumbotron from "react-bootstrap/Jumbotron";
import Modal from "react-bootstrap/Modal";
import { useState } from "react";
import $ from "jquery";

import "./Post.css";

function Post(props) {
  const [message, setMessage] = useState(false);
  const [show, setShow] = useState(false);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const cancelEvent = (e) => {
    window.location.reload();
  };

  const wantToUpdate = (e) => {
    e.preventDefault();

    setTitle($(`.title${e.target.id}`).val());
    setContent($(`.content${e.target.id}`).val());

    $(`.update${e.target.id}`).hide();
    $(`.delete${e.target.id}`).hide();
    $(`.save${e.target.id}`).show();
    $(`.cancel${e.target.id}`).show();
    $(`.edit${e.target.id}`).removeAttr("disabled");
    $(`.edit${e.target.id}`).removeAttr("readonly");
  };

  const handleShow = () => {
    setShow(true);
  };

  const handleClose = () => {
    setShow(false);
  };

  const saveUpdate = async (e) => {
    e.preventDefault();

    if (title === "") {
      handleShow();
      setMessage("El titulo no puede quedar vacio");
    } else if (content === "") {
      handleShow();
      setMessage("El contenido no puede quedar vacio");
    } else {
      const body = {
        title: title,
        content: content,
      };
      const updated = await updateOne(body, e.target.id);
      if (updated.data._id) {
        window.location.reload();
      }
    }
  };
  const deleteEvent = async (e) => {
    e.preventDefault();
    const deleted = await deleteOne(e.target.id);
    if (deleted.data._id) {
      window.location.reload();
    }
  };

  if (props.render) {
    return props.posts.map((post, idx) => {
      if (idx === 0) {
        $(`${idx}`).show();
      }
      let i = parseInt(idx / 10);
      return (
        <Jumbotron
          key={idx}
          className={`col-sm-6 mx-auto mt-3 p-1 published j${i}`}
        >
          <InputGroup className="mb-1">
            <InputGroup.Prepend>
              <InputGroup.Text id="title">Titulo</InputGroup.Text>
            </InputGroup.Prepend>
            <FormControl
              placeholder="Ingresa un titulo para tu post"
              aria-label="title"
              aria-describedby="title"
              className={`title${post._id}`}
              defaultValue={post.title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </InputGroup>
          <InputGroup className="mb-1">
            <InputGroup.Prepend>
              <InputGroup.Text id="content">Contenido</InputGroup.Text>
            </InputGroup.Prepend>
            <FormControl
              as="textarea"
              aria-label="content"
              aria-describedby="content"
              className={`content${post._id}`}
              defaultValue={post.content}
              rows={3}
              onChange={(e) => setContent(e.target.value)}
            />
          </InputGroup>
          <InputGroup className="mb-1">
            <InputGroup.Prepend>
              <InputGroup.Text id="createdBy">Creado por</InputGroup.Text>
            </InputGroup.Prepend>
            <FormControl
              aria-label="createdBy"
              aria-describedby="createdBy"
              value={
                post.createdBy === sessionStorage.getItem("userId")
                  ? sessionStorage.getItem("email")
                  : post.createdBy
              }
              disabled
              rows={3}
            />
          </InputGroup>
          <InputGroup className="justify-content-center">
            {post.url ? <img src={post.url} id="image" width="20%" alt="post" /> : null}
          </InputGroup>

          {post.createdBy === sessionStorage.getItem("userId") ? (
            <InputGroup className="justify-content-end">
              <Button
                variant="success mr-1"
                className={`saving save${post._id}`}
                id={post._id}
                onClick={saveUpdate}
              >
                Guardar
              </Button>
              <Button
                variant="warning mr-1"
                id={post._id}
                className={`update${post._id}`}
                onClick={wantToUpdate}
              >
                Actualizar
              </Button>
              <Button
                variant="danger mr-1"
                className={`canceling cancel${post._id}`}
                id={post._id}
                onClick={cancelEvent}
              >
                Cancelar
              </Button>
              <Button
                variant="danger mr-1"
                className={`delete${post._id}`}
                id={post._id}
                onClick={deleteEvent}
              >
                Eliminar
              </Button>
            </InputGroup>
          ) : null}
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
        </Jumbotron>
      );
    });
  } else {
    return null;
  }
}

export default Post;
