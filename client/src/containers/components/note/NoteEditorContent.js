import { TextField } from 'office-ui-fabric-react'
import PropTypes from 'prop-types'
import React, { Component } from 'react'
// import { connect } from 'react-redux'
// import { bindActionCreators } from 'redux'
// import { updateNote } from '../../../actions/home'

// @connect(
//   null,
//   dispatch => ({
//     updateNote: bindActionCreators(updateNote, dispatch)
//   })
// )
export default class NoteEditorContent extends Component {
  componentDidMount() {
    this.content.focus()
  }

  get data() {
    const { name, content } = this
    return {
      name: name.value,
      content: content.value
    }
  }

  render() {
    const { note } = this.props

    return (
      <div>
        <TextField
          ref={node => this.name = node}
          defaultValue={note && note.get('name')}
          placeholder='Title'
        />
        <TextField
          ref={(node) => this.content = node}
          defaultValue={note && note.get('content')}
          placeholder='Take a note before you forget it...'
          multiline={true}
          autoAdjustHeight={true}
        />
      </div>
    )
  }
}

NoteEditorContent.propTypes = {
  note: PropTypes.object
}
