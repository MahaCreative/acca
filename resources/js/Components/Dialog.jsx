import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Slide,
} from "@mui/material";
import React from "react";

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="left" ref={ref} {...props} />;
});
export default function Dialogs({
    open,
    onClose,
    title,
    children,
    clickHandler,
}) {
    const handleClose = () => {
        onClose(false);
    };
    return (
        <div>
            <Dialog
                open={open}
                TransitionComponent={Transition}
                keepMounted
                onClose={handleClose}
                aria-describedby="alert-dialog-slide-description"
            >
                <DialogTitle>{title}</DialogTitle>
                <DialogContent>{children}</DialogContent>
            </Dialog>
        </div>
    );
}
