import React, { Component } from 'react'
import PropTypes from 'prop-types'

class ListBooksGrid extends Component {
  static propTypes = {
    handleChange : PropTypes.func.isRequired
  }

  render() {
    const { books, handleChange } = this.props
    let bookImage

    return (
      <ol className="books-grid">
        {
        books.map((book) => {
          bookImage = book.imageLinks.thumbnail;

          return (
            <li key={book.id}>
              <div className="book">
                <div className="book-top">
                  <div className="book-cover book-image" style={{ backgroundImage: `url(${bookImage})` }}></div>
                  <div className="book-shelf-changer">
                    <select
                      value={ book.shelf }
                      onChange={(event) => handleChange(event.target.value, book)}>
                      <option value="moveTo" disabled>Move to...</option>
                      <option value="currentlyReading">Currently Reading</option>
                      <option value="wantToRead">Want to Read</option>
                      <option value="read">Read</option>
                      <option value="none">None</option>
                    </select>
                  </div>
                </div>
                <div className="book-title">{book.title}</div>
                <div className="book-authors">{book.authors ? book.authors.join(', ') : ''}</div>
              </div>
            </li>
          )})
        }
      </ol>
    )
  }
}

export default ListBooksGrid
