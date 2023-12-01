using CodeShare.Application.DTOs;
using FluentValidation;

namespace CodeShare.Application.Validators;

public class CodeSnippetValidator : AbstractValidator<AddCodeSnippetDto>
{
    public CodeSnippetValidator()
    {
        RuleFor(x => x.Title).MaximumLength(32);
        RuleFor(x => x.Author).MaximumLength(32);
        RuleFor(x => x.Code)
            .NotEmpty()
            .Must(BeAtLeastTenCharacters)
            .WithMessage("Your code must be at least 10 non-space characters.")
            .MaximumLength(4000);
    }

    private static bool BeAtLeastTenCharacters(string code)
    {
        return code.Count(c => !char.IsWhiteSpace(c)) >= 10;
    }
}
