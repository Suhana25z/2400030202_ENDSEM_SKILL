import React, { useReducer } from "react";

const studentsList = [
  { id: 1, name: "Student 1", status: "" },
  { id: 2, name: "Student 2", status: "" },
  { id: 3, name: "Student 3", status: "" }
];

function reducer(state, action) {
  switch (action.type) {
    case "MARK_PRESENT":
      return state.map(s =>
        s.id === action.id ? { ...s, status: "Present" } : s
      );

    case "MARK_ABSENT":
      return state.map(s =>
        s.id === action.id ? { ...s, status: "Absent" } : s
      );

    case "RESET":
      return state.map(s => ({ ...s, status: "" }));

    default:
      return state;
  }
}

export default function App() {
  const [students, dispatch] = useReducer(reducer, studentsList);

  return (
    <div style={{ padding: "20px" }}>
      <h2>Attendance App (useReducer)</h2>

      {students.map(s => (
        <div key={s.id} style={{ marginBottom: "10px" }}>
          {s.name} —
          <button onClick={() => dispatch({ type: "MARK_PRESENT", id: s.id })}>
            Present
          </button>
          <button onClick={() => dispatch({ type: "MARK_ABSENT", id: s.id })}>
            Absent
          </button>
        </div>
      ))}

      <button onClick={() => dispatch({ type: "RESET" })}>Reset All</button>

      <h3>Final Attendance</h3>

      <table border="1" cellPadding="8">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {students.map(s => (
            <tr key={s.id}>
              <td>{s.id}</td>
              <td>{s.name}</td>
              <td>{s.status || "Not Marked"}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}