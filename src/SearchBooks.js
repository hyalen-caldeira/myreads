import React, { Component } from 'react'
import * as BooksAPI from './BooksAPI'
import { Link } from 'react-router-dom'
import ListBooksGrid from './ListBooksGrid'

class SearchBooks extends Component {
  state = {
    selected : "",
    booksSearched : [],
    query : ""
  }

  handleInputChange = (event) => {
    this.setState({query : event.target.value})
  }

  handleSelectChange = (selected, book) => {
    this.setState({ selected })

    if (this.props.onUpdateBooks) {
      for (let obj of this.props.books) {
        if (obj.id === book.id) {
          obj.shelf = selected
          this.props.onUpdateBooks(this.props.books)

          BooksAPI.update(book, selected)
          //   .then(
          //     this.props.onUpdateBooks(book)
          // )
        }
      }
    }
  }

  handleSubmit = (event) => {
    event.preventDefault()

    BooksAPI.search(this.state.query, 10)
      .then((booksSearched) => {
        this.setState({booksSearched})})
      .catch((e) => {this.setState({booksSearched : []})})
  }

  // componentDidMount() {
  //   BooksAPI.getAll().then((booksSearched) => {
  //     this.setState({booksSearched})
  //   })
  // }

  render () {
    const { books, onUpdateBooks } = this.props
    const { query, booksSearched } = this.state

    return (
      <div className="search-books">
        <div className="search-books-bar">
          <Link className='close-search' to='/'>Close</Link>
          <div className="search-books-input-wrapper">
            <form onSubmit={this.handleSubmit}>
              <input
                type="text"
                placeholder="Search by title or author"
                value={query}
                onChange={this.handleInputChange}/>
            </form>
          </div>
        </div>
        <div className="search-books-results">
          {/*<ListBooksGrid books={ booksSearched } onUpdateBooks={ onUpdateBooks }></ListBooksGrid> */}
          <ol className="books-grid">
            {
            booksSearched.map((book) => (
              <li key={book.id}>
                <div className="book">
                  <div className="book-top">
                    <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url(${book.imageLinks.thumbnail})` }}></div>
                    <div className="book-shelf-changer">
                      <select
                        value={ book.shelf }
                        onChange={(event) => this.handleSelectChange(event.target.value, book)}>
                        <option value="none" disabled>Move to...</option>
                        <option value="currentlyReading">Currently Reading</option>
                        <option value="wantToRead">Want to Read</option>
                        <option value="read">Read</option>
                        <option value="none">None</option>
                      </select>
                    </div>
                  </div>
                  <div className="book-title">{book.title}</div>
                  <div className="book-authors">{book.authors}</div>
                </div>
              </li>
            ))
            }
          </ol>
        </div>
      </div>
    )
  }
}

export default SearchBooks
