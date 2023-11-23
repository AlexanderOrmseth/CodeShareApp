using CodeShare.Application.DTOs;
using CodeShare.Application.Interfaces;
using CodeShare.Application.Models;
using CodeShare.Domain.Entities;
using FluentValidation;
using MediatR;

namespace CodeShare.Application.Handlers;

public record AddCodeSnippetRequest(AddCodeSnippetDto CodeSnippet) : IRequest<Response<Guid>>;

public class AddCodeSnippetHandler(
    ICodeSnippetRepository repository,
    IValidator<AddCodeSnippetDto> validator
) : IRequestHandler<AddCodeSnippetRequest, Response<Guid>>
{
    public async Task<Response<Guid>> Handle(
        AddCodeSnippetRequest request,
        CancellationToken cancellationToken
    )
    {
        var response = new Response<Guid>();

        // validate request body
        var validationResult = await validator.ValidateAsync(
            request.CodeSnippet,
            cancellationToken
        );
        if (!validationResult.IsValid)
        {
            return response.AsError(validationResult);
        }

        var codeSnippet = new CodeSnippet
        {
            Code = request.CodeSnippet.Code,
            Title = request.CodeSnippet.Title,
            Author = request.CodeSnippet.Author,
        };

        var guid = await repository.AddCodeSnippet(codeSnippet, cancellationToken);

        return response.WithData(guid);
    }
}
