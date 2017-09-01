import React, { Component } from 'react'
import * as BooksAPI from './BooksAPI'
import './App.css'
import { Route } from 'react-router-dom'
import ListBooks from './ListBooks'
import SearchBooks from './SearchBooks'

class BooksApp extends Component {
  state = {
    books : [],
    map : []
  }

  getAllBooks() {
    BooksAPI.getAll().then(books => {
      let map = []

      for (const book of books)
        map[book.id] = book

      this.setState({books, map})
    })
  }

  componentDidMount() {
    this.getAllBooks()
  }

  handleSelectChange = (selected, book) => {
    BooksAPI.update(book, selected).then(this.getAllBooks())
  }

  render() {
    const { books, map } = this.state

    return (
      <div className="app">
        <Route exact path='/' render={() => (
          <ListBooks
            books={ books }
            handleChange={this.handleSelectChange}>
          </ListBooks>
          )}>
        </Route>
        <Route exact path='/search' render={() => (
          <SearchBooks
            map={ map }
            handleChange={this.handleSelectChange}>
          </SearchBooks>
          )}>
        </Route>
      </div>
    )
  }
}

export default BooksApp
