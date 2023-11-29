using CodeShare.Application.Interfaces;
using CodeShare.Application.Models;
using CsharpToColouredHTML.Core;

namespace CodeShare.Application.Services;

public class HtmlGenerator : IHtmlGenerator
{
    public GeneratedHtml GenerateHtml(string code)
    {
        const string style = """
            <style>:root{color-scheme:dark}*{padding:0;margin:0;box-sizing:border-box}html{font-size:15px;font-family:Monaco,Consolas,'Lucida Console',monospace;background-color:#1e1e1e}.method{color:#dcdcaa}.class{color:#4ec9b0}.keyword{color:#569cd6}.string{color:#ce9178}.interface{color:#b8d7a3}.extension{color:#dcdcaa}.control{color:#c586c0}.comment{color:#6a9955}.struct{color:#86c691}.namespace{color:#dfdfdf}.identifier{color:#dfdfdf}.punctuation{color:#dfdfdf}.operator{color:#dfdfdf}.localName{color:#9cdcfe}.parameter{color:#9cdcfe}.code_highlight{background-color:#395929}table{white-space:pre;border-spacing:0;width:100%}tr{line-height:24px;height:24px;border-radius:3px;display:flex;flex-direction:row}.line_no::before{content:attr(line_no);color:#565656}.code_column{padding-left:5px;color:#6a9955}.line_no{min-width:40px;border-right:1px solid #222}@media (hover:hover) and (pointer:fine){tr:hover{background-color:#252627}tr:hover>.line_no::before{color:#929292}}</style>
            """;
        var settings = new HTMLEmitterSettings().UseCustomCSS(style).DisableIframe();
        var html = new CsharpColourer().ProcessSourceCode(code, new HTMLEmitter(settings));
        var linesOfCode =
            html.Split(separator: new[] { "<tr>" }, StringSplitOptions.None).Length - 1;
        return new GeneratedHtml(linesOfCode, html);
    }
}
