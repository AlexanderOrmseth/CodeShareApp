using CodeShare.Api.Extensions;
using CodeShare.Application.DTOs;
using CodeShare.Application.Handlers;
using CodeShare.Application.Models;
using MediatR;
using Microsoft.AspNetCore.Mvc;

namespace CodeShare.Api.Endpoints;

public static class CodeSnippetEndpoints
{
    public static void RegisterCodeSnippetEndpoints(this IEndpointRouteBuilder endpoints)
    {
        var codeSnippets = endpoints.MapGroup("/api/v1/code").WithTags("Code");

        // Get By Id
        codeSnippets
            .MapGet("/{snippetId:Guid}", GetCodeSnippetById)
            .AllowAnonymous()
            .Produces<ResponseData<Guid>>(StatusCodes.Status200OK)
            .Produces<ProblemDetails>(StatusCodes.Status400BadRequest)
            .Produces<ProblemDetails>(StatusCodes.Status404NotFound);

        // Add Code Snippet
        codeSnippets
            .MapPost("", AddCodeSnippet)
            .AllowAnonymous()
            .Produces<ResponseData<CodeSnippetDto>>(StatusCodes.Status200OK)
            .Produces<ProblemDetails>(StatusCodes.Status400BadRequest);

        // Get Preview of Code Snippet
        codeSnippets
            .MapPost("/preview", GetCodeSnippetPreview)
            .AllowAnonymous()
            .Produces<ResponseData<CodeSnippetPreviewDto>>(StatusCodes.Status200OK)
            .Produces<ProblemDetails>(StatusCodes.Status400BadRequest)
            .Produces<ProblemDetails>(StatusCodes.Status404NotFound);
    }

    /// <summary>
    /// Adds a new code snippet.
    /// </summary>
    /// <param name="requestBody">The data for the new code snippet.</param>
    /// <param name="mediator">The mediator to send requests.</param>
    /// <returns>The result of the operation.</returns>
    private static async Task<IResult> AddCodeSnippet(
        [FromBody] AddCodeSnippetDto requestBody,
        IMediator mediator
    )
    {
        var request = new AddCodeSnippetRequest(requestBody);
        var response = await mediator.Send(request);
        return response.ToActionResult();
    }

    /// <summary>
    /// Gets a preview of a code snippet.
    /// </summary>
    /// <param name="requestBody">The data for the code snippet to preview.</param>
    /// <param name="mediator">The mediator to send requests.</param>
    /// <returns>The result of the operation.</returns>
    private static async Task<IResult> GetCodeSnippetPreview(
        [FromBody] AddCodeSnippetDto requestBody,
        IMediator mediator
    )
    {
        var request = new GetCodeSnippetPreviewRequest(requestBody);
        var response = await mediator.Send(request);
        return response.ToActionResult();
    }

    /// <summary>
    /// Retrieves a code snippet by its unique identifier.
    /// </summary>
    /// <param name="snippetId">The unique identifier of the code snippet.</param>
    /// <param name="mediator">The mediator to send requests.</param>
    /// <returns>The code snippet if found; otherwise, NotFound.</returns>
    private static async Task<IResult> GetCodeSnippetById(
        [FromRoute] Guid snippetId,
        IMediator mediator
    )
    {
        var request = new GetCodeSnippetByIdRequest(snippetId);
        var response = await mediator.Send(request);
        return response.ToActionResult();
    }
}
