import 'react-table/react-table.css';
import { withRouter } from 'react-router-dom';
import React from 'react';
import PropTypes from 'prop-types';
import ReactTable from 'react-table';
import { Tips } from '../Utils/Utils';

function CheckBoxCell(props) {
  const _onChange = (e) => {
    props.onChange(props.note, e);
  };
  return (
    <input type="checkbox" onChange={_onChange} />
  );
}

function NoteTable(props) {
  const { handleCheckBoxChange } = props;
  const columns = [{
    // Header: props => <input type="checkbox"/>,
    Cell: row => (<CheckBoxCell
      key={row.original._id}
      note={row.original}
      onChange={handleCheckBoxChange}
    />),
    className: 'table-checkbox-col',
    width: 34,
    sortable: false,
    resizable: false,
  }, {
    Header: 'Written on',
    id: 'writtenOn',
    accessor: d => new Date(d.createdAt).toLocaleString('en-US'), // formatted date
    className: 'clickable',
    width: 233,
    filterable: false,
  }, {
    Header: 'Excerpt of the note',
    id: 'title',
    accessor: 'title',
    Cell: row => <span><strong>{row.original.title.substring(0, 21)}</strong>&nbsp;{row.original.content.substring(0, 55)}</span>, // Custom cell components!
    className: 'clickable',
  }];

  return (
    <div>
      <ReactTable
        showPaginationTop="true"
        showPaginationBottom="true"
        noDataText="There is no notes yet !"
        defaultSorted={[
              {
                id: 'writtenOn',
                desc: false,
              },
            ]}
        data={props.data}
        columns={columns}
        minRows="5"
        className="-striped -highlight"
        getTdProps={(state, rowInfo, column) => {
              return {
                onClick: () => {
                  if (!column.id) return; // The checkbox cell has no id and is not clickable
                    // navigate
                    props.history.push(`/notes/${rowInfo.original._id}`);
                  },
              };
            }}
      />
      <Tips />
    </div>
  );
}
CheckBoxCell.propTypes = {
  onChange: PropTypes.func.isRequired,
  note: PropTypes.objectOf.isRequired,
};
NoteTable.propTypes = {
  data: PropTypes.array.isRequired,
  handleCheckBoxChange: PropTypes.func.isRequired,
  history: PropTypes.object.isRequired,
};


export default withRouter(NoteTable);
