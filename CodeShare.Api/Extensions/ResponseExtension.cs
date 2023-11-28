using CodeShare.Application.Models;
using Microsoft.AspNetCore.Mvc;

namespace CodeShare.Api.Extensions;

public static class ResponseExtension
{
    public static IResult ToActionResult<T>(this Response<T> response)
    {
        if (response.IsSuccessful)
        {
            return Results.Ok(response.Data);
        }

        return response.ErrorType switch
        {
            ErrorType.NotFound
                => Results.NotFound(new ProblemDetails { Detail = response.Data?.Message }),
            ErrorType.ValidationError
                => Results.BadRequest(new ValidationProblemDetails(response.ValidationErrors!)),
            _
                => Results.BadRequest(
                    new ProblemDetails { Detail = response.Data?.Message ?? "Something went wrong" }
                )
        };
    }
}
