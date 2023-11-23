using CodeShare.Api;
using CodeShare.Api.Endpoints;
using CodeShare.Api.Middleware;
using CodeShare.Application;
using CodeShare.Infrastructure;

const string myAllowSpecificOrigins = "_myAllowSpecificOrigins";

var builder = WebApplication.CreateBuilder(args);
builder.Services.AddInfrastructureServices(builder.Configuration).AddRepositories();
builder.Services.AddSwaggerGenWithOptions();
builder.Services.AddApplicationServices();
builder.Services.ConfigureCors(myAllowSpecificOrigins);

var app = builder.Build();

app.UseMiddleware<ExceptionMiddleware>();
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();
app.UseCors(myAllowSpecificOrigins);
app.RegisterCodeSnippetEndpoints();
app.Run();
