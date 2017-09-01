import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import ListBooksShelf from './ListBooksShelf'

class ListBooks extends Component {
  static propTypes = {
    books : PropTypes.array.isRequired
  }

  render() {
    const { books, handleChange } = this.props

    const shelfType = [
      {shelf : 'read', title : 'Read'},
      {shelf : 'currentlyReading', title : 'Currently Reading'},
      {shelf : 'wantToRead', title : 'Want to Read'}
    ]

    return (
      <div className="list-books">
        <div className='list-books-title'>
          <h1>My Reads ...</h1>
        </div>
        <div>
          {shelfType.map(type => {
            return (
              <ListBooksShelf
                key={type.shelf}
                books={books}
                shelf={type.shelf}
                title={type.title} handleChange={handleChange}>
              </ListBooksShelf>
            )
          })}
        </div>
        <div className="open-search">
          <Link to='/search'>Search Books</Link>
        </div>
      </div>
    )
  }
}

export default ListBooks
