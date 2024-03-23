import { Alert, IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

interface CustomAlertProps {
  severity: "error" | "warning" | "info" | "success";
  title: string;
  handleClose?: () => void;
}

const CustomAlert: React.FC<CustomAlertProps> = ({
  severity,
  title,
  handleClose,
}) => {
  return (
    <Alert
      severity={severity}
      action={
        <IconButton
          aria-label="close"
          color="inherit"
          size="small"
          onClick={handleClose}
        >
          <CloseIcon fontSize="inherit" />
        </IconButton>
      }
    >
      {title}
    </Alert>
  );
};

export default CustomAlert;
