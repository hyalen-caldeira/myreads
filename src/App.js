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

  render() {
    const { books } = this.state

    return (
      <div className="app">
        <Route exact path='/' render={() => (
          <ListBooks books={ books } onUpdateBooks={ this.updateBooks } handleChange={this.handleSelectChange}></ListBooks>
          )}>
        </Route>
        <Route exact path='/search' render={() => (
          <SearchBooks books={ books } onUpdateBooks={ this.updateBooks }></SearchBooks>
          )}>
        </Route>
      </div>
    )
  }
}

export default BooksApp
