import Box from "@mui/material/Box";
import {Divider, Paper, Skeleton} from "@mui/material";

export const BoardDetailSkeleton = () => {
    return (
        <Paper sx={{padding:"20px",gap:"10px",display:"flex",flexDirection:"column"}}>
            <Box sx={{flexDirection:"row", display:"flex", alignItems:"center", justifyContent:"flex-start",gap:"10px"}}>
                <Skeleton variant="rounded" width={40} height={25} animation={"wave"}/>
                <Skeleton variant="rounded" width={40} height={25} animation={"wave"}/>
                <Skeleton variant="rounded" width={40} height={25} animation={"wave"}/>
            </Box>
            <Box >
                <Skeleton variant="rectangular" width={210} height={35} animation={"wave"}/>
            </Box>
            <Box sx={{flexDirection:"row", display:"flex", alignItems:"center", justifyContent:"flex-start",gap:"10px"}}>
                <Skeleton variant="circular" width={35} height={35} animation={"wave"}/>
                <Skeleton variant="text" width={150} height={50} animation={"wave"}/>
            </Box>
            <Divider sx={{margin:"10px 0px"}}/>
            <Box>
                <Skeleton variant="text" width={210} height={300} animation={"wave"}/>
            </Box>
        </Paper>


    );
};