import React from 'react';
import PropTypes from 'prop-types';
import Button from 'react-bootstrap/lib/Button';
import ButtonGroup from 'react-bootstrap/lib/ButtonGroup';

function NoteForm(props) {
  // Client validation
  // TODO centralize validation constant in config file
  const validateTitle = (e) => {
    if (e.target.value.length > 144) {
      e.target.value = e.target.value.substring(0, 144);
    }
    props.onTitleChange(e);
  };
  const validateContent = (e) => {
    if (e.target.value.length > 610) {
      e.target.value = e.target.value.substring(0, 610);
    }
    props.onContentChange(e);
  };

  return (
    <form>
      <div className="input-group">
        <span className="input-group-addon">Title</span>
        <input
          id="title"
          type="text"
          className="form-control"
          name="title"
          placeholder="Optional"
          value={props.noteTitle}
          maxLength="144"
          onChange={validateTitle}
        />
      </div>
      <div className="form-group">
        <textarea
          className="form-control"
          rows="13"
          id="note"
          value={props.noteContent}
          maxLength="610"
          onChange={validateContent}
        />
      </div>
      <ButtonGroup vertical block>
        <Button type="submit" bsStyle="success" onClick={props.onSubmit}>{props.okLabel}</Button>
        <Button type="button" onClick={props.onCancel}>Cancel</Button>
      </ButtonGroup>
    </form>
  );
}

NoteForm.defaultProps = {
  noteTitle: '',
  noteContent: '',
  okLabel: 'Submit',
};
NoteForm.propTypes = {
  onTitleChange: PropTypes.func.isRequired,
  onContentChange: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  noteContent: PropTypes.string,
  noteTitle: PropTypes.string,
  okLabel: PropTypes.string,
};
export default NoteForm;
