import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { submitData } from "./fetchItems";

function extractPreviousLevel(string){
  // Remove the last bit of the URL
  for (let i = string.length-1; i >= 0; i--) {
    const char = string[i];
    if (char == "/") return '/'+string.slice(0, i);
  }
  return "/"
}

export default function DeleteButton({
  resource,
  setSubmitted = () => navigate(extractPreviousLevel(resource)),
  children,
  navigate
}) {
  navigate = useNavigate()
  async function handleDeleteItem(e) {
    await submitData(resource, null, "DELETE");
    // Wait for confirmation of deletion, then move to the previous page or refresh
    setSubmitted();
  }
  return (
    <Button onClick={handleDeleteItem} color="warning" variant="contained">
      {children}
    </Button>
  );
}
