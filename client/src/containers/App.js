import React, { Component } from 'react'
import Footer from './components/layout/Footer'
import Header from './components/layout/Header'

export default class App extends Component {
  render() {
    return (
      <div className='body-container'>
        <div className='core-container'>
          <Header />
          <div className='main-container'>
            {this.props.children}
          </div>
        </div>
        <Footer />
      </div>
    )
  }
}
