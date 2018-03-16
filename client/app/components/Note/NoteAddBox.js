import React, { Component } from 'react';
import Alert from 'react-bootstrap/lib/Alert';
import Button from 'react-bootstrap/lib/Button';
class NoteAddBox extends Component {
  constructor(props) {
    super(props);

  }

  render() {
    if (!this.props.show) return null;
    return (
        <div className="fixed-bottom-right">
          <div className="alert-head" >
            <strong>Please write a note</strong>
            <a href="#" className="close" onClick={this.props.handleDismiss}>&times;</a>
          </div>
          <Alert bsStyle="success">
            <form>
              <div className="input-group">
                 <span className="input-group-addon">Title</span>
                 <input id="title" type="text" className="form-control" name="title" placeholder="Optional"
                        value={this.props.noteTitle} onChange={this.props.onTitleChange}/>
               </div>
               <div className="form-group">
                 <textarea className="form-control" rows="13" id="note"
                           value={this.props.noteContent} onChange={this.props.onContentChange}/>
               </div>
               <Button type="button" bsStyle="primary" block onClick={this.props.handleAdd}>Add this note</Button>
            </form>
          </Alert>
        </div>
    )
  }
}

export default NoteAddBox;
