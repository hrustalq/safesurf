import { createFileRoute, Link } from '@tanstack/react-router'
import { useState } from 'react'
import { QRCodeSVG } from 'qrcode.react'
import {
  Tabs,
  Tab,
  Box,
  Paper,
  Typography,
  Grid,
  Card,
  CardContent,
  IconButton,
  Tooltip,
  Snackbar,
  Button,
} from '@mui/material'
import ContentCopyIcon from '@mui/icons-material/ContentCopy'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import ExpandLessIcon from '@mui/icons-material/ExpandLess'
import { VPNConfig } from '@/types/config.types'
import AddIcon from '@mui/icons-material/Add'

// Mock data
const mockConfigs: VPNConfig[] = [
  {
    id: '1',
    name: 'Server 1',
    protocol: 'vless',
    config: {
      vless: {
        address: 'example.com',
        port: 443,
        id: 'uuid-1',
        encryption: 'none',
        flow: 'xtls-rprx-vision',
        network: 'tcp',
        security: 'tls',
      },
    },
    createdAt: '2024-03-15T10:00:00Z',
    updatedAt: '2024-03-15T10:00:00Z',
  },
  {
    id: '2',
    name: 'Server 2',
    protocol: 'vmess',
    config: {
      vmess: {
        address: 'example2.com',
        port: 443,
        id: 'uuid-2',
        encryption: 'auto',
        alterId: 0,
        network: 'ws',
        security: 'tls',
      },
    },
    createdAt: '2024-03-15T11:00:00Z',
    updatedAt: '2024-03-15T11:00:00Z',
  },
]

interface TabPanelProps {
  children?: React.ReactNode
  index: number
  value: number
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props

  return (
    <div role="tabpanel" hidden={value !== index} {...other}>
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  )
}

export const Route = createFileRoute('/configs/')({
  component: ConfigsRoute,
})

function ConfigsRoute() {
  const [selectedConfig, setSelectedConfig] = useState<VPNConfig | null>(null)
  const [tabValue, setTabValue] = useState(0)
  const [showCopySuccess, setShowCopySuccess] = useState(false)
  const [isExpanded, setIsExpanded] = useState(false)

  const handleTabChange = (_event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue)
  }

  const getConnectionString = (config: VPNConfig): string => {
    const configData = config.config[config.protocol]
    if (!configData) return ''

    return `${config.protocol}://${btoa(JSON.stringify(configData))}`
  }

  const handleCopyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text)
      setShowCopySuccess(true)
    } catch (err) {
      console.error('Failed to copy text: ', err)
    }
  }

  const truncateString = (str: string, maxLength: number = 50) => {
    if (str.length <= maxLength) return str
    return str.slice(0, maxLength) + '...'
  }

  return (
    <Box sx={{ p: 4 }}>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          mb: 4,
        }}
      >
        <Typography variant="h4">VPN Configurations</Typography>

        <Button
          component={Link}
          to="/configs/create"
          variant="contained"
          startIcon={<AddIcon />}
        >
          Create Config
        </Button>
      </Box>

      <Grid container spacing={2}>
        {mockConfigs.map((config) => (
          <Grid item xs={12} md={6} key={config.id}>
            <Card
              sx={{ cursor: 'pointer' }}
              onClick={() => setSelectedConfig(config)}
            >
              <CardContent>
                <Typography variant="h6">{config.name}</Typography>
                <Typography color="textSecondary">
                  Protocol: {config.protocol}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {selectedConfig && (
        <Box sx={{ mt: 4 }}>
          <Typography variant="h5" gutterBottom>
            {selectedConfig.name} Details
          </Typography>

          <Box sx={{ width: '100%' }}>
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
              <Tabs
                value={tabValue}
                onChange={handleTabChange}
                aria-label="config tabs"
              >
                <Tab label="Raw Config" />
                <Tab label="Connection String" />
                <Tab label="QR Code" />
              </Tabs>
            </Box>

            <TabPanel value={tabValue} index={0}>
              <Paper sx={{ p: 2, bgcolor: 'grey.100' }}>
                <pre style={{ overflow: 'auto' }}>
                  {JSON.stringify(selectedConfig.config, null, 2)}
                </pre>
              </Paper>
            </TabPanel>

            <TabPanel value={tabValue} index={1}>
              <Paper sx={{ p: 2, bgcolor: 'grey.100' }}>
                <Box
                  sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 1,
                  }}
                >
                  <Box
                    sx={{
                      display: 'flex',
                      alignItems: 'flex-start',
                      gap: 1,
                    }}
                  >
                    <Typography
                      sx={{
                        wordBreak: 'break-all',
                        flex: 1,
                        fontFamily: 'monospace',
                        whiteSpace: 'pre-wrap',
                      }}
                    >
                      {selectedConfig &&
                        (isExpanded
                          ? getConnectionString(selectedConfig)
                          : truncateString(
                              getConnectionString(selectedConfig),
                            ))}
                    </Typography>
                    <Box sx={{ display: 'flex', gap: 1 }}>
                      <Tooltip title={isExpanded ? 'Show Less' : 'Show More'}>
                        <IconButton
                          onClick={() => setIsExpanded(!isExpanded)}
                          size="small"
                        >
                          {isExpanded ? <ExpandLessIcon /> : <ExpandMoreIcon />}
                        </IconButton>
                      </Tooltip>
                      <Tooltip title="Copy to clipboard">
                        <IconButton
                          onClick={() =>
                            selectedConfig &&
                            handleCopyToClipboard(
                              getConnectionString(selectedConfig),
                            )
                          }
                          size="small"
                        >
                          <ContentCopyIcon />
                        </IconButton>
                      </Tooltip>
                    </Box>
                  </Box>
                </Box>
              </Paper>
            </TabPanel>

            <TabPanel value={tabValue} index={2}>
              <Paper
                sx={{
                  p: 2,
                  height: 256,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <QRCodeSVG
                  value={getConnectionString(selectedConfig)}
                  size={200}
                  level="H"
                  includeMargin={true}
                />
              </Paper>
            </TabPanel>
          </Box>
        </Box>
      )}

      <Snackbar
        open={showCopySuccess}
        autoHideDuration={2000}
        onClose={() => setShowCopySuccess(false)}
        message="Copied to clipboard"
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      />
    </Box>
  )
}
