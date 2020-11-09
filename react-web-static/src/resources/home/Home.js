import Button from 'react-bootstrap/Button'
import { checkSession, closeSession, saveImage } from '../../utils/utils'
import Container from 'react-bootstrap/Container'
import { createOne } from '../../utils/crud'
import FormControl from 'react-bootstrap/FormControl'
import FormFile from 'react-bootstrap/FormFile'
import { getMany, getByMatch } from '../../utils/crud'
import InputGroup from 'react-bootstrap/InputGroup'
import Jumbotron from 'react-bootstrap/Jumbotron'
import { Link } from 'react-router-dom'
import Modal from 'react-bootstrap/Modal'
import Navbar from 'react-bootstrap/Navbar'
import Pagination from 'react-bootstrap/Pagination'
import Paginator from '../paginator/Paginator'
import Post from '../post/Post'
import React from 'react'
import $ from 'jquery'
import './Home.css'

class Home extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      posts: [],
      title: '',
      content: '',
      url: '',
      message: '',
      bar: '',
      show: false,
      render: false,
      paginator: 0,
    }

    this.filterPosts = this.filterPosts.bind(this)
    this.handleShow = this.handleShow.bind(this)
    this.handleClose = this.handleClose.bind(this)
    this.publishEvent = this.publishEvent.bind(this)
    this.ImageEvent = this.ImageEvent.bind(this)
    this.getURL = this.getURL.bind(this)
  }

  getURL = (e) => {
    e.preventDefault()
    this.setState({ url: e.target.files[0] })
    $('.custom-file-label').html(e.target.files[0].name)
  }

  filterPosts = async (e) => {
    e.preventDefault()
    const match = this.state.bar
    if (match === '') {
      this.getPosts()
    } else {
      await getByMatch(match).then((data) => {
        this.setState({ posts: data.data })
        this.setState({ render: true })
      })
    }
  }

  ImageEvent = async () => {
    if (this.state.url === '') {
      this.handleShow()
      this.setState({
        message:
          'No puede subir un Objeto vacio, por favor seleccione una imagen',
      })
    } else {
      const url = await saveImage(this.state.url)

      this.setState({ url: url.Location })
    }
  }

  handleShow = () => {
    this.setState({ show: true })
  }

  handleClose() {
    this.setState({ show: false })
  }

  getPosts = () => {
    getMany().then((data) => {
      if (data.message) closeSession()
      this.setState({
        posts: data.data,
      })
      this.setState({ render: true })
    })
  }

  async publishEvent() {
    if (this.state.title === '') {
      this.handleShow()
      this.setState({ message: 'El titulo es requerido' })
    } else if (this.state.content === '') {
      this.handleShow()
      this.setState({ message: 'El contenido es requerido' })
    } else {
      const body = {
        title: this.state.title,
        content: this.state.content,
      }

      if (this.state.url !== '') {
        body.url = this.state.url
      }
      await createOne(body)
      this.getPosts()
    }
  }

  componentDidMount() {
    if (checkSession()) {
      this.getPosts()
    } else {
      this.props.history.push('/')
    }
    $(`.${this.state.paginator}`).show()
  }

  render() {
    return (
      <Container className="col-lg-12 full-width" fluid>
        <Navbar bg="dark" variant="primary">
          <Navbar.Brand href="#">
            <img
              src="https://www.julius2grow.com/wp-content/uploads/2019/08/julius-2.svg"
              width="60"
              height="60"
              className="d-inline-block align-top"
              alt="Julius Logo"
            />
          </Navbar.Brand>

          <FormControl
            type="text"
            placeholder="Filtrar posts"
            className="col-sm-2 mr-sm-2"
            onChange={(e) => this.setState({ bar: e.target.value })}
          />
          <Button type="button" onClick={this.filterPosts}>
            Filtrar
          </Button>

          <Navbar.Collapse className="justify-content-end">
            <Navbar.Text>
              Signed in as:{' '}
              <a href="#login">{sessionStorage.getItem('email')}</a>
            </Navbar.Text>
            <Link to="/">
              <span onClick={closeSession}>
                <img
                  src="https://miguelpbucket.s3.us-east-2.amazonaws.com/images/close.png"
                  width="40"
                  height="40"
                  alt="closeSession"
                />
              </span>
            </Link>
          </Navbar.Collapse>
        </Navbar>
        <Jumbotron className="col-sm-6 mx-auto mt-3 p-1">
          <InputGroup className="mb-1">
            <InputGroup.Prepend>
              <InputGroup.Text id="title">Titulo</InputGroup.Text>
            </InputGroup.Prepend>
            <FormControl
              placeholder="Ingresa un titulo para tu post"
              aria-label="title"
              aria-describedby="title"
              onChange={(e) => this.setState({ title: e.target.value })}
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
              onChange={(e) => this.setState({ content: e.target.value })}
              rows={3}
            />
          </InputGroup>
          <InputGroup className="mb-1">
            <FormFile
              id="inputFile"
              label="Choose File"
              aria-describedby="inputFile"
              accept="image/x-png,image/gif,image/jpeg"
              custom
              className="mr-1"
              onChange={this.getURL}
            />
            <Button onClick={this.ImageEvent} className="p-0">
              Subir Imagen
            </Button>
          </InputGroup>
          <img alt="" />
          <InputGroup className="justify-content-end">
            <Button className="custom" onClick={this.publishEvent}>
              Publicar
            </Button>
          </InputGroup>
        </Jumbotron>
        <hr />
        <Container className="mt-1 postsPublished" fluid>
          <Post posts={this.state.posts} render={this.state.render} />
        </Container>
        <Pagination className="justify-content-center">
          <Paginator
            nIndex={this.state.posts.length}
            paginator={this.state.paginator}
          />
        </Pagination>
        <Modal show={this.state.show} onHide={this.handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Error</Modal.Title>
          </Modal.Header>
          <Modal.Body>{this.state.message}</Modal.Body>
          <Modal.Footer>
            <Button
              variant="secondary"
              className="custom"
              onClick={this.handleClose}
            >
              Close
            </Button>
          </Modal.Footer>
        </Modal>
      </Container>
    )
  }
}

export default Home
