import React, { Component } from 'react'
import PropTypes from 'prop-types'
import sortBy from 'sort-by'
import * as BooksAPI from './BooksAPI'

class ListBooksGrid extends Component {
  state = {
    selected : "none"
  }

  handleSelectChange = (event) => {
    this.setState({selected : event.target.value})

    // BooksAPI.update(book, event.target.value).then(
    //   this.props.onUpdateBooks(book)
    // )
  }

  render() {
    const { books } = this.props

    return (
      <ol className="books-grid">
        {
        books.map((book) => (
          <li key={book.id}>
            <div className="book">
              <div className="book-top">
                <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url(${book.imageLinks.thumbnail})` }}></div>
                <div className="book-shelf-changer">
                  <select
                    value={ book.shelf }
                    onChange={this.handleSelectChange}>
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
    )
  }
}

export default ListBooksGrid
