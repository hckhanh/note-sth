import { CommandBar } from 'office-ui-fabric-react/lib/CommandBar'
import { TextField } from 'office-ui-fabric-react/lib/TextField'
import PropTypes from 'prop-types'
import React, { Component } from 'react'
import ReactDOM from 'react-dom'

export default class NoteEditor extends Component {
  state = {
    showChecklist: false,
    showDeleteConfirm: false
  }

  componentDidMount() {
    this.content.focus()
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
    console.log(this.name.value, this.content.value)
    this.props.onDismiss({
      name: this.name.value,
      content: this.content.value
    })
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
        <TextField ref={node => this.name = node} placeholder='Title' />
        <TextField
          ref={(node) => this.content = node}
          placeholder='Take a note before you forget it...'
          multiline={true}
          autoAdjustHeight={true}
        />
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
