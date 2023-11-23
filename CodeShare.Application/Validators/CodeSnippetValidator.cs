using CodeShare.Application.DTOs;
using FluentValidation;

namespace CodeShare.Application.Validators;

public class CodeSnippetValidator : AbstractValidator<AddCodeSnippetDto>
{
    public CodeSnippetValidator()
    {
        RuleFor(x => x.Title).MaximumLength(32);
        RuleFor(x => x.Author).MaximumLength(32);
        RuleFor(x => x.Code).NotEmpty().MinimumLength(10).MaximumLength(4000);
    }
}
