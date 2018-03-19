import React, { Component } from 'react';
import Alert from 'react-bootstrap/lib/Alert';
import NoteForm from './NoteForm';

function NoteAddBox(props) {
  if (!props.show) return null;
  return (
    <div className="fixed-bottom-right">
      <div className="alert-head" >
        <strong>Please write a note</strong>
        <a href="#" className="close" onClick={props.onDismiss}>&times;</a>
      </div>
      <Alert bsStyle="success">
        <NoteForm
          okLabel={props.okLabel}
          onSubmit={props.onAdd}
          onCancel={props.onCancel}
          onTitleChange={props.onTitleChange}
          onContentChange={props.onContentChange}
          noteTitle={props.noteTitle}
          noteContent={props.noteContent}
        />
      </Alert>
    </div>
  );
}

export default NoteAddBox;
