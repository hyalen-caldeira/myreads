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
    event.preventDefault()

    this.setState({query : event.target.value})

    if (event.target.value)
      BooksAPI.search(event.target.value, 10)
        .then(booksSearched => this.setState({booksSearched}))
        .catch((e) => {this.setState({booksSearched : []})})
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
          <ListBooksGrid books={booksSearched} handleChange={this.props.handleChange}></ListBooksGrid>
        </div>
      </div>
    )
  }
}

export default SearchBooks
