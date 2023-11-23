using CodeShare.Application.Interfaces;
using CodeShare.Infrastructure.Repositories;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;

namespace CodeShare.Infrastructure;

public static class DependencyInjection
{
    public static IServiceCollection AddInfrastructureServices(
        this IServiceCollection services,
        IConfiguration configuration
    )
    {
        Console.WriteLine(configuration.GetConnectionString("DefaultConnection"));

        services.AddDbContext<DatabaseContext>(
            options => options.UseSqlServer(configuration.GetConnectionString("DefaultConnection"))
        );

        return services;
    }

    public static void AddRepositories(this IServiceCollection services)
    {
        services.AddScoped<ICodeSnippetRepository, CodeSnippetRepository>();
    }
}
