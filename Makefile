# ========================================
# Variables
# ========================================
app_path := "node"

# ========================================
# Targets
# ========================================
clean:
	@sudo rm -rf $(app_path)/db
	@sudo rm -rf $(app_path)/node_modules
	@echo "Database volume and Dependencies were successfully removed"

build-dev:
	@docker-compose -f docker-compose.dev.yml build --no-cache

run-dev:
	@docker-compose -f docker-compose.dev.yml up -d --pull=never
	@docker exec -it app bash

stop-dev:
	@docker-compose -f docker-compose.dev.yml down
