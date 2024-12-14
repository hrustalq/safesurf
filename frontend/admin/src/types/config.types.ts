export interface VPNConfig {
  id: string;
  name: string;
  protocol: 'vless' | 'vmess' | 'trojan';
  config: {
    vless?: VlessConfig;
    vmess?: VmessConfig;
    trojan?: TrojanConfig;
  };
  createdAt: string;
  updatedAt: string;
}

interface BaseConfig {
  address: string;
  port: number;
  id: string;
  encryption: string;
  network: string;
  security: string;
}

export interface VlessConfig extends BaseConfig {
  flow: string;
}

export interface VmessConfig extends BaseConfig {
  alterId: number;
}

export interface TrojanConfig extends BaseConfig {
  password: string;
} 