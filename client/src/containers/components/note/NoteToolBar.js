import { DefaultButton, Dialog, DialogFooter, DialogType, IconButton, PrimaryButton } from 'office-ui-fabric-react'
import PropTypes from 'prop-types'
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { deleteNote } from '../../../actions/home'

@connect(
  null,
  dispatch => ({
    deleteNote: bindActionCreators(deleteNote, dispatch)
  })
)
export default class NoteToolBar extends Component {
  state = {
    showDeleteDialog: false
  }

  generateDeleteDialog = () => {
    return (
      <Dialog
        isOpen={this.state.showDeleteDialog}
        type={DialogType.normal }
        onDismiss={this.closeDeleteDialog}
        title='Delete this note'
        subText='After you delete, there is no way to restore the note. For now, the undo feature is developing.'
      >
        <DialogFooter>
            <PrimaryButton onClick={this.handleDeleteNote} text='Delete' />
            <DefaultButton onClick={this.closeDeleteDialog} text='Cancel' />
        </DialogFooter>
      </Dialog>
    )
  }

  showDeleteDialog = () => {
    this.setState({ showDeleteDialog: true })
  }

  closeDeleteDialog = () => {
    this.setState({ showDeleteDialog: false })
  }

  handleDeleteNote = () => {
    const { deleteNote, note } = this.props
    deleteNote(note.get('id'))
  }

  render() {
    const { note } = this.props
    const name = note.get('name')

    return (
      <div className='tool-bar'>
        <IconButton iconProps={ { iconName: 'Delete' } } title='Delete note' onClick={this.showDeleteDialog} />
        {this.generateDeleteDialog()}
      </div>
    )
  }
}

NoteToolBar.propTypes = {
  note: PropTypes.object.isRequired
}
