import React, { Component } from 'react'
import Footer from './components/layout/Footer'
import Header from './components/layout/Header'

export default class App extends Component {
  render() {
    return (
      <div>
        <Header />
        {this.props.children}
        <Footer />
      </div>
    )
  }
}
