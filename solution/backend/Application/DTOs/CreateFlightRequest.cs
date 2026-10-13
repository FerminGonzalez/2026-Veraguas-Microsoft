using Copa.OCC.Api.Domain.Enums;

namespace Copa.OCC.Api.Application.DTOs;

public class CreateFlightRequest
{
    public string? FlightNumber { get; set; }
    public string? Origin { get; set; }
    public string? Destination { get; set; }
    public DateTime? ScheduledDeparture { get; set; }
    public DateTime? EstimatedDeparture { get; set; }
    public FlightStatus? Status { get; set; }
    public bool Diverted { get; set; }
}
