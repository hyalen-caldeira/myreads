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
    this.setState({query : event.target.value})
  }

  // handleSelectChange = (selected, book) => {
  //   this.setState({ selected })
  //
  //   if (this.props.onUpdateBooks)
  //     for (let obj of this.props.books) {
  //       if (obj.id === book.id) {
  //         obj.shelf = selected
  //
  //         BooksAPI.update(book, selected).then(
  //           this.props.onUpdateBooks(this.props.books))
  //       }
  //     }
  // }

  handleSubmit = (event) => {
    event.preventDefault()

    BooksAPI.search(this.state.query, 10)
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
          <ListBooksGrid books={booksSearched} handleChange={this.props.handleChange}></ListBooksGrid>
        </div>
      </div>
    )
  }
}

export default SearchBooks
