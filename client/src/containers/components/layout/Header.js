import { ContextualMenu, DirectionalHint, Icon, Link } from 'office-ui-fabric-react'
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { getUserData, logout } from '../../../actions/app'

@connect(
  state => ({
    user: state.app.get('user'),
    userData: state.app.get('userData')
  }),
  dispatch => ({
    logout: bindActionCreators(logout, dispatch),
    getUserData: bindActionCreators(getUserData, dispatch)
  })
)
export default class Header extends Component {
  state = {
    showUserMenu: false,
    currentTarget: null
  }

  componentDidMount() {
    const { user, getUserData } = this.props

    if (!user.isEmpty()) {
      getUserData()
    }
  }

  componentDidUpdate({ user: oldUser }) {
    const { user, getUserData } = this.props

    if (!user.isEmpty() && !user.equals(oldUser)) {
      getUserData()
    }
  }

  handleShowUserMenu = (e) => {
    this.setState({
      currentTarget: e.currentTarget,
      showUserMenu: true
    })
  }

  handleHideUserMenu = () => {
    this.setState({ showUserMenu: false })
  }

  generateUserMenuItems = () => {
    return [
      {
        key: 'logout',
        name: 'Log Out',
        onClick: () => {
          this.props.logout()
        }
      }
    ]
  }

  render() {
    const { showUserMenu, currentTarget } = this.state
    const { user, userData } = this.props

    return (
      <header className='main-header'>
        <div className='main-header-bar'>
          <div className='title ms-font-xxl'>NoteSth</div>
          <div className='menu-bar'>
            {
              !user.isEmpty() && (
                <Link onClick={this.handleShowUserMenu}>
                  {userData.get('username')} <Icon iconName='CaretDownSolid8' className='menu-dropdown' />
                </Link>
              )
            }
          </div>
        </div>
        {
          showUserMenu && (
            <ContextualMenu
              items={this.generateUserMenuItems()}
              target={currentTarget}
              directionalHint={DirectionalHint.bottomRightEdge}
              isBeakVisible={true}
              gapSpace={-10}
              onDismiss={this.handleHideUserMenu}
            />
          )
        }
      </header>
    )
  }
}
