using System;
using Microsoft.EntityFrameworkCore;

namespace TestAPI.Models
{
    public class TodoContext : DbContext //inheriting from the EF Core NuGet shown above
    {
        public TodoContext(DbContextOptions<TodoContext> options)
            : base(options)
        {
        }

    public DbSet<TodoItem> TodoItems { get; set; }
    }
}
