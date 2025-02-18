import { fetchItems } from "./fetchItems";
import DataTable from "./Table";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { List, ListItem, ListItemButton } from "@mui/material";
const tryurl = "127.0.0.0:5000";
const samplePropsList = [
  {
    name: "2x Sword",
    description: "...he swung his sword at the guard",
    sourcestatus: "waiting",
    action: "Buy from Amazon",
  },
  {
    name: "2x Sword",
    description: "...he swung his sword at the guard",
    sourcestatus: "waiting",
    action: "Buy from Amazon",
  },
];

export  function PropsListPage() {
  const propsListID = useParams()["props-list-id"];
  const [propsListItems, setPropsListItems] = useState(samplePropsList);
  useEffect(()=>fetchItems("/props-lists/"+propsListID, setPropsListItems), []);
  return (
    // https://www.geeksforgeeks.org/how-to-create-a-table-in-reactjs/
    <DataTable data={propsListItems} />
  );
}
