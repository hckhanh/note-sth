import { CommandBar } from 'office-ui-fabric-react'
import PropTypes from 'prop-types'
import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import NoteEditorContent from './NoteEditorContent'

export default class NoteEditor extends Component {
  state = {
    showChecklist: false
  }

  componentDidMount() {
    addEventListener('click', this.handleClickOutside)
  }

  componentWillUnmount() {
    removeEventListener('click', this.handleClickOutside)
  }

  handleClickOutside = (e) => {
    const area = ReactDOM.findDOMNode(this.area)

    if (!area.contains(e.target)) {
      this.handleDismiss()
    }
  }

  handleDismiss = () => {
    this.props.onDismiss(this.content.data)
  }

  generateLeftItems = () => {
    const { showChecklist } = this.state

    return [
      {
        key: 'toggleChecklist',
        name: showChecklist ? 'Hide checklist' : 'Show checklist',
        iconProps: {
          iconName: 'CheckList'
        },
        disabled: true,
        onClick: () => {
          this.setState({ showChecklist: !showChecklist })
        }
      }
    ]
  }

  generateRightItems = () => {
    return [
      {
        key: 'done',
        name: 'Done',
        iconProps: {
          iconName: 'SkypeCheck'
        },
        onClick: () => {
          this.handleDismiss()
        }
      }
    ]
  }

  render() {
    return (
      <div ref={node => this.area = node}>
        <NoteEditorContent ref={node => this.content = node} />
        <CommandBar
          items={this.generateLeftItems()}
          farItems={this.generateRightItems()}
        />
      </div>
    )
  }
}

NoteEditor.propTypes = {
  onDismiss: PropTypes.func.isRequired
}
