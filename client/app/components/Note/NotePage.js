import React, { Component } from 'react';
import ButtonGroup from 'react-bootstrap/lib/ButtonGroup';
import Button from 'react-bootstrap/lib/Button';
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
    console.log(this.state)
    return callApi('notes', 'post', {
      note: {
        title: this.state.noteTitle,
        content: this.state.noteContent,
      },
    }).then(res => {
        let newNotes = this.state.notes;
        newNotes.push(res.note);
        this.setState({
          notes: newNotes,
          noteTitle : '',
          noteContent : '',
          showAdd: false
        });
    });
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
    let newNotes = this.state.notes;
    let newSelectedIds = this.state.selectedIds;
    if (!confirm('Do you want to delete the selected notes ?')){
      return;
    }
    this.state.selectedIds.forEach( idToDelete => {
      callApi(`notes/${idToDelete}`, 'delete').then(res => {
        // remove notes from state
        console.log(res)
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
     document.removeEventListener("keydown", this.escFunction, false);
 }

  render() {
    return (
        <div>
          <ButtonGroup>
            <Button bsStyle="primary" onClick={this.handleShowAdd}>Add</Button>
            <Button onClick={this.handleDeleteNotes}>Delete</Button>
          </ButtonGroup>
          <NoteAddBox
            show={this.state.showAdd}
            handleDismiss={this.handleDismissAdd}
            handleAdd={this.handleAddNote}
            onTitleChange={this.handleTitleChange}
            onContentChange={this.handleContentChange}
            noteTitle={this.state.noteTitle}
            noteContent={this.state.noteContent}/>
          <NoteTable
            data={this.state.notes}
            handleCheckBoxChange={this.handleCheckBoxChange}
          />
        </div>
    )
  }
}

export default NotePage;
