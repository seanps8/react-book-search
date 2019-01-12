import React, { Component } from "react";
import Jumbotron from "../components/Jumbotron";
import API from "../utils/API";
import { Col, Row, Container } from "../components/Grid";
import { List, ListItem } from "../components/List";
import {Modal} from "../components/Modal";

class SavedBooks extends Component {
  state = {
    books: [],
    query: "",
    show: false
  };

 

  showModal = () => {
    this.setState({ show: true });
  };

  hideModal = () => {
    this.setState({ show: false });
  };

  componentDidMount() {
    this.loadBooks();
  }

  loadBooks = () => {
    API.getBooks()
      .then(res =>
        this.setState({ books: res.data})
      )
      .catch(err => console.log(err));
  };

  deleteBook = id => {
    API.deleteBook(id)
      .then(res => {
        console.log("book deleted");
        this.showModal();
        this.loadBooks()
      })
      .catch(err => console.log(err));
  };

  aStyle= {
    'text-decoration': 'none',
    'color': 'white'
  };
  
  render() {
    return (
      <Container fluid>
        <Row>
          <Col size="md-12">
            <Jumbotron>
              <h1>My saved books</h1>
            </Jumbotron>
            <Modal show={this.state.show} handleClose={this.hideModal}>
              <p>Book has been deleted from Saved List.</p>
            </Modal>
            
          </Col>
        </Row>
        <Row>
          <Col size="md-12">
            
            {this.state.books.length ? (
              <List>
                {this.state.books.map(book => (
                  <ListItem key={book._id}>
                   
                      <strong>
                        {book.title} 
                      </strong>
                      <button className="btn btn-primary float-right"
                      onClick={() => this.deleteBook(book._id)}>
                      Delete
                      </button>
                      <a className="btn btn-primary float-right" style={this.aStyle}
                      href= {book.link} target="_blank">View</a>

                      <p>{book.authors}</p>
                      <img src={book.image} />
                     
                      <p>{book.description}</p>
                   
                  </ListItem>
                ))}
              </List>
            ) : (
              <h3>No Results to Display</h3>
            )}
          </Col>
        </Row>
       
      </Container>
    );
  }
}

export default SavedBooks;