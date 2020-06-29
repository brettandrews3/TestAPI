using System;
namespace TestAPI.Models
{
    public class ToDoItem
    {
        public long Id { get; set; } //setting up the primary key for the database
        public string Name { get; set; }
        public bool IsComplete { get; set; }
    }
}
