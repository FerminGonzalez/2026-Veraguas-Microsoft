# Plantilla base (fase de construccion) — fragmento de hackathon-iac/main.tf
# Los comentarios TODO-HACKATHON-ERROR marcan los puntos exactos que seran
# alterados intencionalmente en la fase de reto.

resource "azurerm_linux_web_app" "backend" {
  name                = "team-${var.team_id}-api"
  resource_group_name = azurerm_resource_group.team.name
  location            = azurerm_resource_group.team.location
  service_plan_id     = data.azurerm_service_plan.backend.id

  site_config {
    application_stack {
      dotnet_version = "10.0"
    }
  }

  app_settings = {
    # TODO-HACKATHON-ERROR: E3 — en la fase de reto el nombre de esta variable
    # tendra un caracter extra (ej. PRODUCT_SERVICE_URLX), rompiendo la referencia
    "PRODUCT_SERVICE_URL" = "https://catalog-api.internal.azurewebsites.net"
    "APPLICATIONINSIGHTS_CONNECTION_STRING" = azurerm_application_insights.team.connection_string
  }
}
