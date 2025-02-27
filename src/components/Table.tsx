import React, { useState } from "react";
import styled from "styled-components";
import { DataItem, DataArr } from "../types";

const TableContainer = styled.div`
  flex: 1;
  padding: 10px;
`;

const Table: React.FC<
  DataArr & { onUpdate: (newData: DataItem[]) => void }
> = ({ dataProp, onUpdate }) => {
  const [editableRow, setEditableRow] = useState<string | null>(null);

  const handleChange = (id: string, type: string, value: string) => {
    const updatedData = dataProp.map((item) => {
      if (item.id === id) {
        switch (type) {
          case "label":
            return { ...item, model: value };
          case "tilt":
            return { ...item, tilt: parseInt(value) };
          case "capacity":
            return { ...item, capacity: parseInt(value) };
          case "isActive":
            return { ...item, isActive: !item.isActive };
          default:
            return item;
        }
      }
      return item;
    });

    onUpdate(updatedData);
  };

  const deleteRow = (id: string) => {
    onUpdate(dataProp.filter((item) => item.id !== id));
  };

  const submitEdit = () => {
    setEditableRow(null);
  };

  if (!dataProp || dataProp.length === 0) return <label>No data</label>;

  return (
    <TableContainer>
      <h2>Table</h2>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Model</th>
            <th>Tilt</th>
            <th>Capacity</th>
            <th>Active</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {dataProp.map((item) => (
            <tr key={item.id}>
              <td>{item.id}</td>
              <td>
                <input
                  type="text"
                  value={item.model}
                  disabled={item.id !== editableRow}
                  onChange={(e) =>
                    handleChange(item.id, "label", e.target.value)
                  }
                />
              </td>
              <td>
                <input
                  type="number"
                  min={0}
                  max={180}
                  value={item.tilt}
                  disabled={item.id !== editableRow}
                  onChange={(e) =>
                    handleChange(item.id, "tilt", e.target.value)
                  }
                />
              </td>
              <td>
                <input
                  type="number"
                  value={item.capacity}
                  disabled={item.id !== editableRow}
                  onChange={(e) =>
                    handleChange(item.id, "capacity", e.target.value)
                  }
                />
              </td>
              <td>
                <input
                  type="checkbox"
                  checked={item.isActive}
                  disabled={item.id !== editableRow}
                  onChange={() => handleChange(item.id, "isActive", "")}
                />
              </td>
              <td>
                <button
                  onClick={() =>
                    editableRow === item.id
                      ? submitEdit()
                      : setEditableRow(item.id)
                  }
                >
                  {editableRow === item.id ? "Submit" : "Edit"}
                </button>
                <button onClick={() => deleteRow(item.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </TableContainer>
  );
};

export default Table;
