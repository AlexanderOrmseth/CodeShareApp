using AspNetCoreRateLimit;
using CodeShare.Api;
using CodeShare.Api.Endpoints;
using CodeShare.Api.Extensions;
using CodeShare.Api.Middleware;
using CodeShare.Application;
using CodeShare.Infrastructure;

const string myAllowSpecificOrigins = "_myAllowSpecificOrigins";

var builder = WebApplication.CreateBuilder(args);
builder.Services.ConfigureCors(myAllowSpecificOrigins, builder.Environment);
builder.Services.AddInfrastructureServices(builder.Configuration).AddRepositories();
builder.Services.AddMemoryCache();
builder.AddRateLimitServices();
builder.Services.AddSwaggerGenWithOptions();
builder.Services.AddApplicationServices();

var app = builder.Build();
app.UseMiddleware<ExceptionMiddleware>();
app.UseDevelopmentSettings(app.Environment);
app.UseCors(myAllowSpecificOrigins);
app.UseHttpsRedirection();
app.UseStaticFiles();
app.RegisterCodeSnippetEndpoints();
app.MapFallbackToFile("index.html");
app.UseIpRateLimiting();
app.Run();
