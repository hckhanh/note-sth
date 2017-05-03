import { Link } from 'office-ui-fabric-react'
import React, { Component } from 'react'

export default class Footer extends Component {
  render() {
    return (
      <footer className='main-footer'>
        <div className='title ms-font-xxl'>NoteSth</div>
        <Link href='http://dev.office.com/fabric/components/link'>GitHub</Link> <Link href='http://dev.office.com/fabric/components/link'>What's New</Link> © 2016 hckhanh
      </footer>
    )
  }
}
