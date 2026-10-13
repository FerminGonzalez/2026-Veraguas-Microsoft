using Copa.OCC.Api.Application.Commands;
using Copa.OCC.Api.Application.DTOs;
using Copa.OCC.Api.Application.Queries;
using Copa.OCC.Api.Domain.Enums;
using MediatR;
using Microsoft.AspNetCore.Mvc;

namespace Copa.OCC.Api.Presentation.Controllers;

[ApiController]
[Route("api/flights")]
public class FlightsController(IMediator mediator) : ControllerBase
{
    [HttpGet("list")]
    public async Task<IActionResult> List(CancellationToken cancellationToken)
    {
        var flights = await mediator.Send(new GetInformationQuery(), cancellationToken);
        return Ok(flights);
    }

    [HttpPost("create")]
    public async Task<IActionResult> Create(
        [FromBody] CreateFlightRequest request,
        CancellationToken cancellationToken)
    {
        var validationErrors = Validate(request);
        if (validationErrors.Count > 0)
        {
            return BadRequest(new
            {
                errorCode = "E6",
                message = "El payload no cumple los campos obligatorios del vuelo",
                errors = validationErrors
            });
        }

        var flight = await mediator.Send(
            new CreateFlightCommand(
                request.FlightNumber!,
                request.Origin!,
                request.Destination!,
                request.ScheduledDeparture!.Value,
                request.EstimatedDeparture ?? request.ScheduledDeparture.Value,
                request.Status!.Value,
                request.Diverted),
            cancellationToken);

        return StatusCode(StatusCodes.Status201Created, flight);
    }

    private static Dictionary<string, string> Validate(CreateFlightRequest request)
    {
        var errors = new Dictionary<string, string>();

        if (string.IsNullOrWhiteSpace(request.FlightNumber))
            errors["flightNumber"] = "El numero de vuelo es obligatorio";

        if (string.IsNullOrWhiteSpace(request.Origin))
            errors["origin"] = "El origen es obligatorio";

        if (string.IsNullOrWhiteSpace(request.Destination))
            errors["destination"] = "El destino es obligatorio";

        if (!request.ScheduledDeparture.HasValue)
            errors["scheduledDeparture"] = "La salida programada es obligatoria";

        if (!request.Status.HasValue || !Enum.IsDefined(typeof(FlightStatus), request.Status.Value))
            errors["status"] = "El estado es obligatorio y debe ser Scheduled, InTransit, Delayed, Cancelled o Landed";

        return errors;
    }
}
