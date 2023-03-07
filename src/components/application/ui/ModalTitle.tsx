import Typography from "@mui/material/Typography";
import * as React from "react";

export function ModalTitle(props:{title:string}) {
    return (
        <div>
            <Typography variant="h6" component="div" style={{
                display: 'flex',
                justifyContent: 'center',
            }} >
                {props.title}
            </Typography>
        </div>
    );
}

