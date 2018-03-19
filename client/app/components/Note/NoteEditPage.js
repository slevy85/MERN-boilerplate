import React, { Component } from 'react';
import { Redirect } from 'react-router';
import PropTypes from 'prop-types';
import Dialog from 'react-bootstrap-dialog';
import Button from 'react-bootstrap/lib/Button';
import callApi from '../Utils/ApiCaller';

import NoteForm from './NoteForm';

class NoteEditPage extends Component {
  constructor(props) {
    super(props);
    this.handleTitleChange = this.handleTitleChange.bind(this);
    this.handleContentChange = this.handleContentChange.bind(this);
    this.handleEditNote = this.handleEditNote.bind(this);
    this.handleCancel = this.handleCancel.bind(this);
    this.handleDeleteNote = this.handleDeleteNote.bind(this);
    this.state = {
      redirect: false,
      noteTitle: '',
      noteContent: '',
    };
  }

  componentDidMount() {
    // fetch note to edit
    callApi(`notes/${this.props.match.params.id}`)
      .then((res) => {
        this.setState({
          noteTitle: res.data.note.title,
          noteContent: res.data.note.content,
        });
      })
    // redirect if not found
      .catch(() => this.setState({ redirect: true }));
  }

  // Functions to control add form
  handleTitleChange(e) {
    this.setState({ noteTitle: e.target.value });
  }
  handleContentChange(e) {
    this.setState({ noteContent: e.target.value });
  }

  handleEditNote(e) {
    e.preventDefault();
    this.dialog.show({
      body: 'Do you want to edit this note ?',
      bsSize: 'medium',
      actions: [
        Dialog.CancelAction(),
        Dialog.DefaultAction(
          'Yes',
          () => {
            this.doEdit();
          },
          'btn-success'
        ),
      ],
    });
  }

  handleCancel() {
    this.setState({ redirect: true });
  }

  doEdit() {
    return callApi(`notes/${this.props.match.params.id}`, 'post', {
      note: {
        title: this.state.noteTitle,
        content: this.state.noteContent,
      },
    }).then(() => {
      // TODO alert for edit success
      this.setState({ redirect: true });
    }).catch(() => this.dialog.showAlert('Could note edit this note'));
  }

  handleDeleteNote() {
    this.dialog.show({
      body: 'Do you want to delete this note ?',
      bsSize: 'medium',
      actions: [
        Dialog.CancelAction(),
        Dialog.DefaultAction(
          'Yes',
          () => {
            this.doDelete();
          },
          'btn-danger'
        ),
      ],
    });
  }

  doDelete() {
    callApi(`notes/${this.props.match.params.id}`, 'delete')
    // redirect after delete
      .then(() => this.setState({ redirect: true }))
      .catch(() => { this.dialog.showAlert('Could not delete this note'); });
  }

  render() {
    if (this.state.redirect) {
      return <Redirect to="/" />;
    }
    return (
      <div>
        <div className="alert-head" >
          <h1>Edit your note</h1>
        </div>

        <NoteForm
          okLabel="Update this note"
          onSubmit={this.handleEditNote}
          onCancel={this.handleCancel}
          onTitleChange={this.handleTitleChange}
          onContentChange={this.handleContentChange}
          noteTitle={this.state.noteTitle}
          noteContent={this.state.noteContent}
        />

        <Button bsStyle="danger" onClick={this.handleDeleteNote}>Delete it</Button>

        <Dialog ref={(el) => { this.dialog = el; }} />
      </div>
    );
  }
}

NoteEditPage.propTypes = {
  match: PropTypes.object.isRequired,
};

export default NoteEditPage;
