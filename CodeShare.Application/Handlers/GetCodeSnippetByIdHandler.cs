using CodeShare.Application.DTOs;
using CodeShare.Application.Interfaces;
using CodeShare.Application.Models;
using MediatR;

namespace CodeShare.Application.Handlers;

public record GetCodeSnippetByIdRequest(Guid SnippetId) : IRequest<Response<CodeSnippetDto>>;

public class GetCodeSnippetByIdHandler(ICodeSnippetRepository repository, IHtmlGenerator generator)
    : IRequestHandler<GetCodeSnippetByIdRequest, Response<CodeSnippetDto>>
{
    public async Task<Response<CodeSnippetDto>> Handle(
        GetCodeSnippetByIdRequest request,
        CancellationToken cancellationToken
    )
    {
        var response = new Response<CodeSnippetDto>();

        var codeSnippet = await repository.GetCodeSnippetById(request.SnippetId, cancellationToken);

        if (codeSnippet is null)
        {
            return response.AsError("Code snippet was not found", ErrorType.NotFound);
        }

        var generatedHtml = generator.GenerateHtml(codeSnippet.Code);

        var data = new CodeSnippetDto
        {
            Id = codeSnippet.Id,
            Author = codeSnippet.Author,
            CreatedAt = codeSnippet.CreatedAt,
            Title = codeSnippet.Title,
            Code = generatedHtml.Html,
            LinesOfCode = generatedHtml.LinesOfCode,
        };

        return response.WithData(data);
    }
}
