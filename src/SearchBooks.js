import React, { Component } from 'react'
import * as BooksAPI from './BooksAPI'
import { Link } from 'react-router-dom'
import ListBooksGrid from './ListBooksGrid'

class SearchBooks extends Component {
  state = {
    booksSearched : [],
    query : ""
  }

  handleInputChange = (event) => {
    this.setState({query : event.target.value})
  }

  handleSelectChange = (event) => {
    this.setState({selected : event.target.value})
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
                onChange={this.handleInputChange}/>
            </form>
          </div>
        </div>
        <div className="search-books-results">
          <ListBooksGrid books={booksSearched}></ListBooksGrid>
        </div>
      </div>
    )
  }
}

export default SearchBooks
