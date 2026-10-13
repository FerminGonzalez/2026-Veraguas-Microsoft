using AutoMapper;
using Copa.OCC.Api.Application.DTOs;
using Copa.OCC.Api.Domain.Entities;
using Copa.OCC.Api.Domain.Enums;
using Copa.OCC.Api.Domain.Interfaces;
using MediatR;

namespace Copa.OCC.Api.Application.Commands;

public record CreateFlightCommand(
    string FlightNumber,
    string Origin,
    string Destination,
    DateTime ScheduledDeparture,
    DateTime EstimatedDeparture,
    FlightStatus Status,
    bool Diverted = false) : IRequest<FlightDto>;

public class CreateFlightCommandHandler(IFlightRepository repository, IMapper mapper)
    : IRequestHandler<CreateFlightCommand, FlightDto>
{
    public async Task<FlightDto> Handle(CreateFlightCommand request, CancellationToken cancellationToken)
    {
        var flight = new Flight
        {
            Id = Guid.NewGuid(),
            FlightNumber = request.FlightNumber.Trim(),
            Origin = request.Origin.Trim(),
            Destination = request.Destination.Trim(),
            ScheduledDeparture = request.ScheduledDeparture,
            EstimatedDeparture = request.EstimatedDeparture,
            Status = request.Status,
            Diverted = request.Diverted
        };

        var created = await repository.AddFlightAsync(flight, cancellationToken);
        return mapper.Map<FlightDto>(created);
    }
}
