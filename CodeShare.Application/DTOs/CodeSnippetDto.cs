namespace CodeShare.Application.DTOs;

public class CodeSnippetDto
{
    public Guid Id { get; set; }
    public string? Title { get; set; }
    public string? Author { get; set; }
    public required string Code { get; set; }
    public DateTime CreatedAt { get; set; }
    public required int LinesOfCode { get; set; }
}
