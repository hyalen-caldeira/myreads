import React, { Component } from 'react'
import PropTypes from 'prop-types'
import sortBy from 'sort-by'
import ListBooksGrid from './ListBooksGrid'
import * as BooksAPI from './BooksAPI'

class ListBooksShelf extends Component {
  state = {
    selected : ""
  }

  handleSelectChange = (selected, book) => {
    this.setState({ selected })

    if (this.props.onUpdateBooks)
      for (let obj of this.props.books) {
        if (obj.id === book.id) {
          obj.shelf = selected

          BooksAPI.update(book, selected).then(
            this.props.onUpdateBooks(this.props.books))
        }
      }
  }

  static propTypes = {
    books : PropTypes.array.isRequired,
    shelf : PropTypes.string.isRequired,
    title : PropTypes.string.isRequired,
    onUpdateBooks : PropTypes.func.isRequired
  }

  render() {
    const { books, shelf, title, onUpdateBooks } = this.props

    let showBooks = books.filter(book => book.shelf === shelf)
    showBooks.sort(sortBy('title'))

    return (
      <div className="list-books-content">
        <div className="bookshelf">
          <h2 className="bookshelf-title">{title}</h2>
          <div className="bookshelf-books">
            <ListBooksGrid books={showBooks} handleChange={this.handleSelectChange}></ListBooksGrid>
          </div>
        </div>
      </div>
    )
  }
}

export default ListBooksShelf
