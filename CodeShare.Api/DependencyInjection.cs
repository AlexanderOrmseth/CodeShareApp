using Microsoft.OpenApi.Models;
using System.Reflection;

namespace CodeShare.Api;

public static class DependencyInjection
{
    public static IServiceCollection ConfigureCors(
        this IServiceCollection services,
        string name,
        IWebHostEnvironment environment
    )
    {
        services.AddCors(options =>
        {
            options.AddPolicy(
                name: name,
                builder =>
                {
                    if (environment.IsDevelopment())
                    {
                        builder.AllowAnyOrigin().AllowAnyHeader().WithMethods("GET", "POST");
                    }
                    else
                    {
                        builder
                            .WithOrigins("TODO: REPLACE THIS")
                            .AllowAnyHeader()
                            .WithMethods("GET", "POST");
                    }
                }
            );
        });

        return services;
    }

    public static IApplicationBuilder UseDevelopmentSettings(
        this IApplicationBuilder app,
        IWebHostEnvironment environment
    )
    {
        if (environment.IsDevelopment())
        {
            app.UseSwagger();
            app.UseSwaggerUI();

            app.Use(
                async (_, next) =>
                {
                    await Task.Delay(200);
                    await next.Invoke();
                }
            );
        }

        return app;
    }

    public static IServiceCollection AddSwaggerGenWithOptions(this IServiceCollection services)
    {
        services.AddEndpointsApiExplorer();
        services.AddSwaggerGen(c =>
        {
            var title = "CSharpCodeShare API";
            var description =
                "An API designed to generate and share C# code snippets with syntax highlighting. This service provides a platform for users to create, view, and share C# code in a syntax-highlighted format. The API includes functionality for periodic deletion of old code snippets, ensuring a clean and efficient code-sharing experience.";

            var contact = new OpenApiContact
            {
                Name = "Alexander Ormseth",
                Email = "a_ormseth@hotmail.com",
                Url = new Uri("https://github.com/AlexanderOrmseth")
            };

            c.SwaggerDoc(
                "v1",
                new OpenApiInfo
                {
                    Title = title,
                    Version = "v1",
                    Description = description,
                    Contact = contact
                }
            );

            var xmlFile = $"{Assembly.GetExecutingAssembly().GetName().Name}.xml";
            var xmlPath = Path.Combine(AppContext.BaseDirectory, xmlFile);
            c.IncludeXmlComments(xmlPath);
        });

        return services;
    }
}
