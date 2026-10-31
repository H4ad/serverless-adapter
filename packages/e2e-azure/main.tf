terraform {
  required_version = ">= 1.6.0"

  required_providers {
    azurerm = {
      source  = "hashicorp/azurerm"
      version = "~> 4.0"
    }
  }
}

variable "run_id" {
  type = string
}

variable "expire_at" {
  type = string
}

variable "location" {
  type = string
}

variable "resource_group" {
  type = string
}

variable "function_app" {
  type = string
}

variable "storage_account" {
  type = string
}

variable "subscription_id" {
  type = string
}

provider "azurerm" {
  features {}
  subscription_id = var.subscription_id
}

locals {
  tags = {
    project   = "serverless-adapter-e2e"
    run-id    = var.run_id
    expire-at = var.expire_at
  }
}

# The resource group is the destroy unit. Deleting it deletes the plan, the
# storage account and the function app, so a teardown is one call and there is
# nothing to enumerate.
resource "azurerm_resource_group" "e2e" {
  name     = var.resource_group
  location = var.location
  tags     = local.tags
}

resource "azurerm_storage_account" "e2e" {
  name                     = var.storage_account
  resource_group_name      = azurerm_resource_group.e2e.name
  location                 = azurerm_resource_group.e2e.location
  account_tier             = "Standard"
  account_replication_type = "LRS"
  min_tls_version          = "TLS1_2"
  tags                     = local.tags
}

resource "azurerm_service_plan" "e2e" {
  name                = "${var.function_app}-plan"
  resource_group_name = azurerm_resource_group.e2e.name
  location            = azurerm_resource_group.e2e.location
  os_type             = "Linux"
  sku_name            = "Y1"
  tags                = local.tags
}

resource "azurerm_linux_function_app" "e2e" {
  name                        = var.function_app
  resource_group_name         = azurerm_resource_group.e2e.name
  location                    = azurerm_resource_group.e2e.location
  service_plan_id             = azurerm_service_plan.e2e.id
  storage_account_name        = azurerm_storage_account.e2e.name
  storage_account_access_key  = azurerm_storage_account.e2e.primary_access_key
  functions_extension_version = "~4"
  https_only                  = true

  site_config {
    application_stack {
      node_version = "22"
    }
  }

  app_settings = {
    FUNCTIONS_WORKER_RUNTIME       = "node"
    FUNCTIONS_EXTENSION_VERSION    = "~4"
    WEBSITE_RUN_FROM_PACKAGE       = "1"
    AzureWebJobsFeatureFlags       = "EnableWorkerIndexing"
    SCM_DO_BUILD_DURING_DEPLOYMENT = "false"
    E2E_RUN_ID                     = var.run_id
  }

  tags = local.tags
}

output "resource_group" {
  value = azurerm_resource_group.e2e.name
}

output "function_app" {
  value = azurerm_linux_function_app.e2e.name
}

output "base_url" {
  value = "https://${azurerm_linux_function_app.e2e.default_hostname}/api"
}
