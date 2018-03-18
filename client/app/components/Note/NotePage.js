import React, { Component } from 'react';
import ButtonGroup from 'react-bootstrap/lib/ButtonGroup';
import Button from 'react-bootstrap/lib/Button';
import Dialog from 'react-bootstrap-dialog'
import NoteAddBox from './NoteAddBox';
import NoteTable from './NoteTable';
import callApi from '../Utils/ApiCaller';

class NotePage extends Component {
  constructor(props) {
    super(props);
    this.handleDismissAdd = this.handleDismissAdd.bind(this);
    this.handleDeleteNotes = this.handleDeleteNotes.bind(this);
    this.handleShowAdd = this.handleShowAdd.bind(this);
    this.handleAddNote = this.handleAddNote.bind(this);
    this.handleCancelAddNote = this.handleCancelAddNote.bind(this);
    this.handleTitleChange = this.handleTitleChange.bind(this);
    this.handleContentChange = this.handleContentChange.bind(this);
    this.escFunction = this.escFunction.bind(this);
    this.handleCheckBoxChange = this.handleCheckBoxChange.bind(this);

    this.state = {
      notes: [],
      selectedIds: [],
      showAdd: false,
      noteTitle: '',
      noteContent: ''
    };

  }

  //Functions to control add form
  handleTitleChange(e) {
    this.setState({ noteTitle: e.target.value });
  }
  handleContentChange(e) {
    this.setState({ noteContent: e.target.value });
  }
  handleAddNote(e) {
    e.preventDefault();
    this.dialog.show({
      body: 'Do you want to add this note ?',
      bsSize: 'medium',
      actions: [
        Dialog.CancelAction(),
        Dialog.DefaultAction(
          'Yes',
          () => {
            this.doAdd()
          },
          'btn-success'
        )
      ]
    })
  }

  handleCancelAddNote() {
    this.setState({
      noteTitle : '',
      noteContent : '',
      showAdd: false
    });
  }

  doAdd(){
    console.log(this.state)
    return callApi('notes', 'post', {
      note: {
        title: this.state.noteTitle,
        content: this.state.noteContent,
      },
    }).then(res => {
        let newNotes = this.state.notes;
        newNotes.push(res.data.note);
        this.setState({
          notes: newNotes,
          noteTitle : '',
          noteContent : '',
          showAdd: false
        });
    }).catch(err => this.dialog.showAlert('Could not save this note'));
  }

  handleCheckBoxChange(note, e) {
    let newSelectedIds = this.state.selectedIds;
    if(e.target.checked) {
      newSelectedIds.push(note._id);
    } else {
      newSelectedIds = newSelectedIds.filter(id => note._id !== id)
    }
    console.log(newSelectedIds)
    this.setState({
      selectedIds: newSelectedIds
    });
  }

  handleDeleteNotes(e) {
    if(this.state.selectedIds.length == 0) {
      return;
    }
    this.dialog.show({
      body: 'Do you want to delete the selected notes ?',
      bsSize: 'medium',
      actions: [
        Dialog.CancelAction(),
        Dialog.DefaultAction(
          'Yes',
          () => {
            this.doDelete()
          },
          'btn-danger'
        )
      ]
    })
  }

  doDelete() {
    let newNotes = this.state.notes;
    let newSelectedIds = this.state.selectedIds;
    this.state.selectedIds.forEach( idToDelete => {
      callApi(`notes/${idToDelete}`, 'delete').then(res => {
        // remove notes from state
        newNotes = newNotes.filter(note => note._id !== idToDelete)
        newSelectedIds = newSelectedIds.filter(id => id !== idToDelete)
        this.setState({
            notes: newNotes,
            selectedIds : newSelectedIds
          });
      })
      .catch(error => {alert('Could not delete these notes')});
    })
  }

  handleDismissAdd(e) {
    e.preventDefault();
    this.setState({ showAdd: false });
  }

  handleShowAdd() {
   this.setState({ showAdd: true });
 }

 escFunction(event){
    //Close add box on escape
   if(event.keyCode === 27) {
      this.handleDismissAdd(event)
   }
 }

 componentDidMount(){
    // Close add box on escape key
    document.addEventListener("keydown", this.escFunction, false);

    // fetch notes
    callApi('notes').then(res => {
      this.setState({
        notes: res.data.notes
      });
    });
 }
 componentWillUnmount(){
   console.log('unmount');
    document.removeEventListener("keydown", this.escFunction, false);
 }

  render() {
    return (
        <div>
          <ButtonGroup>
            <Button bsStyle="primary" onClick={this.handleShowAdd}>Add</Button>
            <Button onClick={this.handleDeleteNotes} disabled={this.state.selectedIds.length == 0}>Delete</Button>
          </ButtonGroup>

          <NoteTable
            data={this.state.notes}
            handleCheckBoxChange={this.handleCheckBoxChange}
          />

          <NoteAddBox
            show={this.state.showAdd}
            onDismiss={this.handleDismissAdd}
            okLabel="Add this note"
            onAdd={this.handleAddNote}
            onCancel={this.handleCancelAddNote}
            onTitleChange={this.handleTitleChange}
            onContentChange={this.handleContentChange}
            noteTitle={this.state.noteTitle}
            noteContent={this.state.noteContent}
          />

          <Dialog ref={(el) => { this.dialog = el }} />
        </div>
    )
  }
}

export default NotePage;
