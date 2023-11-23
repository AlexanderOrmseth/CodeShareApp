using CodeShare.Domain.Entities;

namespace CodeShare.Application.Interfaces;

public interface ICodeSnippetRepository
{
    Task<Guid> AddCodeSnippet(CodeSnippet codeSnippet, CancellationToken cancellationToken);

    Task<CodeSnippet?> GetCodeSnippetById(Guid id, CancellationToken cancellationToken);

    Task DeleteOldCodeSnippets(CancellationToken cancellationToken);
}
