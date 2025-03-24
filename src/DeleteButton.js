import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { submitData } from "./fetchItems";

export default function DeleteButton({
  resource,
  setSubmitted = () => navigate(-1),
  children,
  navigate
}) {
  navigate = useNavigate()
  async function handleDeleteItem(e) {
    navigate(-1)
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
