import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { useState } from 'react';
import { deleteUser } from '../../services/axios/users-connections';
import { toast } from 'react-toastify';
import styled from 'styled-components';

export default function KeyDialog({ id, refetch }) {
  const [open, setOpen] = useState(false);
  const [key, setKey] = useState('');

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  async function deleteSelectedUser() {
    try {
      if (key !== process.env.REACT_APP_RESTAURANT_SECRET_KEY) throw new Error();
      await deleteUser(id);
      setOpen(false);
      toast.success('Usuário excluído com sucesso!', { theme: 'light' });
      refetch();
    } catch (error) {
      toast.error('Não foi possível deletar o usuário. Verifique se a chave fornecida está correta. ', {
        theme: 'light',
      });
      return;
    }
  }

  return (
    <div>
      <DeleteButton onClick={handleClickOpen}>Excluir</DeleteButton>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Deletar usuário</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Você tem certeza que deseja excluir esse usuário? Caso deseje, informe abaixo a chave secreta do
            restaurante.
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Chave secreta"
            type="password"
            fullWidth
            variant="standard"
            onChange={(e) => setKey(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancelar</Button>
          <Button onClick={deleteSelectedUser}>Deletar</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

const DeleteButton = styled.button`
  width: 120px;
  height: 35px;
  display: flex;
  align-items: center;
  justify-content: center;
  border: none;
  background-color: #5b82e4;
  border-radius: 8px;
  box-shadow: 0 2px 10px 3px rgba(0, 0, 0, 0.2);
  color: #ffffff;
  font-size: 16px;
  font-weight: 400;

  &:hover {
    cursor: pointer;
    filter: brightness(1.1);
  }
`;
