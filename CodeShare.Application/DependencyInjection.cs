using CodeShare.Application.Interfaces;
using CodeShare.Application.Services;
using FluentValidation;
using Microsoft.Extensions.DependencyInjection;

namespace CodeShare.Application;

public static class DependencyInjection
{
    public static IServiceCollection AddApplicationServices(this IServiceCollection services)
    {
        services.AddMediatR(
            configuration =>
                configuration.RegisterServicesFromAssembly(typeof(DependencyInjection).Assembly)
        );

        services.AddValidatorsFromAssembly(typeof(DependencyInjection).Assembly);
        services.AddTransient<IHtmlGenerator, HtmlGenerator>();

        return services;
    }
}
