import React from 'react';

function DataTable({ data }) {
  return (
    <div className="w-full overflow-scroll">
      <table className="table table-bordered table-hover table-striped">
        <thead>
          <tr>
            <td width="5%">Ticket</td>
            <td width="5%">callername</td>
            <td width="5%">Date</td>
            <td width="10%">subsublocationname</td>
            <td width="10%">subsubclassificationname</td>
            <td width="10%">category</td>
            <td width="5%">longitude</td>
            <td width="5%">latitude</td>
            <td width="10%">Department</td>
            <td width="5%">Status</td>
          </tr>
        </thead>
        <tbody>
          {data.map((item) => (
            <tr key={item.Ticket}>
              <td>{item.Ticket}</td>
              <td>{item.callername}</td>
              <td>{item.Date}</td>
              <td>{item.subsublocationname}</td>
              <td>{item.subsubclassificationname}</td>
              <td>{item.category}</td>
              <td>{item.longitude}</td>
              <td>{item.latitude}</td>
              <td>{item.Department}</td>
              <td>{item.Status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default DataTable;
