import Minigrid from 'minigrid'
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { getNotes } from '../../../actions/home'
import NoteView from './NoteView'

@connect(
  state => ({
    notes: state.home.get('notes')
  }),
  dispatch => ({
    getNotes: bindActionCreators(getNotes, dispatch)
  })
)
export default class NoteList extends Component {
  componentDidMount() {
    this.props.getNotes()
    addEventListener('resize', this.handleOnResize)
  }

  componentDidUpdate() {
    this.grid = new Minigrid({
      container: '.note-container',
      item: '.note-view',
      gutter: 16
    })
    this.grid.mount()
  }

  componentWillUnmount() {
    removeEventListener('resize', this.handleOnResize)
  }

  handleOnResize = () => {
    this.grid.mount()
  }

  render() {
    return (
      <div className='note-container'>
        {
          this.props.notes.reverse().map(note => <NoteView key={note.get('id')} note={note} />)
        }
      </div>
    )
  }
}
