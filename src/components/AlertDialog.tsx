import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { createTheme, ThemeProvider } from '@mui/material/styles';

interface AlertDialogProps {
  open: boolean;
  onClose: () => void;
}


const theme = createTheme({
  typography: {
    fontFamily: 'Comfortaa, Arial, sans-serif',
  },
});

export default function AlertDialog({ open, onClose }: AlertDialogProps) {
  return (
    <ThemeProvider theme={theme}>
    <Dialog
      open={open}
      onClose={onClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
      PaperProps={{
        style: {
          borderRadius: '16px',
        },
      }}
    >
      <DialogTitle id="alert-dialog-title">
        {"Пользователь не найден"}
      </DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          Пожалуйста, проверьте свои учетные данные и попробуйте снова
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Закрыть</Button>
      </DialogActions>
    </Dialog>
    </ThemeProvider>
  );
}
