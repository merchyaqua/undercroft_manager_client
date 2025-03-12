import {
  Button,
  Checkbox,
  InputLabel,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TextField,
  ToggleButton,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { handleFormSubmit, submitData } from "./fetchItems";

// https://codesandbox.io/p/sandbox/material-ui-table-dynamic-wrod4?file=%2Fsrc%2Findex.js%3A10%2C7
export function DataTable({ title, data, setSubmitted, propsListID }) {
  // Extract headers and not include id as a field
  
  const headers = Object.keys(samplePropsListItem).filter((s) => s !== "propslistitemid");
  const initialNewRow = {
    name: "",
    description: "",
    sourcestatus: "Todo",
    action: "",
  };
  const [form, setForm] = useState(initialNewRow);
  return (
    <Paper>
      <Typography variant="h4" color="inherit">
        {title}
      </Typography>

      <hr />

      <Table>
        <TableHead>
          <TableRow>
            <TableCell></TableCell>
            {headers.map((header) => (
              <TableCell align="right">{header.toUpperCase()}</TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          <PropsListTableRowForm
            setSubmitted={setSubmitted}
            emp={form}
            setEditing={() => setForm(initialNewRow)} // empty function since the page would reload anyway and return to a fresh state
            headers={headers}
            add={true}
            propsListID={propsListID}
          />

          {data.map((emp, index) => (
            <PropsListTableRow
              emp={emp}
              headers={headers}
              key={index}
              setSubmitted={setSubmitted}
            />
          ))}
        </TableBody>
      </Table>
    </Paper>
  );
}

function PropsListTableRow({ emp, headers, setSubmitted }) {
  // emp here is the props list item gObject with key-value pairs.

  const [editing, setEditing] = useState(false);
  const navigate = useNavigate();
  const done = emp.sourcestatus === "Done";
  const [propDone, setPropDone] = useState(done);
  useEffect(() => setPropDone(emp.sourcestatus === "Done"), [emp]);
  useEffect(() => setSubmitted(false)); // on getting the component mounted, set not submitted

  function handleEditButtonClicked() {
    setEditing(true);
  }
  function handleToggleDone(e) {
    // Action is set to 'Done' and submitted to the PUT method.
    // setPropDone(!propDone);

    const newData = { ...emp, sourceStatus: !propDone ? "Done" : "Todo" };
    submitData("props-list-item/" + emp.propslistitemid, newData, "PUT");
    setSubmitted(true);
  }
  function handleDeleteItem(e) {
    submitData("props-list-item/" + emp.propslistitemid, null, "DELETE");
    setSubmitted(true);
  }
  function handleViewLinkedProp(e) {
    // Access the linked propID in the emp
    const propID = emp.propID;
    // Redirect to corresponding prop page
    navigate("/prop/" + propID);
  }
  return (
    <>
      {editing ? (
        <PropsListTableRowForm
          emp={emp}
          headers={headers}
          add={false}
          setEditing={setEditing}
          setSubmitted={setSubmitted}
        />
      ) : (
        <TableRow
          key={emp.propslistitemid}
          sx={propDone && { backgroundColor: "#efffef" }}
        >
          <TableCell>
            <InputLabel>Done</InputLabel>
            <Checkbox
              color="success"
              value={propDone}
              checked={propDone}
              onChange={handleToggleDone}
            />
            <ToggleButton
              sx={{ "background-color": "Beige" }}
              onClick={handleEditButtonClicked}
            >
              ✏️
            </ToggleButton>
            <ToggleButton onClick={handleDeleteItem}>❌</ToggleButton>
            {}
            <Button
              variant="outlined"
              sx={{ width: 0 }}
              onClick={handleViewLinkedProp}
            >
              View Linked prop
            </Button>
          </TableCell>
          {headers.map((header) => (
            <TableCell align="right" key={header}>
              {emp[header]}
            </TableCell>
          ))}
        </TableRow>
      )}
    </>
  );
}

DataTable.defaultProps = {
  title: "No Title",
};

function PropsListTableRowForm({
  emp,
  headers,
  setSubmitted,
  setEditing,
  add,
  propsListID,
}) {
  const initialData = { ...emp, sourceStatus: emp.sourcestatus };
  const [formData, setFormData] = useState(initialData);
  const canSubmit = formData.name !== "";
  const propDone = formData.status === "Done"; //propDone is derived from formData.

  function handleChange(e) {
    const name = e.target.name;
    const value = e.target.value;
    // handle add new for location and category
    setFormData((values) => ({ ...values, [name]: value }));
  }

  function handleSubmit(e) {
    console.log("submit");
    if (add) {
      const res = handleFormSubmit(e, "props-list/" + propsListID, formData);
    } else {
      const res = submitData(
        "props-list-item/" + formData.propslistitemid,
        formData,
        "PUT"
      );
    }
    // It should fetch first and wait for a return code before disappearing it.

    setSubmitted(true); // submitted would mean a reload needed
    setEditing(false);

    // console.log("submit changed to true")
  }
  return (
    <TableRow key={emp} sx={propDone && { backgroundColor: "#efffef" }}>
      <TableCell>
        <Button onClick={handleSubmit} disabled={!canSubmit}>
          {add ? "+ ADD" : "SAVE"}
        </Button>
        <Button
          onClick={() => {
            setFormData(initialData);
            setEditing(false);
          }}
        >
          CANCEL
        </Button>
      </TableCell>
      {headers.map((header) => (
        <TableCell align="right" key={header}>
          <TextField
            value={formData[header] || ""}
            name={header}
            onChange={handleChange}
          ></TextField>
        </TableCell>
      ))}
    </TableRow>
  );
}

export default DataTable;
