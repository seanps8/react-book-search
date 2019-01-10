import React, { Component } from "react";
import Jumbotron from "../components/Jumbotron";
import API from "../utils/API";
//import DeleteBtn from "../components/DeleteBtn";
import { Col, Row, Container } from "../components/Grid";
import { List, ListItem } from "../components/List";
import { Input, FormBtn } from "../components/Form";

class Books extends Component {
    state = {
        books: [],
        query: ""
    };

    componentDidMount() {
        this.loadBooks();
    }

    loadBooks = () => {
        API.getBooks()
            .then(res => this.setState({ books: res.data }))
            .catch(err => console.log(err));
    };

    handleInputChange = event => {
        const { name, value } = event.target;
        this.setState({
          [name]: value
        });
      };
    
    onSubmit = event => {
        event.preventDefault();
        if (this.state.query) {
          API.searchBooks(this.state.query)
            .then(res => {
              this.setState({ books: res.data, query:""});
            })
            .catch(err => console.log(err));
        }
      };

    saveBook = book => {
        var image;
        if(book.volumeInfo.imageLinks) 
          image=book.volumeInfo.imageLinks.thumbnail
        else
          image="http://placehold.jp/100x100.png";
    
        const bookData = {
          title: book.volumeInfo.title,
          authors: book.volumeInfo.authors,
          description: book.volumeInfo.description,
          image: image,      
          link: book.volumeInfo.infoLink
        }
        API.saveBook(bookData)
          .then(res => {
            console.log(res.data);
            console.log("book saved");
            this.setState({msg: "Book Saved"});
            //this.showModal();
            
            
            //socket.emit('book saved','A user saved a book. Book Title: ' + res.data.title);
            
            
          })
          .catch(err => console.log(err));
    }


    render() {
        return (
            <Container fluid>
                <Row>
                    <Col size="md-6">
                        <Jumbotron>
                            <h1>Search for books I should read!</h1>
                        </Jumbotron>
                        <form>
                            <Input
                                value={this.state.query}
                                onChange={this.handleInputChange}
                                name="query"
                                placeholder="Search"
                            />
                            <FormBtn
                                disabled={!(this.state.query)}
                                onClick={this.handleFormSubmit}
                            >
                                Search
                            </FormBtn>
                        </form>
                    </Col>
                </Row>
                <Row>
                    <Col size="md-12">
                        {this.state.books.length ? (
                        <List>
                            {this.state.books.map(book => (
                            <ListItem key={book.id}>
                                <strong>
                                    {book.volumeInfo.title} 
                                </strong>
                                <button className="btn btn-primary float-right"
                                onClick={() => this.saveBook(book)}>
                                Save
                                </button>
                                <a className="btn btn-primary float-right"
                                href= {book.volumeInfo.infoLink} style={this.aStyle} target="_blank">View</a>
                                <p>{book.volumeInfo.authors}</p>
                                {book.volumeInfo.imageLinks ? (
                                    <img src={book.volumeInfo.imageLinks.thumbnail} />
                                ) : (
                                    <img src="http://placehold.jp/100x100.png" />
                                )}
                                
                                <p>{book.volumeInfo.description}</p>
                            
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

export default Books;