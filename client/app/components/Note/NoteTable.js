import React, { Component, PropTypes } from 'react';
import ReactTable from 'react-table';
import { Tips } from '../Utils/Utils';
import 'react-table/react-table.css'
import 'whatwg-fetch';
import { withRouter } from "react-router-dom";


function CheckBoxCell(props, context) {
    const _onChange = (e) => {
      props.handleCheckBoxChange(props.note, e)
    }
    return (
      <input type="checkbox" onChange={_onChange}/>
    );
}

CheckBoxCell.propTypes = {
};

class NoteTable extends Component {
  constructor(props,context) {
    super(props,context);

    this.state = {
      counters: []
    };

    this.newCounter = this.newCounter.bind(this);
    this.incrementCounter = this.incrementCounter.bind(this);
    this.decrementCounter = this.decrementCounter.bind(this);
    this.deleteCounter = this.deleteCounter.bind(this);

    this._modifyCounter = this._modifyCounter.bind(this);
  }

  componentDidMount() {
    fetch('/api/counters')
      .then(res => res.json())
      .then(json => {
        this.setState({
          counters: json
        });
      });
  }

  newCounter() {
    fetch('/api/counters', { method: 'POST' })
      .then(res => res.json())
      .then(json => {
        let data = this.state.counters;
        data.push(json);

        this.setState({
          counters: data
        });
      });
  }

  incrementCounter(index) {
    const id = this.state.counters[index]._id;

    fetch(`/api/counters/${id}/increment`, { method: 'PUT' })
      .then(res => res.json())
      .then(json => {
        this._modifyCounter(index, json);
      });
  }

  decrementCounter(index) {
    const id = this.state.counters[index]._id;

    fetch(`/api/counters/${id}/decrement`, { method: 'PUT' })
      .then(res => res.json())
      .then(json => {
        this._modifyCounter(index, json);
      });
  }

  deleteCounter(index) {
    const id = this.state.counters[index]._id;

    fetch(`/api/counters/${id}`, { method: 'DELETE' })
      .then(_ => {
        this._modifyCounter(index, null);
      });
  }

  _modifyCounter(index, data) {
    let prevData = this.state.counters;

    if (data) {
      prevData[index] = data;
    } else {
      prevData.splice(index, 1);
    }

    this.setState({
      counters: prevData
    });
  }

  render() {
     const columns = [{
       Header: props => <input type="checkbox"/>,
       Cell: props => <CheckBoxCell
                        key={props.original._id}
                        note={props.original}
                        handleCheckBoxChange={this.props.handleCheckBoxChange}/>,
       className: 'table-checkbox-col',
       width: 34,
       sortable: false,
       resizable: false,
     }, {
       Header: 'Written on',
       accessor: 'createdAt', // String-based value accessors!
       className: 'clickable',
       width: 233,
       filterable: false
     }, {
       Header: 'Excerpt of the note',
       id: 'content',
       Cell: props => <span><strong>{props.original.title}</strong>&nbsp;{props.original.content}</span>, // Custom cell components!
       className: 'clickable',
     }]

    return (
      <div>
      <ReactTable
         showPaginationTop="true"
         showPaginationBottom="true"
         noDataText="There is no notes yet !"
         defaultSorted={[
            {
              id: "writtenOn",
              desc: true
            }
          ]}
         data={this.props.data}
         columns={columns}
         minRows="5"
         className="-striped -highlight"
         getTdProps={(state, rowInfo, column, instance) => {
            return {
              onClick: e => {
                if (!column.id) return; // The checkbox cell has no id and is not clickable
                console.log("Cell - onClick", {
                  state,
                  rowInfo,
                  column,
                  instance,
                  event: e
                  })
                  console.log(this.props);
                  this.props.history.push('/sample');
                }
            };
          }}
       />
       <Tips />
        <p>Counters:</p>

        <ul>
          { this.state.counters.map((counter, i) => (
            <li key={i}>
              <span>{counter.count} </span>
              <button onClick={() => this.incrementCounter(i)}>+</button>
              <button onClick={() => this.decrementCounter(i)}>-</button>
              <button onClick={() => this.deleteCounter(i)}>x</button>
            </li>
          )) }
        </ul>

        <button onClick={this.newCounter}>New counter</button>
      </div>
    );
  }
}

export default withRouter(NoteTable);
