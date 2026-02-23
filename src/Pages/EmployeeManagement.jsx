import React, { useContext, useState, useEffect, useCallback } from 'react'
import { Link } from 'react-router-dom'
import AppBar from '@mui/material/AppBar'
import Toolbar from '@mui/material/Toolbar'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import Paper from '@mui/material/Paper'
import Button from '@mui/material/Button'
import IconButton from '@mui/material/IconButton'
import Dialog from '@mui/material/Dialog'
import DialogTitle from '@mui/material/DialogTitle'
import DialogContent from '@mui/material/DialogContent'
import DialogActions from '@mui/material/DialogActions'
import TextField from '@mui/material/TextField'
import Snackbar from '@mui/material/Snackbar'
import Alert from '@mui/material/Alert'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import EditIcon from '@mui/icons-material/Edit'
import DeleteIcon from '@mui/icons-material/Delete'
import AddIcon from '@mui/icons-material/Add'
import Footer from '../components/footer'
import Header from '../components/header'
import Section from '../components/section'
import { HeaderContext } from '../context/HeaderContext'
import * as employeeApi from '../api/employees'
import '../App.css'

const emptyEmployee = {
  first_name: '',
  last_name: '',
  address: '',
  city: '',
  state: '',
  zip: '',
  email: '',
  salary: '',
}

function EmployeeManagement() {
  const year = new Date().getFullYear()
  const { headerText } = useContext(HeaderContext)
  const [employees, setEmployees] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' })
  const [dialogOpen, setDialogOpen] = useState(false)
  const [deleteConfirm, setDeleteConfirm] = useState(null)
  const [formMode, setFormMode] = useState('add') // 'add' | 'edit'
  const [formData, setFormData] = useState(emptyEmployee)
  const [formId, setFormId] = useState(null)

  const loadEmployees = useCallback(async () => {
    setLoading(true)
    setError(null)
    try {
      const data = await employeeApi.getEmployees()
      setEmployees(data)
    } catch (e) {
      setError(e.message || 'Failed to load employees')
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    loadEmployees()
  }, [loadEmployees])

  const showSnackbar = (message, severity = 'success') => {
    setSnackbar({ open: true, message, severity })
  }

  const handleOpenAdd = () => {
    setFormMode('add')
    setFormData(emptyEmployee)
    setFormId(null)
    setDialogOpen(true)
  }

  const handleOpenEdit = (row) => {
    setFormMode('edit')
    setFormId(row.id)
    setFormData({
      first_name: row.first_name || '',
      last_name: row.last_name || '',
      address: row.address || '',
      city: row.city || '',
      state: row.state || '',
      zip: row.zip || '',
      email: row.email || '',
      salary: row.salary != null ? String(row.salary) : '',
    })
    setDialogOpen(true)
  }

  const handleCloseDialog = () => {
    setDialogOpen(false)
    setFormData(emptyEmployee)
    setFormId(null)
  }

  const handleSave = async () => {
    if (!formData.first_name?.trim() || !formData.last_name?.trim()) {
      showSnackbar('First name and last name are required.', 'error')
      return
    }
    try {
      const payload = {
        first_name: formData.first_name.trim(),
        last_name: formData.last_name.trim(),
        address: formData.address.trim() || null,
        city: formData.city.trim() || null,
        state: formData.state.trim() || null,
        zip: formData.zip.trim() || null,
        email: formData.email.trim() || null,
        salary: formData.salary ? Number(formData.salary) : null,
      }
      if (formMode === 'add') {
        await employeeApi.createEmployee(payload)
        showSnackbar('Employee added successfully.')
      } else {
        await employeeApi.updateEmployee(formId, payload)
        showSnackbar('Employee updated successfully.')
      }
      handleCloseDialog()
      loadEmployees()
    } catch (e) {
      showSnackbar(e.message || 'Something went wrong.', 'error')
    }
  }

  const handleDeleteClick = (row) => setDeleteConfirm(row)
  const handleDeleteCancel = () => setDeleteConfirm(null)
  const handleDeleteConfirm = async () => {
    if (!deleteConfirm) return
    try {
      await employeeApi.deleteEmployee(deleteConfirm.id)
      showSnackbar('Employee deleted.')
      setDeleteConfirm(null)
      loadEmployees()
    } catch (e) {
      showSnackbar(e.message || 'Failed to delete.', 'error')
    }
  }

  const formatSalary = (val) => {
    if (val == null || val === '') return '—'
    const n = Number(val)
    if (Number.isNaN(n)) return val
    return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(n)
  }

  return (
    <>
      <Header>
        <AppBar position="static" color="default">
          <Toolbar>
            <h1>{`Welcome ${headerText} to Codecraft Intranet`}</h1>
            <nav>
              <ul>
                <li><Link to="/">Home</Link></li>
                <li><Link to="/employee-management">Employee Management</Link></li>
              </ul>
            </nav>
          </Toolbar>
        </AppBar>
      </Header>

      <Section>
        <Box sx={{ mb: 3, display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 2 }}>
          <Typography variant="h5" component="h2" sx={{ fontWeight: 600, color: '#000' }}>
            Employee List
          </Typography>
          <Button variant="contained" startIcon={<AddIcon />} onClick={handleOpenAdd} sx={{ textTransform: 'none' }}>
            Add Employee
          </Button>
        </Box>

        {error && (
          <Alert severity="error" onClose={() => setError(null)} sx={{ mb: 2 }}>
            {error}
          </Alert>
        )}

        {loading ? (
          <Typography color="text.secondary">Loading…</Typography>
        ) : (
          <TableContainer component={Paper} elevation={0} sx={{ border: '1px solid', borderColor: 'divider', borderRadius: 2 }}>
            <Table size="small" sx={{ minWidth: 720 }}>
              <TableHead>
                <TableRow sx={{ bgcolor: '#2d2d33' }}>
                  <TableCell sx={{ fontWeight: 600, color: '#fff' }}>First Name</TableCell>
                  <TableCell sx={{ fontWeight: 600, color: '#fff' }}>Last Name</TableCell>
                  <TableCell sx={{ fontWeight: 600, color: '#fff' }}>Address</TableCell>
                  <TableCell sx={{ fontWeight: 600, color: '#fff' }}>City</TableCell>
                  <TableCell sx={{ fontWeight: 600, color: '#fff' }}>State</TableCell>
                  <TableCell sx={{ fontWeight: 600, color: '#fff' }}>Zip</TableCell>
                  <TableCell sx={{ fontWeight: 600, color: '#fff' }}>Email</TableCell>
                  <TableCell sx={{ fontWeight: 600, color: '#fff' }}>Salary</TableCell>
                  <TableCell align="right" sx={{ fontWeight: 600, color: '#fff' }}>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {employees.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={9} align="center" sx={{ py: 4 }}>No employees yet. Add one to get started.</TableCell>
                  </TableRow>
                ) : (
                  employees.map((row) => (
                    <TableRow key={row.id} hover>
                      <TableCell>{row.first_name}</TableCell>
                      <TableCell>{row.last_name}</TableCell>
                      <TableCell>{row.address || '—'}</TableCell>
                      <TableCell>{row.city || '—'}</TableCell>
                      <TableCell>{row.state || '—'}</TableCell>
                      <TableCell>{row.zip || '—'}</TableCell>
                      <TableCell>{row.email || '—'}</TableCell>
                      <TableCell>{formatSalary(row.salary)}</TableCell>
                      <TableCell align="right">
                        <IconButton size="small" onClick={() => handleOpenEdit(row)} aria-label="Edit">
                          <EditIcon fontSize="small" />
                        </IconButton>
                        <IconButton size="small" color="error" onClick={() => handleDeleteClick(row)} aria-label="Delete">
                          <DeleteIcon fontSize="small" />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </TableContainer>
        )}

        {/* Add/Edit Dialog */}
        <Dialog open={dialogOpen} onClose={handleCloseDialog} maxWidth="sm" fullWidth>
          <DialogTitle>{formMode === 'add' ? 'Add Employee' : 'Edit Employee'}</DialogTitle>
          <DialogContent>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, pt: 1 }}>
              <TextField
                label="First Name"
                required
                value={formData.first_name}
                onChange={(e) => setFormData((p) => ({ ...p, first_name: e.target.value }))}
                fullWidth
                size="small"
              />
              <TextField
                label="Last Name"
                required
                value={formData.last_name}
                onChange={(e) => setFormData((p) => ({ ...p, last_name: e.target.value }))}
                fullWidth
                size="small"
              />
              <TextField
                label="Address"
                value={formData.address}
                onChange={(e) => setFormData((p) => ({ ...p, address: e.target.value }))}
                fullWidth
                size="small"
              />
              <Box sx={{ display: 'flex', gap: 2 }}>
                <TextField
                  label="City"
                  value={formData.city}
                  onChange={(e) => setFormData((p) => ({ ...p, city: e.target.value }))}
                  fullWidth
                  size="small"
                />
                <TextField
                  label="State"
                  value={formData.state}
                  onChange={(e) => setFormData((p) => ({ ...p, state: e.target.value }))}
                  fullWidth
                  size="small"
                />
                <TextField
                  label="Zip"
                  value={formData.zip}
                  onChange={(e) => setFormData((p) => ({ ...p, zip: e.target.value }))}
                  fullWidth
                  size="small"
                />
              </Box>
              <TextField
                label="Email"
                type="email"
                value={formData.email}
                onChange={(e) => setFormData((p) => ({ ...p, email: e.target.value }))}
                fullWidth
                size="small"
              />
              <TextField
                label="Salary"
                type="number"
                value={formData.salary}
                onChange={(e) => setFormData((p) => ({ ...p, salary: e.target.value }))}
                fullWidth
                size="small"
                inputProps={{ min: 0, step: 0.01 }}
              />
            </Box>
          </DialogContent>
          <DialogActions sx={{ px: 3, pb: 2 }}>
            <Button onClick={handleCloseDialog}>Cancel</Button>
            <Button variant="contained" onClick={handleSave}>{formMode === 'add' ? 'Add' : 'Save'}</Button>
          </DialogActions>
        </Dialog>

        {/* Delete confirmation */}
        <Dialog open={!!deleteConfirm} onClose={handleDeleteCancel}>
          <DialogTitle>Delete Employee</DialogTitle>
          <DialogContent>
            {deleteConfirm && (
              <Typography>
                Delete {deleteConfirm.first_name} {deleteConfirm.last_name}? This cannot be undone.
              </Typography>
            )}
          </DialogContent>
          <DialogActions>
            <Button onClick={handleDeleteCancel}>Cancel</Button>
            <Button variant="contained" color="error" onClick={handleDeleteConfirm}>Delete</Button>
          </DialogActions>
        </Dialog>
      </Section>

      <Footer foot={`© ${year} CodeCraft Labs. All rights reserved.`} />

      <Snackbar open={snackbar.open} autoHideDuration={5000} onClose={() => setSnackbar((p) => ({ ...p, open: false }))} anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}>
        <Alert severity={snackbar.severity} onClose={() => setSnackbar((p) => ({ ...p, open: false }))}>
          {snackbar.message}
        </Alert>
      </Snackbar>
    </>
  )
}

export default EmployeeManagement
