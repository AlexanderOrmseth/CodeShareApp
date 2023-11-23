using CodeShare.Domain.Entities;
using Microsoft.EntityFrameworkCore;

namespace CodeShare.Infrastructure;

public class DatabaseContext(DbContextOptions<DatabaseContext> options) : DbContext(options)
{
    public DbSet<CodeSnippet> CodeSnippets { get; set; }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<CodeSnippet>(entity =>
        {
            entity.HasKey(e => e.Id);
            entity.Property(e => e.Title).HasMaxLength(32);
            entity.Property(e => e.Author).HasMaxLength(32);
            entity.Property(e => e.Code).HasMaxLength(4000);
            entity.Property(e => e.CreatedAt).IsRequired().HasDefaultValueSql("GETDATE()");
        });
    }
}
