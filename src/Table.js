import {useEffect, useState} from "react";
import {Button, Checkbox, InputLabel, Paper, Table, TableBody, TableCell, TableHead, TableRow, TextField, ToggleButton, Typography} from '@mui/material'
import { handleFormSubmit } from "./fetchItems";

// https://codesandbox.io/p/sandbox/material-ui-table-dynamic-wrod4?file=%2Fsrc%2Findex.js%3A10%2C7
export function DataTable({ title, data, setSubmitted }) {
  // Extract headers and not include id as a field
  const sample = {
    name: "2x Sword",
    description: "...he swung his sword at the guard",
    sourcestatus: "waiting",
    action: "Buy from Amazon",
    propslistitemid: 22,
  }
  const headers = Object.keys(sample).filter((s) => s !== 'propslistitemid');
  
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
            {headers.map(header => (
              <TableCell align="right">{header.toUpperCase()}</TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          <PropsListTableRowForm setSubmitted={setSubmitted} headers={headers}></PropsListTableRowForm>


          {data.map((emp, index) => (
            <PropsListTableRow emp={emp} headers={headers} key={index}/>
            
          ))}
        </TableBody>
      </Table>
    </Paper>
  );
}

function PropsListTableRow({emp, headers}){
  const [propDone, setPropDone] = useState(false);
  function handleItemToggleDone(){
    // post request that sends stuff using porpslistitemid for a partial update
  }
  useEffect(handleItemToggleDone, [propDone]);
  return (
    <TableRow key={emp.propslistitemid}  sx={ propDone && {backgroundColor: '#efffef'}}>
      <TableCell >
        <InputLabel>Done</InputLabel>
        <Checkbox color="success" value={propDone} onChange={() => setPropDone(!propDone)}></Checkbox>
        <ToggleButton sx={{"background-color":"Beige"}}>✏️</ToggleButton>
        <ToggleButton >❌</ToggleButton>
        <Button variant="outlined" sx={{width: 0}}>View Linked prop</Button>
      </TableCell>
      {headers.map(header => (
        <TableCell align="right" key={header}>{emp[header]}</TableCell>
      ))}
    </TableRow>
  )
}

DataTable.defaultProps = {
  title: "No Title"
};


function PropsListTableRowForm({emp, headers, setSubmitted}){
  const [propDone, setPropDone] = useState(false);
  const [formData, setFormData] = useState({name: ''})
  const canAdd = formData.name !== '';
  
  
  function handleChange(e) {
    const name = e.target.name;
    const value = e.target.value;
    // handle add new for location and category
    setFormData((values) => ({ ...values, [name]: value }));
  }

  function handleItemToggleDone(){
    // post request that sends stuff using porpslistitemid for a partial update
  }
  function handleAddPropsListItem(e){
    handleFormSubmit(e, 'props-list', formData)
    setSubmitted(true);
    console.log("submit changed to true")
  }
  useEffect(handleItemToggleDone, [propDone]);
  return (
    <TableRow key={emp}  sx={ propDone && {backgroundColor: '#efffef'}}>
      <TableCell >
       <Button onClick={handleAddPropsListItem} disabled={!canAdd}>+ ADD</Button>
      </TableCell>
      {headers.map(header => (
        <TableCell align="right" key={header}>
          <TextField value={formData[header]|| ''} name={header} onChange={handleChange}></TextField>
        </TableCell>
      ))}
    </TableRow>
  )
}

export default DataTable;
