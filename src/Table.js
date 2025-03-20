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
import { samplePropsListItem } from "./testData";

export function DataTable({ title, data, setSubmitted, propsListID }) {
  // Extract table headers from the JSON object, excluding its ID as a field
  const headers = Object.keys(samplePropsListItem).filter(
    (s) => s !== "propslistitemid"
  );
  // Set up the new row form with default data
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
            <TableCell>
              {/* Placeholder header cell for buttons column */}
            </TableCell>
            {headers.map((header) => (
              <TableCell align="right">{header.toUpperCase()}</TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          <PropsListTableRowForm
            setSubmitted={setSubmitted}
            emp={form}
            // Empty function, since the page would reload anyway and return to a fresh state
            setEditing={() => setForm(initialNewRow)}
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
  // emp here is the propsListItem Object itself.
  const [editing, setEditing] = useState(false);
  const navigate = useNavigate();
  // Determine whether a prop is done
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
    const propID = emp.propid;
    // Redirect to corresponding prop page
    navigate("/prop/" + propID);
  }
  function handleUnlinkProp(e){
    // link it to null to unlink
    submitData("props-list-item/link", {propsListItemID: null}, "PUT");
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
            {emp.propid && (
              <>
                <Button
                  variant="outlined"
                  sx={{ width: 0 }}
                  onClick={handleViewLinkedProp}
                >
                  View Linked prop
                </Button>
                <Button onClick={handleUnlinkProp}>Unlink prop</Button>
              </>
            )}
          </TableCell>
          {/* Access each field of the object */}
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
  const propDone = formData.status === "Done";
  // propDone is derived from formData.

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
    // It should fetch first and wait for a confirmation from server before reloading it.
    setSubmitted(true); // submitted would mean a reload needed
    setEditing(false);
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
