import React, { Component } from 'react'
import * as BooksAPI from './BooksAPI'
import './App.css'
import { Route } from 'react-router-dom'
import ListBooks from './ListBooks'
import SearchBooks from './SearchBooks'

class BooksApp extends Component {
  state = {
    books : []
  }

  componentDidMount() {
    BooksAPI.getAll().then((books) => {
      this.setState({books})
    })
  }

  updateBooks = (books) => {
    this.setState({books})
  }

  render() {
    const { books } = this.state

    return (
      <div className="app">
        <Route exact path='/' render={() => (
          <ListBooks books={ books }></ListBooks>
          )}>
        </Route>
        <Route exact path='/search' render={() => (
          <SearchBooks books={ books } onUpdateBooks={this.updateBooks}></SearchBooks>
          )}>
        </Route>
      </div>
    )
  }
}

export default BooksApp
