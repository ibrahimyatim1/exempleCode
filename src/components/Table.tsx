import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { DataItem, DataArr } from "../types";

const TableContainer = styled.div`
  flex: 1;
  padding: 10px;
`;

const Table: React.FC<DataArr> = ({ dataProp }: DataArr) => {
  // je vais modifier le prop data dans le component la pour ne pas causer des rerender dans le component App qui sont pas necessaires
  const [editableRow, setEditableRow] = useState<string | null>(null);
  const [data, setData] = useState<DataItem[] | null>(null);

  useEffect(() => {
    setData(dataProp);
  }, [dataProp]);

  const handleChange = (id: string, type: string, value: string) => {
    setData((prevData) =>
      prevData.map((item) => {
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
      })
    );
  };

  const deleteRow = (id: string) => {
    let _nData = data?.filter((item) => item.id != id);
    console.log("data:::", _nData);
    if (_nData) setData(_nData);
  };

  const submitEdit = () => {
    setEditableRow(null);
  };

  if (data?.length == 0) return <label>No data</label>;
  return (
    <TableContainer>
      <h2>Table</h2>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Model ou bien Label??</th>
            <th>Tilt</th>
            <th>Capacity</th>
            <th>Active</th>
          </tr>
        </thead>
        <tbody>
          {data?.map((item) => (
            <tr key={item.id}>
              <td>{item.id}</td>
              <td>
                <input
                  type="text"
                  value={item.model}
                  disabled={item.id != editableRow}
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
                  disabled={item.id != editableRow}
                  onChange={(e) =>
                    handleChange(item.id, "tilt", e.target.value)
                  }
                />
              </td>
              <td>
                <input
                  type="number"
                  value={item.capacity}
                  disabled={item.id != editableRow}
                  onChange={(e) =>
                    handleChange(item.id, "capacity", e.target.value)
                  }
                />
              </td>
              <td>
                <input
                  type="checkbox"
                  disabled={item.id != editableRow}
                  checked={item.isActive}
                  onChange={(e) =>
                    handleChange(item.id, "isActive", e.target.value)
                  }
                />
              </td>
              <td>
                <button
                  onClick={() =>
                    editableRow == item.id
                      ? submitEdit()
                      : setEditableRow(item.id)
                  }
                >
                  {editableRow == item.id ? "Submit" : "Edit"}
                </button>
              </td>
              <td>
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
