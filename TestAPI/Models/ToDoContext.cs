using System;
using Microsoft.EntityFrameworkCore; //Unnecessary using statement?

namespace TestAPI.Models
{
    public class ToDoContext : DbContext
    {
        internal object ToDoItem;

        public ToDoContext(DbContextOptions<ToDoContext> options)
            : base(options)
        {

        }

        public DbSet<TodoItem> ToDoItems { get; set; }
        //Next, the DbContext needs to be registered with the dependency
        //injection (DI) containe. Container provides service to controllers.
    }
}
