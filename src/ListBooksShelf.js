import React, { Component } from 'react'
import PropTypes from 'prop-types'
import sortBy from 'sort-by'
import ListBooksGrid from './ListBooksGrid'

class ListBooksShelf extends Component {
  static propTypes = {
    books : PropTypes.array.isRequired,
    shelf : PropTypes.string.isRequired,
    title : PropTypes.string.isRequired,
    handleChange : PropTypes.func.isRequired
  }

  render() {
    const { books, shelf, title, handleChange } = this.props

    let showBooks = books.filter(book => book.shelf === shelf)
    showBooks.sort(sortBy('title'))

    return (
      <div className="list-books-content">
        <div className="bookshelf">
          <h2 className="bookshelf-title">{title}</h2>
          <div className="bookshelf-books">
            <ListBooksGrid
              books={showBooks}
              handleChange={handleChange}>
            </ListBooksGrid>
          </div>
        </div>
      </div>
    )
  }
}

export default ListBooksShelf
