import { useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { 
  Card, 
  CardContent, 
  TablePagination,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Chip,
  CircularProgress,
  Alert,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Typography,
  Box
} from '@mui/material'
import { createFileRoute } from '@tanstack/react-router'
import { Invoice, InvoiceService } from '@/types/hosting.types'

const API_BASE_URL = 'https://api.ishosting.com'
const headers = {
  'X-Api-Token': `${import.meta.env.VITE_PUBLIC_IS_HOSTING_API_KEY}`,
  'Accept-Language': 'ru'
}

export const Route = createFileRoute('/invoices')({
  component: InvoicesRoute,
})

function InvoicesRoute() {
  const [page, setPage] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(10)
  const [selectedInvoice, setSelectedInvoice] = useState<Invoice | null>(null)

  const { data, isLoading, error } = useQuery({
    queryKey: ['invoices', page, rowsPerPage],
    queryFn: () => fetch(
      `${API_BASE_URL}/billing/invoices?limit=${rowsPerPage}&offset=${page * rowsPerPage}`, 
      { headers }
    ).then(res => res.json())
  })

  const handleChangePage = (_: unknown, newPage: number) => {
    setPage(newPage)
  }

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10))
    setPage(0)
  }

  // Invoice Modal component (same as in hosting.tsx)
  const InvoiceModal = () => (
    <Dialog 
      open={!!selectedInvoice} 
      onClose={() => setSelectedInvoice(null)}
      maxWidth="md"
      fullWidth
    >
      <DialogTitle>
        Invoice #{selectedInvoice?.id}
      </DialogTitle>
      <DialogContent>
        {selectedInvoice && (
          <Box className="space-y-4 py-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Typography variant="overline">Date</Typography>
                <Typography>
                  {new Date(selectedInvoice.invoiced_at * 1000).toLocaleDateString()}
                </Typography>
              </div>
              <div>
                <Typography variant="overline">Due Date</Typography>
                <Typography>
                  {new Date(selectedInvoice.due_to * 1000).toLocaleDateString()}
                </Typography>
              </div>
              <div>
                <Typography variant="overline">Status</Typography>
                <Chip 
                  label={selectedInvoice.status.name}
                  color={selectedInvoice.status.code === 'STATUS_PAID' ? 'success' : 'warning'}
                />
              </div>
              <div>
                <Typography variant="overline">Total Amount</Typography>
                <Typography variant="h6">{selectedInvoice.total}</Typography>
              </div>
            </div>

            <div className="mt-6">
              <Typography variant="h6" className="mb-3">Services</Typography>
              <Table size="small">
                <TableHead>
                  <TableRow>
                    <TableCell>Action</TableCell>
                    <TableCell>Type</TableCell>
                    <TableCell>Service ID</TableCell>
                    <TableCell>Plan</TableCell>
                    <TableCell>Period</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {selectedInvoice.services.map((service: InvoiceService, index: number) => (
                    <TableRow key={index}>
                      <TableCell>
                        <Chip 
                          label={service.action} 
                          size="small"
                          color={service.action === 'new' ? 'primary' : 'default'}
                        />
                      </TableCell>
                      <TableCell>{service.type}</TableCell>
                      <TableCell>{service.service.id}</TableCell>
                      <TableCell>{service.service.plan.name}</TableCell>
                      <TableCell>
                        {new Date(service.period.start_at * 1000).toLocaleDateString()} - 
                        {new Date(service.period.finish_at * 1000).toLocaleDateString()}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </Box>
        )}
      </DialogContent>
      <DialogActions>
        <Button onClick={() => setSelectedInvoice(null)}>Close</Button>
      </DialogActions>
    </Dialog>
  )

  if (error) {
    return <Alert severity="error">Failed to load invoices</Alert>
  }

  return (
    <div className='flex flex-col gap-y-6 p-6'>
      <h1 className='text-2xl font-bold'>Invoices</h1>
      
      <Card>
        <CardContent>
          {isLoading ? (
            <div className="flex justify-center p-4">
              <CircularProgress />
            </div>
          ) : (
            <>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Invoice #</TableCell>
                    <TableCell>Date</TableCell>
                    <TableCell>Amount</TableCell>
                    <TableCell>Status</TableCell>
                    <TableCell>Actions</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {data?.map((invoice: Invoice) => (
                    <TableRow key={invoice.id}>
                      <TableCell>#{invoice.id}</TableCell>
                      <TableCell>{new Date(invoice.invoiced_at * 1000).toLocaleDateString()}</TableCell>
                      <TableCell>{invoice.total}</TableCell>
                      <TableCell>
                        <Chip 
                          label={invoice.status.name}
                          color={invoice.status.code === 'STATUS_PAID' ? 'success' : 'warning'}
                          size="small"
                        />
                      </TableCell>
                      <TableCell>
                        <Button 
                          size="small" 
                          variant="outlined"
                          onClick={() => setSelectedInvoice(invoice)}
                        >
                          View
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
              <TablePagination
                component="div"
                count={-1}
                page={page}
                onPageChange={handleChangePage}
                rowsPerPage={rowsPerPage}
                onRowsPerPageChange={handleChangeRowsPerPage}
                rowsPerPageOptions={[5, 10, 25, 50]}
              />
            </>
          )}
        </CardContent>
      </Card>

      <InvoiceModal />
    </div>
  )
} 