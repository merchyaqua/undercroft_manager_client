import { Typography,Box } from "@mui/material"
export default function Loader({error, loading, children}){
    // 
    return <Box>
    {error && <Typography variant="primary">{error}</Typography>}
          {loading && <Typography variant="h2">Loading...</Typography>}
          {!error && !loading && children}
    </Box>
}