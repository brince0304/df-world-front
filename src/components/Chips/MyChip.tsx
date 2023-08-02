import { Chip, ChipProps } from "@mui/material";
import { ForwardedRef, forwardRef } from "react";

const MyChip = (props: MyChipProps, ref: ForwardedRef<HTMLDivElement>) => {
    return (
        <Chip 
        ref={ref}
        sx={{
            '.MuiChip-root':{
                borderRadius:'0px',
            }
        }}
        {...props} />
    )
}

export default forwardRef(MyChip);

interface MyChipProps extends ChipProps {
}