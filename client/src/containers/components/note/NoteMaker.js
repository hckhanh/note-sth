import { TextField } from 'office-ui-fabric-react/lib/TextField'
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { createNote } from '../../../actions/home'
import NoteEditor from './NoteEditor'

@connect(
  null,
  dispatch => ({
    createNote: bindActionCreators(createNote, dispatch)
  })
)
export default class NoteMaker extends Component {
  state = {
    showEditor: false
  }
  handleOpenEditor = () => {
    this.setState({ showEditor: true })
  }

  handleExitEditor = (note) => {
    this.setState({ showEditor: false })

    if (note.name || note.content) {
      this.props.createNote(note)
    }
  }

  render() {
    return (
      <div>
      {
        !this.state.showEditor ? (
          <TextField
            onFocus={this.handleOpenEditor}
            placeholder='Take a note before you forget it...'
          />
        ) : (
          <NoteEditor onDismiss={this.handleExitEditor} />
        )
      }
      </div>
    )
  }
}
