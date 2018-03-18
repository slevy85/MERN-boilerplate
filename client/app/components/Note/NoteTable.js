import React, { Component, PropTypes } from 'react';
import ReactTable from 'react-table';
import { Tips } from '../Utils/Utils';
import 'react-table/react-table.css'
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

function NoteTable (props,context) {

     const columns = [{
       // Header: props => <input type="checkbox"/>,
       Cell: row => <CheckBoxCell
                        key={row.original._id}
                        note={row.original}
                        handleCheckBoxChange={props.handleCheckBoxChange}/>,
       className: 'table-checkbox-col',
       width: 34,
       sortable: false,
       resizable: false,
     }, {
       Header: 'Written on',
       id: 'writtenOn',
       accessor: d => new Date(d.createdAt).toLocaleString("en-US"), // formatted date
       className: 'clickable',
       width: 233,
       filterable: false
     }, {
       Header: 'Excerpt of the note',
       id: 'title',
       accessor: 'title',
       Cell: row => <span><strong>{row.original.title}</strong>&nbsp;{row.original.content.substring(0,144)}</span>, // Custom cell components!
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
                desc: false
              }
            ]}
           data={props.data}
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
                    // navigate
                    props.history.push(`/notes/${rowInfo.original._id}`);
                  }
              };
            }}
         />
         <Tips />
      </div>
    )
}

export default withRouter(NoteTable);
