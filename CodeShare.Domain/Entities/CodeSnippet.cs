namespace CodeShare.Domain.Entities;

public class CodeSnippet
{
    public Guid Id { get; set; }

    public string? Title { get; set; }

    public string? Author { get; set; }

    public required string Code { get; set; }

    public DateTime CreatedAt { get; set; }
}
