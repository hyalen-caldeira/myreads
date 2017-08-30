import React, { Component } from 'react'
import * as BooksAPI from './BooksAPI'
import './App.css'
import { Route } from 'react-router-dom'
import ListBooks from './ListBooks'
import SearchBooks from './SearchBooks'

class BooksApp extends Component {
  state = {
    selected : "",
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

  handleSelectChange = (selected, book) => {
    this.setState({ selected })

    for (let obj of this.state.books) {
      if (obj.id === book.id) {
        obj.shelf = selected

        BooksAPI.update(book, selected).then(
        )
      }
    }
  }

  render() {
    const { books } = this.state

    return (
      <div className="app">
        <Route exact path='/' render={() => (
          <ListBooks
            books={ books }
            onUpdateBooks={ this.updateBooks }
            handleChange={this.handleSelectChange}>
          </ListBooks>
          )}>
        </Route>
        <Route exact path='/search' render={() => (
          <SearchBooks
            books={ books }
            handleChange={this.handleSelectChange}>
          </SearchBooks>
          )}>
        </Route>
      </div>
    )
  }
}

export default BooksApp
