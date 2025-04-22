namespace GoldenCalendar.Models
{
    public class TaskModel
    {
        public int Id { get; set; }  // Primary Key
        public string Title { get; set; } = string.Empty;
        public string Description { get; set; } = string.Empty;
        public DateTime DueDate { get; set; }
        public bool IsCompleted { get; set; } = false;
    }
}
