using CodeShare.Application.Models;

namespace CodeShare.Application.Interfaces;

public interface IHtmlGenerator
{
    GeneratedHtml GenerateHtml(string code);
}
