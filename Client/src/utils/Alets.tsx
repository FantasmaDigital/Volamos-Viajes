import { Alert } from "@mui/material";
import CheckIcon from '@mui/icons-material/Check';
import WarningIcon from '@mui/icons-material/Warning';
import ErrorIcon from '@mui/icons-material/Error';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';


export const SUCCESS_ALERT = (text:string) => {
    return (
        <Alert icon={<CheckIcon fontSize="inherit" />} severity="success">{text}</Alert>
    )
}

export const WARNING_ALERT = (text:string) => {
    return (
        <Alert icon={<WarningIcon fontSize="inherit" />} severity="warning">{text}</Alert>
    )
}

export const ERROR_ALERT = (text:string) => {
    return (
        <Alert icon={<ErrorIcon fontSize="inherit" />} severity="error">{text}</Alert>
    )
}

export const HELP_ALERT = (text:string) => {
    return (
        <Alert icon={<HelpOutlineIcon fontSize="inherit" />} severity="info">{text}</Alert>
    )
}