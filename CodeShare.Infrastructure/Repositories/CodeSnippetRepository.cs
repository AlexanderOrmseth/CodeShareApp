using CodeShare.Application.Interfaces;
using CodeShare.Domain.Entities;
using Microsoft.EntityFrameworkCore;

namespace CodeShare.Infrastructure.Repositories;

public class CodeSnippetRepository(DatabaseContext context) : ICodeSnippetRepository
{
    public async Task<Guid> AddCodeSnippet(
        CodeSnippet codeSnippet,
        CancellationToken cancellationToken
    )
    {
        var result = context.CodeSnippets.Add(codeSnippet);
        await context.SaveChangesAsync(cancellationToken);
        return result.Entity.Id;
    }

    public async Task DeleteOldCodeSnippets(CancellationToken cancellationToken)
    {
        var now = DateTime.UtcNow;
        var codeToRemove = await context.CodeSnippets
            .Where(x => now.AddHours(-6) > x.CreatedAt)
            .ToListAsync(cancellationToken);

        if (codeToRemove.Count == 0)
            return;

        context.RemoveRange(codeToRemove);
    }

    public async Task<CodeSnippet?> GetCodeSnippetById(Guid id, CancellationToken cancellationToken)
    {
        return await context.CodeSnippets.FindAsync([id], cancellationToken: cancellationToken);
    }
}
