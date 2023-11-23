using CodeShare.Application.Interfaces;
using CodeShare.Application.Models;
using CsharpToColouredHTML.Core;

namespace CodeShare.Application.Services;

public class HtmlGenerator : IHtmlGenerator
{
    public GeneratedHtml GenerateHtml(string code)
    {
        var settings = new HTMLEmitterSettings().UseDefaultCSS().DisableIframe();
        var html = new CsharpColourer().ProcessSourceCode(code, new HTMLEmitter(settings));
        var linesOfCode =
            html.Split(separator: new[] { "<tr>" }, StringSplitOptions.None).Length - 1;
        return new GeneratedHtml(linesOfCode, html);
    }
}
