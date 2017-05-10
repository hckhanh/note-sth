import { Modal } from 'office-ui-fabric-react/lib/Modal'
import PropTypes from 'prop-types'
import React, { Component } from 'react'
import NoteEditorContent from './NoteEditorContent'
import NoteToolBar from './NoteToolBar'

export default class NoteEditorDialog extends Component {
  state = {
    showChecklist: false,
    isUpdated: false
  }

  handleDismiss = () => {
    this.props.onDismiss(this.content.data)
  }

  render() {
    const { showEditor, note } = this.props

    return (
      <Modal
        isOpen={showEditor}
        onDismiss={this.handleDismiss}
        containerClassName='ms-modalExample-container'
      >
        <NoteEditorContent
          ref={node => this.content = node}
          note={note}
        />
        <NoteToolBar
          note={note}
          showDone={true}
          onClose={this.handleDismiss}
        />
      </Modal>
    )
  }
}

NoteEditorDialog.propTypes = {
  note: PropTypes.object.isRequired,
  showEditor: PropTypes.bool.isRequired,
  onDismiss: PropTypes.func.isRequired
}
