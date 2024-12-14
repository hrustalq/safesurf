import { useState } from 'react'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { 
  Card, 
  CardContent, 
  CardHeader,
  Button,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Chip,
  CircularProgress,
  Alert,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Typography,
  Box,
  Menu,
  MenuItem,
  IconButton,
  Tooltip,
} from '@mui/material'
import { createFileRoute, useNavigate } from '@tanstack/react-router'
import { Invoice, Profile, SSHKey, VPSServer, VPSDetails, PlanAdditionItem, NetworkProtocol, SSHUser } from '@/types/hosting.types'
import MoreVertIcon from '@mui/icons-material/MoreVert'
import InfoIcon from '@mui/icons-material/Info'

// Replace API client initialization with base URL and headers
const API_BASE_URL = 'https://api.ishosting.com'
const headers = {
  'X-Api-Token': `${import.meta.env.VITE_PUBLIC_IS_HOSTING_API_KEY}`,
  'Accept-Language': 'en'
}

export const Route = createFileRoute('/hosting')({
  component: RouteComponent,
})

function RouteComponent() {
  const queryClient = useQueryClient()
  const [selectedInvoice, setSelectedInvoice] = useState<Invoice | null>(null)
  const [isAddKeyModalOpen, setIsAddKeyModalOpen] = useState(false)
  const [newKey, setNewKey] = useState({
    title: '',
    public: ''
  })
  const navigate = useNavigate()
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const [selectedVpsId, setSelectedVpsId] = useState<string | null>(null)

  // Fetch VPS list
  const { data: vpsList, isLoading: vpsLoading, error: vpsError } = useQuery({
    queryKey: ['vps-list'],
    queryFn: () => fetch(`${API_BASE_URL}/vps/list?limit=10&offset=0`, { headers })
      .then(res => res.json())
  })

  // Fetch SSH keys
  const { data: sshKeys, isLoading: sshLoading } = useQuery({
    queryKey: ['ssh-keys'],
    queryFn: () => fetch(`${API_BASE_URL}/settings/ssh`, { headers })
      .then(res => res.json())
  })

  // Fetch billing info
  const { data: invoices, isLoading: invoicesLoading } = useQuery({
    queryKey: ['recent-invoices'],
    queryFn: () => fetch(`${API_BASE_URL}/billing/invoices?limit=10&offset=0`, { headers })
      .then(res => res.json())
  })

  // Add SSH Key mutation
  const addKeyMutation = useMutation({
    mutationFn: (keyData: { title: string, public: string }) => 
      fetch(`${API_BASE_URL}/settings/ssh`, {
        method: 'POST',
        headers: {
          ...headers,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(keyData)
      }).then(res => res.json()),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['ssh-keys'] })
      setIsAddKeyModalOpen(false)
      setNewKey({ title: '', public: '' })
    }
  })

  const handleAddKey = () => {
    addKeyMutation.mutate(newKey)
  }

  // Add VPS status mutation
  const vpsStatusMutation = useMutation({
    mutationFn: ({ id, action }: { id: string, action: 'start' | 'stop' | 'reboot' | 'force' | 'cancel' }) =>
      fetch(`${API_BASE_URL}/vps/${id}/status/${action}`, {
        method: 'PATCH',
        headers
      }).then(res => res.json()),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['vps-list'] })
      setAnchorEl(null)
      setSelectedVpsId(null)
    }
  })

  const handleActionClick = (event: React.MouseEvent<HTMLButtonElement>, vpsId: string) => {
    setAnchorEl(event.currentTarget)
    setSelectedVpsId(vpsId)
  }

  const handleActionClose = () => {
    setAnchorEl(null)
    setSelectedVpsId(null)
  }

  const handleVpsAction = (action: 'start' | 'stop' | 'reboot' | 'force' | 'cancel') => {
    if (selectedVpsId) {
      vpsStatusMutation.mutate({ id: selectedVpsId, action })
    }
  }

  // Invoice Modal
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
                  {selectedInvoice.services.map((service, index) => (
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

  // Add SSH Key Modal
  const AddKeyModal = () => (
    <Dialog 
      open={isAddKeyModalOpen} 
      onClose={() => setIsAddKeyModalOpen(false)}
      maxWidth="sm"
      fullWidth
    >
      <DialogTitle>Add New SSH Key</DialogTitle>
      <DialogContent>
        <Box className="space-y-4 py-4">
          <TextField
            label="Key Title"
            fullWidth
            value={newKey.title}
            onChange={(e) => setNewKey(prev => ({ ...prev, title: e.target.value }))}
            placeholder="e.g. My Laptop"
          />
          <TextField
            label="Public Key"
            fullWidth
            multiline
            rows={4}
            value={newKey.public}
            onChange={(e) => setNewKey(prev => ({ ...prev, public: e.target.value }))}
            placeholder="ssh-rsa AAAAB3NzaC1..."
          />
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={() => setIsAddKeyModalOpen(false)}>Cancel</Button>
        <Button 
          onClick={handleAddKey}
          variant="contained"
          disabled={!newKey.title || !newKey.public || addKeyMutation.isPending}
        >
          {addKeyMutation.isPending ? 'Adding...' : 'Add Key'}
        </Button>
      </DialogActions>
    </Dialog>
  )

  // Add profile query after existing queries
  const { data: profile, isLoading: profileLoading } = useQuery<Profile>({
    queryKey: ['profile'],
    queryFn: () => fetch(`${API_BASE_URL}/profile`, { headers })
      .then(res => res.json())
  })

  // Add ProfileSection component before return statement
  const ProfileSection = () => (
    <Card>
      <CardHeader 
        title="Profile" 
        action={
          <div className="flex gap-2">
            <Chip
              label={`Balance: ${profile?.balance}`}
              color="primary"
              variant="outlined"
            />
            <Button variant="outlined" color="primary">
              Edit Profile
            </Button>
          </div>
        }
      />
      <CardContent>
        {profileLoading ? (
          <div className="flex justify-center p-4">
            <CircularProgress />
          </div>
        ) : profile ? (
          <div className="grid md:grid-cols-3 gap-6">
            {/* Personal Information */}
            <div>
              <Typography variant="h6" className="mb-4">Personal Information</Typography>
              <div className="space-y-2">
                <div>
                  <Typography variant="overline" className="text-gray-600">
                    Name
                  </Typography>
                  <Typography>
                    {profile.firstname} {profile.lastname}
                  </Typography>
                </div>
                <div>
                  <Typography variant="overline" className="text-gray-600">
                    Contact
                  </Typography>
                  <Typography>{profile.email}</Typography>
                  <Typography>{profile.phone}</Typography>
                </div>
                {profile.address && (
                  <div>
                    <Typography variant="overline" className="text-gray-600">
                      Address
                    </Typography>
                    <Typography>{profile.address.line_1}</Typography>
                    {profile.address.line_2 && (
                      <Typography>{profile.address.line_2}</Typography>
                    )}
                    <Typography>
                      {profile.address.city}, {profile.address.state}, {profile.address.country} {profile.address.zip}
                    </Typography>
                  </div>
                )}
              </div>
            </div>

            {/* Account Status & Security */}
            <div>
              <Typography variant="h6" className="mb-4">Account Status</Typography>
              <div className="space-y-4">
                <div>
                  <Typography variant="overline" className="text-gray-600">
                    Status & Security
                  </Typography>
                  <div className="flex flex-wrap gap-2 mt-1">
                    <Chip
                      label={profile.status}
                      color={profile.status === 'verified' ? 'success' : 'warning'}
                      size="small"
                    />
                    <Chip
                      label={profile['2fa_enabled'] ? '2FA Enabled' : '2FA Disabled'}
                      color={profile['2fa_enabled'] ? 'success' : 'error'}
                      size="small"
                    />
                    {profile.violations > 0 && (
                      <Chip
                        label={`${profile.violations} Violations`}
                        color="error"
                        size="small"
                      />
                    )}
                  </div>
                </div>

                <div>
                  <Typography variant="overline" className="text-gray-600">
                    Confirmations
                  </Typography>
                  <div className="flex flex-wrap gap-2 mt-1">
                    <Chip
                      label="Email"
                      color={profile.confirmations.email ? 'success' : 'error'}
                      size="small"
                    />
                    <Chip
                      label="KYC"
                      color={profile.confirmations.kyc ? 'success' : 'error'}
                      size="small"
                    />
                  </div>
                </div>

                <div>
                  <Typography variant="overline" className="text-gray-600">
                    Active Services
                  </Typography>
                  <div className="grid grid-cols-2 gap-2 mt-1">
                    {Object.entries(profile.services.active).map(([service, count]) => (
                      <div key={service} className="flex items-center gap-2">
                        <Typography variant="body2" className="capitalize">
                          {service}:
                        </Typography>
                        <Chip label={count} size="small" />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Restrictions & Permissions */}
            <div>
              <Typography variant="h6" className="mb-4">Account Restrictions</Typography>
              <div className="space-y-4">
                <div>
                  <Typography variant="overline" className="text-gray-600">
                    Restrictions
                  </Typography>
                  <div className="flex flex-wrap gap-2 mt-1">
                    {Object.entries(profile.restrictions).map(([key, restricted]) => (
                      <Chip
                        key={key}
                        label={key.charAt(0).toUpperCase() + key.slice(1)}
                        color={restricted ? 'error' : 'success'}
                        variant={restricted ? 'filled' : 'outlined'}
                        size="small"
                      />
                    ))}
                  </div>
                </div>

                <div>
                  <Typography variant="overline" className="text-gray-600">
                    Permissions
                  </Typography>
                  <div className="space-y-2">
                    {Object.entries(profile.permissions).map(([category, perms]) => (
                      <div key={category}>
                        <Typography variant="body2" className="capitalize">
                          {category}:
                        </Typography>
                        <div className="flex flex-wrap gap-1 mt-1">
                          {Object.entries(perms).map(([perm, enabled]) => (
                            <Chip
                              key={perm}
                              label={perm}
                              color={enabled ? 'success' : 'default'}
                              variant={enabled ? 'filled' : 'outlined'}
                              size="small"
                            />
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : null}
      </CardContent>
    </Card>
  )

  // VPS Action Menu component
  const VpsActionMenu = () => {
    const selectedVpsData = vpsList?.find((vps: VPSServer) => vps.id === selectedVpsId)
    const isRunning = selectedVpsData?.status.code === 'STATUS_CODE_RUNNING'

    return (
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleActionClose}
      >
        <MenuItem 
          onClick={() => handleVpsAction('start')}
          disabled={vpsStatusMutation.isPending || isRunning}
        >
          Start
        </MenuItem>
        <MenuItem 
          onClick={() => handleVpsAction('stop')}
          disabled={vpsStatusMutation.isPending || !isRunning}
        >
          Stop
        </MenuItem>
        <MenuItem 
          onClick={() => handleVpsAction('reboot')}
          disabled={vpsStatusMutation.isPending || !isRunning}
        >
          Reboot
        </MenuItem>
        <MenuItem 
          onClick={() => handleVpsAction('force')}
          disabled={vpsStatusMutation.isPending || !isRunning}
        >
          Force Stop
        </MenuItem>
        <MenuItem 
          onClick={() => handleVpsAction('cancel')}
          disabled={vpsStatusMutation.isPending}
          sx={{ color: 'error.main' }}
        >
          Cancel
        </MenuItem>
      </Menu>
    )
  }

  // Add VPS details query
  const { data: vpsDetails, isLoading: vpsDetailsLoading } = useQuery<VPSDetails>({
    queryKey: ['vps-details', selectedVpsId],
    queryFn: () =>
      fetch(`${API_BASE_URL}/vps/${selectedVpsId}`, { headers })
        .then(res => res.json()),
    enabled: !!selectedVpsId
  })

  // VPS Details Modal component
  const VpsDetailsModal = () => {
    // Add error handling for the details query
    if (vpsDetailsLoading) {
      return (
        <Dialog 
          open={!!selectedVpsId} 
          onClose={() => setSelectedVpsId(null)}
          maxWidth="lg"
          fullWidth
        >
          <DialogContent>
            <div className="flex justify-center p-8">
              <CircularProgress />
            </div>
          </DialogContent>
        </Dialog>
      )
    }

    if (!vpsDetails && !vpsDetailsLoading) {
      return (
        <Dialog 
          open={!!selectedVpsId} 
          onClose={() => setSelectedVpsId(null)}
          maxWidth="lg"
          fullWidth
        >
          <DialogContent>
            <Alert severity="error" className="m-4">
              Failed to load VPS details
            </Alert>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setSelectedVpsId(null)}>Close</Button>
          </DialogActions>
        </Dialog>
      )
    }

    return (
      <Dialog 
        open={!!selectedVpsId} 
        onClose={() => setSelectedVpsId(null)}
        maxWidth="lg"
        fullWidth
      >
        <DialogTitle className="flex justify-between items-center">
          <span>{vpsDetails?.name}</span>
          <Chip 
            label={vpsDetails?.status.name}
            color={vpsDetails?.status.code === 'STATUS_CODE_RUNNING' ? 'success' : 'warning'}
          />
        </DialogTitle>
        <DialogContent>
          <div className="space-y-6 py-4">
            {/* Basic Info */}
            <section>
              <Typography variant="h6" gutterBottom>Basic Information</Typography>
              <div className="grid md:grid-cols-3 gap-4">
                <div>
                  <Typography variant="overline">Location</Typography>
                  <Typography>
                    {vpsDetails!.location.name}
                    {vpsDetails!.location.variant && ` - ${vpsDetails!.location.variant.name}`}
                  </Typography>
                </div>
                <div>
                  <Typography variant="overline">Created</Typography>
                  <Typography>
                    {new Date(vpsDetails!.created_at * 1000).toLocaleDateString()}
                  </Typography>
                </div>
                <div>
                  <Typography variant="overline">Tags</Typography>
                  <div className="flex gap-1 flex-wrap">
                    {vpsDetails?.tags.map((tag: string) => (
                      <Chip key={tag} label={tag} size="small" />
                    ))}
                  </div>
                </div>
              </div>
            </section>

            {/* Plan & Billing */}
            <section>
              <Typography variant="h6" gutterBottom>Plan & Billing</Typography>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <Typography variant="overline">Plan Details</Typography>
                  <Typography>{vpsDetails!.plan.name} - {vpsDetails!.plan.price}</Typography>
                  <Typography variant="body2" color="textSecondary">
                    Billing period: {vpsDetails!.plan.period.name}
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                    Next charge: {new Date(vpsDetails!.plan.next_charge * 1000).toLocaleDateString()}
                  </Typography>
                </div>
                {vpsDetails!.plan.additions && (
                  <div>
                    <Typography variant="overline">Additional Services</Typography>
                    <Typography variant="body2" color="primary">
                      Total additions: {vpsDetails!.plan.additions.total}
                    </Typography>
                    {vpsDetails!.plan.additions.items.map((item: PlanAdditionItem, index: number) => (
                      <div key={index} className="mt-1">
                        <Typography variant="body2">
                          {item.name} - {item.price}
                        </Typography>
                        <Typography variant="caption" color="textSecondary">
                          {item.category.name}
                        </Typography>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </section>

            {/* Configuration */}
            <section>
              <Typography variant="h6" gutterBottom>Hardware Configuration</Typography>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <div>
                    <Typography variant="overline">CPU</Typography>
                    <Typography>{vpsDetails!.platform.config.cpu.name}</Typography>
                  </div>
                  <div>
                    <Typography variant="overline">RAM</Typography>
                    <Typography>{vpsDetails!.platform.config.ram.name}</Typography>
                  </div>
                  <div>
                    <Typography variant="overline">Storage</Typography>
                    <Typography>{vpsDetails!.platform.config.drive.name}</Typography>
                  </div>
                </div>
                <div className="space-y-2">
                  <div>
                    <Typography variant="overline">Operating System</Typography>
                    <Typography>
                      {vpsDetails!.platform.config.os.name}
                      {vpsDetails!.platform.config.os.variant?.lang && (
                        <Chip 
                          size="small" 
                          label={vpsDetails!.platform.config.os.variant.lang.name}
                          className="ml-2"
                        />
                      )}
                    </Typography>
                  </div>
                </div>
              </div>
            </section>

            {/* Network */}
            <section>
              <Typography variant="h6" gutterBottom>Network Configuration</Typography>
              <div className="space-y-4">
                <div>
                  <Typography variant="overline">Network Details</Typography>
                  <Typography>Port Speed: {vpsDetails!.network.port}</Typography>
                  <Typography>Bandwidth: {vpsDetails!.network.bandwidth}</Typography>
                </div>
                
                <div>
                  <Typography variant="overline">IP Addresses</Typography>
                  <Table size="small">
                    <TableHead>
                      <TableRow>
                        <TableCell>Type</TableCell>
                        <TableCell>Address</TableCell>
                        <TableCell>Gateway</TableCell>
                        <TableCell>RDNS</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {vpsDetails!.network.protocols.ipv4.map((ip: NetworkProtocol, index: number) => (
                        <TableRow key={`ipv4-${index}`}>
                          <TableCell>IPv4 {ip.is_main && '(Main)'}</TableCell>
                          <TableCell>{ip.address}</TableCell>
                          <TableCell>{ip.gateway}</TableCell>
                          <TableCell>{ip.rdns}</TableCell>
                        </TableRow>
                      ))}
                      {vpsDetails!.network.protocols.ipv6.map((ip: NetworkProtocol, index: number) => (
                        <TableRow key={`ipv6-${index}`}>
                          <TableCell>IPv6</TableCell>
                          <TableCell>{ip.address}</TableCell>
                          <TableCell>{ip.gateway}</TableCell>
                          <TableCell>{ip.rdns}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </div>
            </section>

            {/* Access Information */}
            <section>
              <Typography variant="h6" gutterBottom>Access Information</Typography>
              <div className="grid md:grid-cols-2 gap-4">
                {vpsDetails?.access.vnc && (
                  <div>
                    <Typography variant="overline">VNC Access</Typography>
                    <Typography>Host: {vpsDetails.access.vnc.host}</Typography>
                    <Typography>Password: {vpsDetails.access.vnc.password}</Typography>
                  </div>
                )}
                <div>
                  <Typography variant="overline">SSH Access</Typography>
                  {vpsDetails?.access.ssh.users.map((user: SSHUser, index: number) => (
                    <div key={index}>
                      <Typography>Username: {user.username}</Typography>
                      <Typography>Password: {user.password}</Typography>
                    </div>
                  ))}
                </div>
              </div>
            </section>
          </div>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setSelectedVpsId(null)}>Close</Button>
        </DialogActions>
      </Dialog>
    )
  }

  if (vpsError) {
    return <Alert severity="error">Failed to load hosting data</Alert>
  }

  return (
    <div className='flex flex-col gap-y-6 p-6'>
      <h1 className='text-2xl font-bold'>Hosting Dashboard</h1>
      
      {/* Add ProfileSection at the top */}
      <ProfileSection />

      {/* VPS Servers Section */}
      <Card>
        <CardHeader 
          title="VPS Servers" 
          action={
            <Button variant="contained" color="primary">
              Add New VPS
            </Button>
          }
        />
        <CardContent>
          {vpsLoading ? (
            <div className="flex justify-center p-4">
              <CircularProgress />
            </div>
          ) : (
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Name</TableCell>
                  <TableCell>Tags</TableCell>
                  <TableCell>Location</TableCell>
                  <TableCell>Plan</TableCell>
                  <TableCell>Status</TableCell>
                  <TableCell>Metrics</TableCell>
                  <TableCell>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {vpsList?.map((vps: VPSServer) => (
                  <TableRow key={vps.id}>
                    <TableCell>{vps.name}</TableCell>
                    <TableCell>
                      <div className="flex gap-1 flex-wrap">
                        {vps.tags.map(tag => (
                          <Chip
                            key={tag}
                            label={tag}
                            size="small"
                            variant="outlined"
                          />
                        ))}
                      </div>
                    </TableCell>
                    <TableCell>{vps.location.name}</TableCell>
                    <TableCell>{vps.plan.name}</TableCell>
                    <TableCell>
                      <Chip 
                        label={vps.status.name}
                        color={vps.status.code === 'STATUS_CODE_RUNNING' ? 'success' : 'warning'}
                        size="small"
                        title={vps.status.message}
                      />
                    </TableCell>
                    <TableCell>
                      <div className="flex flex-col gap-1 text-sm">
                        <div title="CPU Usage">CPU: {vps.status.cpu.value}</div>
                        <div title="RAM Usage">RAM: {vps.status.ram.value}</div>
                        <div title={vps.status.drive.message || ''}>
                          Drive: {vps.status.drive.value}
                          {vps.status.drive.message && (
                            <Chip
                              label={vps.status.drive.message}
                              color="warning"
                              size="small"
                              className="ml-2"
                            />
                          )}
                        </div>
                        <div title="Network Usage">Network: {vps.status.network.value}</div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex gap-2">
                        <Tooltip title="View Details">
                          <IconButton
                            size="small"
                            onClick={() => setSelectedVpsId(vps.id)}
                          >
                            <InfoIcon />
                          </IconButton>
                        </Tooltip>
                        <IconButton
                          size="small"
                          onClick={(e) => handleActionClick(e, vps.id)}
                          disabled={vpsStatusMutation.isPending && selectedVpsId === vps.id}
                        >
                          <MoreVertIcon />
                        </IconButton>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>

      {/* SSH Keys Section */}
      <Card>
        <CardHeader 
          title="SSH Keys" 
          action={
            <Button 
              variant="contained" 
              color="primary"
              onClick={() => setIsAddKeyModalOpen(true)}
            >
              Add New Key
            </Button>
          }
        />
        <CardContent>
          {sshLoading ? (
            <div className="flex justify-center p-4">
              <CircularProgress />
            </div>
          ) : (
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Title</TableCell>
                  <TableCell>User</TableCell>
                  <TableCell>Fingerprint</TableCell>
                  <TableCell>Added</TableCell>
                  <TableCell>Linked Services</TableCell>
                  <TableCell>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {sshKeys?.map((key: SSHKey) => (
                  <TableRow key={key.id}>
                    <TableCell>{key.title}</TableCell>
                    <TableCell>{key.user}</TableCell>
                    <TableCell className="font-mono text-sm">{key.fingerprint}</TableCell>
                    <TableCell>{new Date(key.created_at).toLocaleDateString()}</TableCell>
                    <TableCell>
                      <div className="flex gap-1 flex-wrap">
                        {key.services.map(service => (
                          <Chip
                            key={service.id}
                            label={service.name}
                            size="small"
                            variant="outlined"
                          />
                        ))}
                      </div>
                    </TableCell>
                    <TableCell>
                      <Button size="small" variant="outlined" color="error">
                        Delete
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>

      {/* Billing Section */}
      <Card>
        <CardHeader 
          title="Recent Invoices" 
          action={
            <Button 
              variant="contained" 
              color="primary"
              onClick={() => navigate({ to: '/invoices' })}
            >
              View All
            </Button>
          }
        />
        <CardContent>
          {invoicesLoading ? (
            <div className="flex justify-center p-4">
              <CircularProgress />
            </div>
          ) : (
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
                {invoices?.map((invoice: Invoice) => (
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
          )}
        </CardContent>
      </Card>

      {/* Add modals */}
      <InvoiceModal />
      <AddKeyModal />
      <VpsActionMenu />
      <VpsDetailsModal />
    </div>
  )
}