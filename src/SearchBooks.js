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

  updateBooksShelf(booksSearched) {
    for (const book of booksSearched) {
      if (this.props.map[book.id])
        book.shelf = this.props.map[book.id].shelf
      else
        book.shelf = "none"

      this.setState({booksSearched})
    }
  }

  handleInputChange = (event) => {
    event.preventDefault()

    this.setState({query : event.target.value})

    if (event.target.value)
      BooksAPI.search(event.target.value, 10)
        .then(booksSearched => this.updateBooksShelf(booksSearched))
        .catch((e) => {this.setState({booksSearched : []})})
  }

  handleSelectChange = (selected, book, booksSearched) => {
    book.shelf = selected

    this.setState({selected, booksSearched})

    this.props.handleChange(selected, book)
  }

  render () {
    const { query, booksSearched } = this.state

    return (
      <div className="search-books">
        <div className="search-books-bar">
          <Link className='close-search' to='/'>Close</Link>
          <div className="search-books-input-wrapper">
            <input
              type="text"
              placeholder="Search by title or author"
              value={query}
              onChange={this.handleInputChange}/>
          </div>
        </div>
        <div className="search-books-results">
          <ListBooksGrid books={booksSearched} handleChange={this.handleSelectChange}></ListBooksGrid>
        </div>
      </div>
    )
  }
}

export default SearchBooks
