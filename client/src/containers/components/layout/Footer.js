import { Link } from 'office-ui-fabric-react'
import React, { Component } from 'react'

export default class Footer extends Component {
  render() {
    return (
      <footer className='main-footer'>
        <div className='footer-container'>
          <div className='title ms-font-xxl'>NoteSth</div>
          <Link href='https://github.com/hckhanh/note-sth'>GitHub</Link>
          <Link href='http://dev.office.com/fabric/components/link'>What's New</Link>
          <span className='copyright'>
          © 2017 Khanh Hoang
          </span>
        </div>
      </footer>
    )
  }
}
