using System;
using Microsoft.EntityFrameworkCore; //Unnecessary using statement?

namespace TestAPI.Models
{
    public class ToDoContext : DbContext
    {
        public ToDoContext(DbContextOptions<ToDoContext> options)
            : base(options)
        {

        }

        public DbSet<ToDoItem> ToDoItems { get; set; }
        //Next, the DbContext needs to be registered with the dependency
        //injection (DI) containe. Container provides service to controllers.
    }
}
