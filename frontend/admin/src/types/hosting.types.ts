// Define interfaces for API responses
export interface Location {
  name: string
  code: string
}

export interface Plan {
  name: string
  description?: string
  code: string
  price: string
  category: {
    name: string
    code: string
  }
  is_hidden: boolean
}

export interface Platform {
  name: string
  code: string
}

export interface StatusMetric {
  value: string
  message: string | null
}

export interface VPSState {
  name: string
  code: string
  message: string | null
}

export interface VPSStatus {
  name: string
  code: string
  message: string
  uptime: number
  cpu: StatusMetric
  ram: StatusMetric
  drive: StatusMetric
  network: StatusMetric
  traffic?: TrafficMetrics
  payment?: string
  state: VPSState
}

export interface VPSServer {
  id: string
  name: string
  tags: string[]
  location: Location
  plan: Plan
  platform: Platform
  status: VPSStatus
  created_at: number
  updated_at: number
}

export interface SSHKeyService {
  type: 'vps' | 'storage' | 'dedicated'
  name: string
  id: string
}

export interface SSHKey {
  id: string
  fingerprint: string
  title: string
  user: string
  created_at: number
  services: SSHKeyService[]
}

export interface ServicePeriod {
  start_at: number
  finish_at: number
}

export interface ServicePlan {
  name: string
  code: string
  period: {
    name: string
    code: string
  }
}

export interface ServiceNetwork {
  public_ip: string | null
}

export interface ServiceDetails {
  id: string
  plan: ServicePlan
  network: ServiceNetwork
}

export interface InvoiceService {
  action: 'new' | 'restore'
  type: 'vps' | 'storage' | 'dedicated' | 'vpn' | 'ssl'
  quantity?: number
  period: ServicePeriod
  service: ServiceDetails
}

export interface InvoiceStatus {
  name: string
  code: string
  message: string
}

export interface Invoice {
  id: number
  invoiced_at: number
  paid_at: number
  due_to: number
  total: string
  status: InvoiceStatus
  services: InvoiceService[]
}

// Add these interfaces after the existing ones
export interface NetworkInfo {
  type: 'telegram' | 'facebook'
  identity: string
}

export interface AddressInfo {
  line_1: string
  line_2?: string
  city: string
  state: string
  country: string
  zip: string
}

export interface ServiceCounts {
  vps: number
  dedicated: number
  storage: number
  vpn: number
  ssl: number
}

export interface ServicesInfo {
  active: ServiceCounts
  total: ServiceCounts
}

export interface Restrictions {
  balance: boolean
  payment: boolean
  order: boolean
  cards: boolean
}

export interface Permissions {
  service: {
    cancellation: boolean
  }
  firewall: {
    whitelist: boolean
  }
  security: {
    ignore: boolean
  }
}

export interface Confirmations {
  email: boolean
  kyc: boolean
}

export type ProfileStatus = 'verified' | 'good' | 'suspicious' | 'bad'

export interface Profile {
  id: number
  firstname: string
  lastname: string
  phone: string
  email: string
  company?: string
  network?: NetworkInfo
  address?: AddressInfo
  balance: string
  restrictions: Restrictions
  permissions: Permissions
  confirmations: Confirmations
  '2fa_enabled': boolean
  violations: number
  created_at: number
  status: ProfileStatus
  identity: string
  cipher: string
  services: ServicesInfo
}

// Add these interfaces for VPS details
export interface VPSLocationVariant {
  name: string
  code: string
}

export interface VPSLocation extends Location {
  variant?: VPSLocationVariant
}

export interface PlanPeriod {
  name: string
  code: string
}

export interface AdditionCategory {
  name: string
  code: string
}

export interface PlanAdditionItem {
  name: string
  price: string
  code: string
  category: AdditionCategory
}

export interface PlanAdditions {
  total: string
  items: PlanAdditionItem[]
}

export interface VPSPlan extends Omit<Plan, 'category'> {
  description?: string
  price: string
  period: PlanPeriod
  next_charge: number
  charge_deferment?: number
  auto_renew: boolean
  total: string
  category?: {
    name: string
    code: string
  }
  additions?: PlanAdditions
}

export interface HardwareComponent {
  value: string
  name: string
  code: string
  price: number
  category: {
    name: string
    code: string
  }
}

export interface OSVariant {
  lang: {
    name: string
    code: string
  }
}

export interface OSConfig extends HardwareComponent {
  variant?: OSVariant
}

export interface PlatformConfig {
  cpu: HardwareComponent
  ram: HardwareComponent
  drive: HardwareComponent
  os: OSConfig
}

export interface VPSPlatform extends Platform {
  config: PlatformConfig
}

export interface NetworkProtocol {
  address: string
  mask: string
  gateway: string
  rdns: string
  is_main: boolean
}

export interface NetworkProtocols {
  ipv4: NetworkProtocol[]
  ipv6: NetworkProtocol[]
}

export interface VPSNetwork {
  public_ip: string
  protocols: NetworkProtocols
  port: string
  bandwidth: string
}

export interface VNCAccess {
  host: string
  password: string
  is_enabled: boolean
}

export interface SSHUser {
  username: string
  password: string
  is_enabled: boolean
}

export interface SSHAccess {
  users: SSHUser[]
  keys: { id: string }[]
}

export interface VPSAccess {
  vnc: VNCAccess | null
  ssh: {
    port?: number
    users: SSHUser[]
    keys: { id: string }[]
  }
}

export interface VPSDetails extends Omit<VPSServer, 'status' | 'access' | 'plan'> {
  is_hidden?: boolean
  location: VPSLocation
  plan: VPSPlan
  payment?: string
  platform: VPSPlatform
  network: VPSNetwork
  access: VPSAccess
  security?: SecurityConfig
  tools?: ToolsConfig
  status: VPSStatus
}

export interface SecurityConfig {
  backup: HardwareComponent
}

export interface ToolsConfig {
  virtualization: string
  admin: HardwareComponent
  panel: {
    name: string
    code: string
    url: string | null
    price: string
    category: {
      code: string
      name: string
    }
  }
}

export interface TrafficMetrics {
  income: string
  outcome: string
  total: string
  message: string | null
}
