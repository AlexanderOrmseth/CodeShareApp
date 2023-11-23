using CodeShare.Application.Interfaces;
using CodeShare.Application.Models;
using CsharpToColouredHTML.Core;

namespace CodeShare.Application.Services;

public class HtmlGenerator : IHtmlGenerator
{
    public GeneratedHtml GenerateHtml(string code)
    {
        string css = """
            <style>
            :root{color-scheme: dark;}*{padding:0;margin:0;box-sizing:border-box;}html{font-size:15px;}
            .background {
              font-family: monaco, Consolas, LucidaConsole, monospace;
              background-color: #1e1e1e;
            }
            .numeric {
              color: #b5cea8;
            }
            .method {
              color: #dcdcaa;
            }
            .class {
              color: #4ec9b0;
            }
            .keyword {
              color: #569cd6;
            }
            .string {
              color: #ce9178;
            }
            .interface {
              color: #b8d7a3;
            }
            .enumName {
              color: #b8d7a3;
            }
            .numericLiteral {
              color: #b8d7a3;
            }
            .recordStruct {
              color: #b8d7a3;
            }
            .typeParam {
              color: #b8d7a3;
            }
            .extension {
              color: #b8d7a3;
            }
            .control {
              color: #c586c0;
            }
            .internalError {
              color: #ff0d0d;
            }
            .comment {
              color: #6a9955;
            }
            .preprocessor {
              color: #808080;
            }
            .preprocessorText {
              color: #a4a4a4;
            }
            .struct {
              color: #86c691;
            }
            .namespace {
              color: #dfdfdf;
            }
            .enumMember {
              color: #dfdfdf;
            }
            .identifier {
              color: #dfdfdf;
            }
            .punctuation {
              color: #dfdfdf;
            }
            .operator {
              color: #dfdfdf;
            }
            .propertyName {
              color: #dfdfdf;
            }
            .fieldName {
              color: #dfdfdf;
            }
            .labelName {
              color: #dfdfdf;
            }
            .operator_overloaded {
              color: #dfdfdf;
            }
            .constant {
              color: #dfdfdf;
            }
            .localName {
              color: #9cdcfe;
            }
            .parameter {
              color: #9cdcfe;
            }
            .delegate {
              color: #4ec9b0;
            }
            .eventName {
              color: #dfdfdf;
            }
            .excludedCode {
              color: #808080;
            }
          
            .code_column {
              padding-left:4px;
            }
            tr{line-height:24px;height:24px;border-radius:3px;display:flex;flex-direction:row;}
            table{white-space:pre;border-spacing:0;width:100%;}
            .line_no::before{content:attr(line_no);color:#565656;}.line_no{min-width:40px;border-right:1px solid #222;}
            @media(hover: hover) and (pointer: fine) {tr:hover{background-color:#252627;}tr:hover>.line_no::before{color:#929292;}}
            </style>
            """.Replace("\n", string.Empty).Replace(" ", string.Empty);
        var settings = new HTMLEmitterSettings().UseCustomCSS(css).DisableIframe();
        var html = new CsharpColourer().ProcessSourceCode(code, new HTMLEmitter(settings));
        var linesOfCode =
            html.Split(separator: new[] { "<tr>" }, StringSplitOptions.None).Length - 1;
        return new GeneratedHtml(linesOfCode, html);
    }
}
