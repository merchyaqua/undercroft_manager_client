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
    propslistitemid: 2,
  },
  {
    name: "2x Sword",
    description: "...he swung his sword at the guard",
    sourcestatus: "waiting",
    action: "Buy from Amazon",
    propslistitemid: 22,
  },
];

export function PropsListPage() {
  const propsListID = useParams()["propsListID"];
  const [submitted, setSubmitted] = useState(false)


  const [propsListContent, setPropsListContent] = useState({productionTitle: "Me", propsListTitle: "hi", propsListItems: samplePropsList});
  useEffect(() => {
    // Load propslistitems on first load of page, then whenever submitted is changed, reloads again.
    console.log("fetched")
    fetchItems("props-list/" + propsListID, setPropsListContent);

  }, [submitted]);
  return (
    <>
      // https://www.geeksforgeeks.org/how-to-create-a-table-in-reactjs/
      {/* {propsListContent.propsListItems} */}
      <DataTable
        title={
          propsListContent.propsListTitle +
          " for " +
          propsListContent.productionTitle
        }
        data={propsListContent.propsListItems}
        setSubmitted={setSubmitted}
      />
    </>
  );
}
