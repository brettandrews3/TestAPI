using System;
using Microsoft.EntityFrameworkCore;

namespace TestAPI.Models
{
    //Here, my ToDoContext class inherits from the using statement with EF Core
    public class ToDoContext : DbContext
    {
        public ToDoContext(DbContextOptions<ToDoContext> options)
            : base(options)
        {

        }

        public DbSet<TodoItem> TodoItems { get; set; }
        //Next, the DbContext needs to be registered with the dependency
        //injection (DI) containe. Container provides service to controllers.
    }
}
