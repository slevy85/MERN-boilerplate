import React from 'react';
import PropTypes from 'prop-types';
import Alert from 'react-bootstrap/lib/Alert';
import NoteForm from './NoteForm';

function NoteAddBox(props) {
  const {
    show, okLabel, onAdd, onCancel, onTitleChange, onContentChange, noteTitle, noteContent, onDismiss,
  } = props;
  if (!show) return null;
  return (
    <div className="fixed-bottom-right">
      <div className="alert-head" >
        <strong>Please write a note</strong>
        <button className="close" onClick={onDismiss}>&times;</button>
      </div>
      <Alert bsStyle="success">
        <NoteForm
          okLabel={okLabel}
          onSubmit={onAdd}
          onCancel={onCancel}
          onTitleChange={onTitleChange}
          onContentChange={onContentChange}
          noteTitle={noteTitle}
          noteContent={noteContent}
        />
      </Alert>
    </div>
  );
}

NoteAddBox.defaultProps = {
  show: false,
  noteTitle: '',
  noteContent: '',
  okLabel: 'Submit',
};
NoteAddBox.propTypes = {
  show: PropTypes.bool,
  onDismiss: PropTypes.func.isRequired,
  onTitleChange: PropTypes.func.isRequired,
  onContentChange: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
  onAdd: PropTypes.func.isRequired,
  noteContent: PropTypes.string,
  noteTitle: PropTypes.string,
  okLabel: PropTypes.string,
};
export default NoteAddBox;
