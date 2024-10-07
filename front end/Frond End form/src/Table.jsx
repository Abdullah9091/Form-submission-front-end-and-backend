import * as React from 'react';
import { useState, useEffect, useCallback } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import axios from 'axios';
import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';
import Alert from '@mui/material/Alert';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import TextField from '@mui/material/TextField';
export default function CustomTable() {
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [open, setOpen] = useState(false);
  // eslint-disable-next-line no-unused-vars
  const [selectedUser, setSelectedUser] = useState(null);
  const [updatedUser, setUpdatedUser] = useState({});

  useEffect(() => {
    axios.get('http://localhost:4000/users/show')
      .then(response => {
        const users = response.data.map((user) => ({
          id: user._id, // Use the actual user id from the backend
          firstname: user.firstname,
          lastname: user.lastname,
          email: user.email,
          password: user.password,
        }));
        setRows(users);
        setLoading(false);
      })
      .catch(error => {
        setError('There was an error fetching the users!');
        setLoading(false);
      });
  }, []);

  const handleDelete = useCallback((id) => {
    axios.delete(`http://localhost:4000/users/delete/${id}`)
      .then(response => {
        if (response.status === 200) {
          setRows((prevRows) => prevRows.filter(row => row.id !== id));
        }
      })
      .catch(error => {
        console.error('There was an error deleting the user!', error);
      });
  }, []);

  const handleUpdate = useCallback((id) => {
    const user = rows.find(row => row.id === id);
    setSelectedUser(user);
    setUpdatedUser(user);
    setOpen(true);
  }, [rows]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setUpdatedUser({ ...updatedUser, [name]: value });
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSave = () => {
    axios.put(`http://localhost:4000/users/update/${updatedUser.id}`, updatedUser)
      .then(response => {
        if (response.status === 200) {
          setRows((prevRows) => prevRows.map(row => (row.id === updatedUser.id ? updatedUser : row)));
          setOpen(false);
        }
      })
      .catch(error => {
        console.error('There was an error updating the user!', error);
      });
  };

  const columns = [
    { field: 'id', headerName: 'ID', width: 90 },
    { field: 'firstname', headerName: 'First name', width: 150 },
    { field: 'lastname', headerName: 'Last name', width: 150 },
    { field: 'email', headerName: 'Email', width: 200 },
    { field: 'password', headerName: 'Password', width: 150 },
    {
      field: 'delete',
      headerName: 'Delete',
      width: 150,
      renderCell: (params) => (
        <Button
          variant="contained"
          color="secondary"
          onClick={() => handleDelete(params.row.id)}
        >
          Delete
        </Button>
      ),
    },
    {
      field: 'update',
      headerName: 'Update',
      width: 150,
      renderCell: (params) => (
        <Button
          variant="contained"
          color="primary"
          onClick={() => handleUpdate(params.row.id)}
        >
          Update
        </Button>
      ),
    },
  ];

  if (loading) {
    return <CircularProgress />;
  }

  if (error) {
    return <Alert severity="error">{error}</Alert>;
  }

  return (
    <div style={{ height: 500, width: '100%' }}>
      <DataGrid
        rows={rows}
        columns={columns}
        getRowId={(row) => row.id} // Specify custom row ID
        initialState={{
          pagination: {
            paginationModel: { page: 0, pageSize: 5 },
          },
        }}
        pageSizeOptions={[5, 10]}
        checkboxSelection
      />
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Update User</DialogTitle>
        <DialogContent>
          <TextField
            margin="dense"
            name="firstname"
            label="First Name"
            type="text"
            fullWidth
            value={updatedUser.firstname}
            onChange={handleChange}
          />
          <TextField
            margin="dense"
            name="lastname"
            label="Last Name"
            type="text"
            fullWidth
            value={updatedUser.lastname}
            onChange={handleChange}
          />
          <TextField
            margin="dense"
            name="email"
            label="Email"
            type="email"
            fullWidth
            value={updatedUser.email}
            onChange={handleChange}
          />
          <TextField
            margin="dense"
            name="password"
            label="Password"
            type="password"
            fullWidth
            value={updatedUser.password}
            onChange={handleChange}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleSave} color="primary">
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
