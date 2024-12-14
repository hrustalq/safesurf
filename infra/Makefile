# Variables
DOCKER_COMPOSE = docker-compose
DOCKER_COMPOSE_DEV = $(DOCKER_COMPOSE) -f docker-compose.dev.yml
DOCKER_COMPOSE_PROD = $(DOCKER_COMPOSE)

# Development commands
.PHONY: dev
dev:
	$(DOCKER_COMPOSE_DEV) up

.PHONY: dev-build
dev-build:
	$(DOCKER_COMPOSE_DEV) up --build

.PHONY: migrate
migrate:
	./scripts/migrate.sh

.PHONY: migrate-dev
migrate-dev:
	$(DOCKER_COMPOSE_DEV) exec api npx prisma migrate dev

.PHONY: migrate-reset
migrate-reset:
	$(DOCKER_COMPOSE_DEV) exec api npx prisma migrate reset --force

.PHONY: dev-down
dev-down:
	$(DOCKER_COMPOSE_DEV) down

.PHONY: dev-setup
dev-setup: setup-hosts setup-ssl dev migrate

# Production commands
.PHONY: prod
prod:
	$(DOCKER_COMPOSE_PROD) up -d

.PHONY: prod-build
prod-build:
	$(DOCKER_COMPOSE_PROD) up -d --build

.PHONY: prod-down
prod-down:
	$(DOCKER_COMPOSE_PROD) down

.PHONY: prod-setup
prod-setup: setup-hosts prod

# Setup commands
.PHONY: setup-hosts
setup-hosts:
	sudo ./scripts/setup-hosts.sh

.PHONY: setup-ssl
setup-ssl:
	./scripts/generate-ssl.sh

.PHONY: setup-security
setup-security:
	sudo ../deployment/scripts/setup-security.sh

.PHONY: setup-all
setup-all: setup-security setup-hosts setup-ssl

# Utility commands
.PHONY: logs
logs:
	$(DOCKER_COMPOSE_PROD) logs -f

.PHONY: logs-dev
logs-dev:
	$(DOCKER_COMPOSE_DEV) logs -f

.PHONY: clean
clean:
	$(DOCKER_COMPOSE_PROD) down -v

# Help command
.PHONY: help
help:
	@echo "Available commands:"
	@echo "Development:"
	@echo "  make dev              - Start development environment"
	@echo "  make dev-build        - Rebuild and start development environment"
	@echo "  make dev-down         - Stop development environment"
	@echo "  make dev-setup        - Setup hosts and start development environment"
	@echo "  make migrate          - Run database migrations"
	@echo "  make migrate-dev      - Run migrations in development mode"
	@echo "  make migrate-reset    - Reset database and run migrations"
	@echo ""
	@echo "Production:"
	@echo "  make prod             - Start production environment"
	@echo "  make prod-build       - Rebuild and start production environment"
	@echo "  make prod-down        - Stop production environment"
	@echo "  make prod-setup       - Setup hosts and start production environment"
	@echo ""
	@echo "Setup:"
	@echo "  make setup-hosts      - Setup local hosts"
	@echo "  make setup-security   - Setup security configurations"
	@echo "  make setup-all        - Setup everything"
	@echo ""
	@echo "Utilities:"
	@echo "  make logs             - View logs"
	@echo "  make logs-dev         - View development logs"
	@echo "  make clean            - Remove all containers and volumes"
	@echo "  make help             - Show this help message"

# Default target
.DEFAULT_GOAL := help 