import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import ListBooksShelf from './ListBooksShelf'

class ListBooks extends Component {
  state = {}

  static propTypes = {
    books : PropTypes.array.isRequired
  }

  render() {
    const { books } = this.props

    return (
      <div className="list-books">
        <div className='list-books-title'>
          <h1>My Reads ...</h1>
        </div>
        <div>
          <ListBooksShelf books={books} shelf="read" title="Read"></ListBooksShelf>
          <ListBooksShelf books={books} shelf="currentlyReading" title="Currently Reading"></ListBooksShelf>
          <ListBooksShelf books={books} shelf="wantToRead" title="Want to Read"></ListBooksShelf>
        </div>
        <div className="open-search">
          <Link to='/search'>Search Books</Link>
        </div>
      </div>
    )
  }
}

export default ListBooks
