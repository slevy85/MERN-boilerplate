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
    this.handleShowAdd = this.handleShowAdd.bind(this);
    this.handleAddNote = this.handleAddNote.bind(this);
    this.handleTitleChange = this.handleTitleChange.bind(this);
    this.handleContentChange = this.handleContentChange.bind(this);
    this.escFunction = this.escFunction.bind(this);

    this.state = {
      notes: [],
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
    return callApi('note', 'post', {
      note: {
        title: this.state.noteTitle,
        content: this.state.noteContent,
      },
    }).then(res => {
        let newNotes = this.state.notes;
        newNotes.push(res.note);
        this.setState({
          notes: newNotes
        });
    });
  }
  
  handleDismissAdd() {
   this.setState({ showAdd: false });
 }

  handleShowAdd() {
   this.setState({ showAdd: true });
 }

 escFunction(event){
    //Close add box on escape
   if(event.keyCode === 27) {
         this.handleDismissAdd()
   }
 }

 componentDidMount(){
     document.addEventListener("keydown", this.escFunction, false);
 }
 componentWillUnmount(){
     document.removeEventListener("keydown", this.escFunction, false);
 }

  render() {
    return (
        <div>
          <ButtonGroup>
            <Button bsStyle="primary" onClick={this.handleShowAdd}>Add</Button>
            <Button>Delete</Button>
          </ButtonGroup>
          <NoteAddBox
            show={this.state.showAdd}
            handleDismiss={this.handleDismissAdd}
            handleAdd={this.handleAddNote}
            onTitleChange={this.handleTitleChange}
            onContentChange={this.handleContentChange}
            noteTitle={this.state.noteTitle}
            noteContent={this.state.noteContent}/>
          <NoteTable / >
        </div>
    )
  }
}

export default NotePage;
