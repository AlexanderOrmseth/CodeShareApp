using CodeShare.Application.DTOs;
using CodeShare.Application.Interfaces;
using CodeShare.Application.Models;
using FluentValidation;
using MediatR;

namespace CodeShare.Application.Handlers;

public record GetCodeSnippetPreviewRequest(AddCodeSnippetDto CodeSnippet)
    : IRequest<Response<CodeSnippetPreviewDto>>;

public class GetCodeSnippetPreviewHandler(
    IHtmlGenerator generator,
    IValidator<AddCodeSnippetDto> validator
) : IRequestHandler<GetCodeSnippetPreviewRequest, Response<CodeSnippetPreviewDto>>
{
    public async Task<Response<CodeSnippetPreviewDto>> Handle(
        GetCodeSnippetPreviewRequest request,
        CancellationToken cancellationToken
    )
    {
        var response = new Response<CodeSnippetPreviewDto>();

        // validate request body
        var validationResult = await validator.ValidateAsync(
            request.CodeSnippet,
            cancellationToken
        );
        if (!validationResult.IsValid)
        {
            return response.AsError(validationResult);
        }

        var generatedHtml = generator.GenerateHtml(request.CodeSnippet.Code);

        var data = new CodeSnippetPreviewDto
        {
            Author = request.CodeSnippet.Author,
            Title = request.CodeSnippet.Title,
            Code = request.CodeSnippet.Code,
            Html = generatedHtml.Html,
            LinesOfCode = generatedHtml.LinesOfCode,
        };

        return response.WithData(data);
    }
}
