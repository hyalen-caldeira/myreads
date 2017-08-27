import React, { Component } from 'react'
import * as BooksAPI from './BooksAPI'
import { Link } from 'react-router-dom'

class SearchBooks extends Component {
  state = {
    booksSearched : [],
    query : ""
  }

  handleChange = (event) => {
    this.setState({query : event.target.value})
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
    const { books } = this.props
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
                onChange={this.handleChange}/>
            </form>
          </div>
        </div>
        <div className="search-books-results">
          <ol className="books-grid">
          {
            booksSearched.map((book) => (
              <li key={book.id}>
                <div className="book">
                  <div className="book-top">
                    <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url(${book.imageLinks.thumbnail})` }}></div>
                    <div className="book-shelf-changer">
                      <select>
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
