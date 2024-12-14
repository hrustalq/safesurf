import { createFileRoute } from '@tanstack/react-router'
import { useState } from 'react'
import Editor from '@monaco-editor/react'
import {
  Box,
  Typography,
  Paper,
  TextField,
  MenuItem,
  Button,
  Alert,
  Snackbar,
} from '@mui/material'
import {
  VPNConfig,
  VlessConfig,
  VmessConfig,
  TrojanConfig,
} from '@/types/config.types'

// Type for the config based on protocol
type ConfigType = {
  vless: VlessConfig
  vmess: VmessConfig
  trojan: TrojanConfig
}

const defaultConfigs: ConfigType = {
  vless: {
    address: '',
    port: 443,
    id: '',
    encryption: 'none',
    flow: 'xtls-rprx-vision',
    network: 'tcp',
    security: 'tls',
  },
  vmess: {
    address: '',
    port: 443,
    id: '',
    encryption: 'auto',
    alterId: 0,
    network: 'ws',
    security: 'tls',
  },
  trojan: {
    address: '',
    port: 443,
    id: '',
    encryption: 'auto',
    password: '',
    network: 'tcp',
    security: 'tls',
  },
}

export const Route = createFileRoute('/configs/create/')({
  component: ConfigCreateRoute,
})

function ConfigCreateRoute() {
  const [name, setName] = useState('')
  const [protocol, setProtocol] = useState<'vless' | 'vmess' | 'trojan'>(
    'vless',
  )
  const [configJson, setConfigJson] = useState(
    JSON.stringify(defaultConfigs.vless, null, 2),
  )
  const [error, setError] = useState<string | null>(null)
  const [showSuccess, setShowSuccess] = useState(false)

  const handleProtocolChange = (newProtocol: 'vless' | 'vmess' | 'trojan') => {
    setProtocol(newProtocol)
    setConfigJson(JSON.stringify(defaultConfigs[newProtocol], null, 2))
  }

  const validateConfig = (
    config: Partial<VlessConfig | VmessConfig | TrojanConfig>,
  ): boolean => {
    try {
      const requiredFields = [
        'address',
        'port',
        'id',
        'encryption',
        'network',
        'security',
      ] as const

      for (const field of requiredFields) {
        if (!config[field]) {
          throw new Error(`Missing required field: ${field}`)
        }
      }

      if (protocol === 'vless' && !('flow' in config)) {
        throw new Error('VLESS config requires flow field')
      }

      if (
        protocol === 'vmess' &&
        !('alterId' in config && typeof config.alterId === 'number')
      ) {
        throw new Error('VMess config requires alterId field')
      }

      if (protocol === 'trojan' && !('password' in config)) {
        throw new Error('Trojan config requires password field')
      }

      return true
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Invalid configuration')
      return false
    }
  }

  const handleSubmit = async () => {
    try {
      setError(null)
      const parsedConfig = JSON.parse(configJson)

      if (!name.trim()) {
        throw new Error('Name is required')
      }

      if (!validateConfig(parsedConfig)) {
        return
      }

      const newConfig: VPNConfig = {
        id: crypto.randomUUID(), // This would normally come from the backend
        name: name.trim(),
        protocol,
        config: {
          [protocol]: parsedConfig,
        },
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      }

      // TODO: Replace with actual API call
      console.log('Submitting config:', newConfig)
      setShowSuccess(true)

      // Optional: Reset form or redirect
      // router.navigate('/configs')
    } catch (err) {
      setError(
        err instanceof Error ? err.message : 'Invalid JSON configuration',
      )
    }
  }

  return (
    <Box sx={{ p: 4 }}>
      <Typography variant="h4" gutterBottom>
        Create New Configuration
      </Typography>

      <Paper sx={{ p: 3, mb: 3 }}>
        <Box sx={{ display: 'flex', gap: 2, mb: 3 }}>
          <TextField
            label="Configuration Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            fullWidth
            required
            error={!name.trim()}
            helperText={!name.trim() ? 'Name is required' : ''}
          />

          <TextField
            select
            label="Protocol"
            value={protocol}
            onChange={(e) =>
              handleProtocolChange(
                e.target.value as 'vless' | 'vmess' | 'trojan',
              )
            }
            sx={{ minWidth: 200 }}
          >
            <MenuItem value="vless">VLESS</MenuItem>
            <MenuItem value="vmess">VMess</MenuItem>
            <MenuItem value="trojan">Trojan</MenuItem>
          </TextField>
        </Box>

        <Typography variant="h6" gutterBottom>
          Configuration JSON
        </Typography>

        <Paper variant="outlined" sx={{ mb: 2 }}>
          <Editor
            height="400px"
            defaultLanguage="json"
            value={configJson}
            onChange={(value: string | undefined) => setConfigJson(value || '')}
            options={{
              minimap: { enabled: false },
              formatOnPaste: true,
              formatOnType: true,
              automaticLayout: true,
            }}
          />
        </Paper>

        {error && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {error}
          </Alert>
        )}

        <Button
          variant="contained"
          color="primary"
          onClick={handleSubmit}
          size="large"
        >
          Create Configuration
        </Button>
      </Paper>

      <Snackbar
        open={showSuccess}
        autoHideDuration={3000}
        onClose={() => setShowSuccess(false)}
        message="Configuration created successfully"
      />
    </Box>
  )
}
