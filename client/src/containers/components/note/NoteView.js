import PropTypes from 'prop-types'
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { updateNote } from '../../../actions/home'
import NoteEditorDialog from './NoteEditorDialog'
import NoteToolBar from './NoteToolBar'

@connect(
  null,
  dispatch => ({
    updateNote: bindActionCreators(updateNote, dispatch)
  })
)
export default class NoteView extends Component {
  state = {
    showEditor: false
  }

  handleShowEditor = () => {
    this.setState({ showEditor: true })
  }

  handleCloseEditor = (changes) => {
    const { note, updateNote } = this.props
    const newNote = note.merge(changes)

    if (!note.equals(newNote)) {
      updateNote(note.get('id'), changes)
    }

    this.setState({ showEditor: false })
  }

  render() {
    const { note } = this.props
    const name = note.get('name')

    return (
      <div>
        <div className='note-view'>
          <div onClick={this.handleShowEditor}>
            {name && <div className='title'>{name}</div>}
            <div className='content'>{note.get('content')}</div>
          </div>
          <NoteToolBar note={note} />
        </div>
        <NoteEditorDialog
          note={note}
          showEditor={this.state.showEditor}
          onDismiss={this.handleCloseEditor}
        />
      </div>
    )
  }
}

NoteView.propTypes = {
  note: PropTypes.object.isRequired
}
