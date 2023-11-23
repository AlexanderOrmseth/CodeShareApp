namespace CodeShare.Application.DTOs;

public class AddCodeSnippetDto
{
    public required string Code { get; set; }
    public string? Title { get; set; }
    public string? Author { get; set; }
}
