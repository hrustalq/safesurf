-- CreateEnum
CREATE TYPE "PlanInterval" AS ENUM ('MONTH', 'YEAR');

-- CreateEnum
CREATE TYPE "SubscriptionStatus" AS ENUM ('ACTIVE', 'SUSPENDED', 'CANCELLED', 'EXPIRED');

-- CreateEnum
CREATE TYPE "VPNProtocol" AS ENUM ('VLESS', 'VMESS', 'TROJAN', 'SHADOWSOCKS');

-- CreateEnum
CREATE TYPE "ServerStatus" AS ENUM ('ACTIVE', 'MAINTENANCE', 'OFFLINE');

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "email" TEXT,
    "password" TEXT,
    "name" TEXT,
    "image" TEXT,
    "yandexId" TEXT,
    "telegramId" TEXT,
    "telegramUsername" TEXT,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Account" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "provider" TEXT NOT NULL,
    "providerAccountId" TEXT NOT NULL,
    "refresh_token" TEXT,
    "access_token" TEXT,
    "expires_at" INTEGER,
    "token_type" TEXT,
    "scope" TEXT,
    "id_token" TEXT,
    "session_state" TEXT,

    CONSTRAINT "Account_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Session" (
    "id" TEXT NOT NULL,
    "sessionToken" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "expires" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Session_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "VerificationToken" (
    "identifier" TEXT NOT NULL,
    "token" TEXT NOT NULL,
    "expires" TIMESTAMP(3) NOT NULL
);

-- CreateTable
CREATE TABLE "Plan" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "price" DECIMAL(10,2) NOT NULL,
    "currency" TEXT NOT NULL DEFAULT 'USD',
    "interval" "PlanInterval" NOT NULL DEFAULT 'MONTH',
    "features" JSONB,
    "bandwidth" INTEGER NOT NULL,
    "devices" INTEGER NOT NULL,
    "active" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Plan_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Subscription" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "planId" TEXT NOT NULL,
    "status" "SubscriptionStatus" NOT NULL DEFAULT 'ACTIVE',
    "startDate" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "endDate" TIMESTAMP(3) NOT NULL,
    "autoRenew" BOOLEAN NOT NULL DEFAULT true,
    "bandwidthUsed" INTEGER NOT NULL DEFAULT 0,
    "lastPayment" TIMESTAMP(3),
    "nextPayment" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Subscription_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "VPNServer" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "subdomain" TEXT NOT NULL,
    "host" TEXT NOT NULL,
    "port" INTEGER NOT NULL,
    "panelPort" INTEGER NOT NULL,
    "apiKey" TEXT NOT NULL,
    "location" TEXT NOT NULL,
    "countryCode" TEXT NOT NULL,
    "capacity" INTEGER NOT NULL,
    "status" "ServerStatus" NOT NULL DEFAULT 'ACTIVE',
    "lastPing" TIMESTAMP(3),
    "lastHealthCheck" TIMESTAMP(3),
    "isHealthy" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "VPNServer_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "VPNInbound" (
    "id" INTEGER NOT NULL,
    "serverId" TEXT NOT NULL,
    "protocol" "VPNProtocol" NOT NULL,
    "port" INTEGER NOT NULL,
    "tag" TEXT NOT NULL,
    "settings" JSONB NOT NULL,
    "streamSettings" JSONB NOT NULL,
    "sniffing" JSONB,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "VPNInbound_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "VPNAccount" (
    "id" TEXT NOT NULL,
    "subscriptionId" TEXT NOT NULL,
    "serverId" TEXT NOT NULL,
    "inboundId" INTEGER NOT NULL,
    "uuid" TEXT NOT NULL,
    "email" TEXT,
    "settings" JSONB NOT NULL,
    "up" INTEGER NOT NULL DEFAULT 0,
    "down" INTEGER NOT NULL DEFAULT 0,
    "total" INTEGER NOT NULL,
    "expiryTime" INTEGER NOT NULL,
    "enable" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "lastUsed" TIMESTAMP(3),

    CONSTRAINT "VPNAccount_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TrafficLog" (
    "id" TEXT NOT NULL,
    "accountId" TEXT NOT NULL,
    "serverId" TEXT NOT NULL,
    "timestamp" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "upload" INTEGER NOT NULL,
    "download" INTEGER NOT NULL,
    "period" TEXT NOT NULL,

    CONSTRAINT "TrafficLog_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "User_yandexId_key" ON "User"("yandexId");

-- CreateIndex
CREATE UNIQUE INDEX "User_telegramId_key" ON "User"("telegramId");

-- CreateIndex
CREATE INDEX "User_email_idx" ON "User"("email");

-- CreateIndex
CREATE INDEX "User_yandexId_idx" ON "User"("yandexId");

-- CreateIndex
CREATE INDEX "User_telegramId_idx" ON "User"("telegramId");

-- CreateIndex
CREATE INDEX "Account_userId_idx" ON "Account"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "Account_provider_providerAccountId_key" ON "Account"("provider", "providerAccountId");

-- CreateIndex
CREATE UNIQUE INDEX "Session_sessionToken_key" ON "Session"("sessionToken");

-- CreateIndex
CREATE INDEX "Session_userId_idx" ON "Session"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "VerificationToken_token_key" ON "VerificationToken"("token");

-- CreateIndex
CREATE UNIQUE INDEX "VerificationToken_identifier_token_key" ON "VerificationToken"("identifier", "token");

-- CreateIndex
CREATE INDEX "Plan_active_idx" ON "Plan"("active");

-- CreateIndex
CREATE INDEX "Subscription_userId_idx" ON "Subscription"("userId");

-- CreateIndex
CREATE INDEX "Subscription_status_idx" ON "Subscription"("status");

-- CreateIndex
CREATE UNIQUE INDEX "VPNServer_subdomain_key" ON "VPNServer"("subdomain");

-- CreateIndex
CREATE INDEX "VPNServer_status_idx" ON "VPNServer"("status");

-- CreateIndex
CREATE INDEX "VPNServer_location_idx" ON "VPNServer"("location");

-- CreateIndex
CREATE INDEX "VPNServer_countryCode_idx" ON "VPNServer"("countryCode");

-- CreateIndex
CREATE INDEX "VPNInbound_serverId_idx" ON "VPNInbound"("serverId");

-- CreateIndex
CREATE UNIQUE INDEX "VPNInbound_serverId_port_key" ON "VPNInbound"("serverId", "port");

-- CreateIndex
CREATE UNIQUE INDEX "VPNAccount_uuid_key" ON "VPNAccount"("uuid");

-- CreateIndex
CREATE INDEX "VPNAccount_subscriptionId_idx" ON "VPNAccount"("subscriptionId");

-- CreateIndex
CREATE INDEX "VPNAccount_serverId_idx" ON "VPNAccount"("serverId");

-- CreateIndex
CREATE INDEX "VPNAccount_inboundId_idx" ON "VPNAccount"("inboundId");

-- CreateIndex
CREATE INDEX "TrafficLog_accountId_idx" ON "TrafficLog"("accountId");

-- CreateIndex
CREATE INDEX "TrafficLog_serverId_idx" ON "TrafficLog"("serverId");

-- CreateIndex
CREATE INDEX "TrafficLog_timestamp_idx" ON "TrafficLog"("timestamp");

-- AddForeignKey
ALTER TABLE "Account" ADD CONSTRAINT "Account_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Session" ADD CONSTRAINT "Session_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Subscription" ADD CONSTRAINT "Subscription_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Subscription" ADD CONSTRAINT "Subscription_planId_fkey" FOREIGN KEY ("planId") REFERENCES "Plan"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "VPNInbound" ADD CONSTRAINT "VPNInbound_serverId_fkey" FOREIGN KEY ("serverId") REFERENCES "VPNServer"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "VPNAccount" ADD CONSTRAINT "VPNAccount_subscriptionId_fkey" FOREIGN KEY ("subscriptionId") REFERENCES "Subscription"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "VPNAccount" ADD CONSTRAINT "VPNAccount_serverId_fkey" FOREIGN KEY ("serverId") REFERENCES "VPNServer"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "VPNAccount" ADD CONSTRAINT "VPNAccount_inboundId_fkey" FOREIGN KEY ("inboundId") REFERENCES "VPNInbound"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
