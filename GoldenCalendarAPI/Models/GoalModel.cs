namespace GoldenCalendar.Models
{
    public class GoalModel
    {
        public int Id { get; set; }  // Primary Key
        public string Title { get; set; } = string.Empty;
        public string Description { get; set; } = string.Empty;
        public List<TaskModel> Tasks { get; set; } = new List<TaskModel>();
        public DateTime DueDate { get; set; }
        public bool IsCompleted { get; set; } = false;
    }
}
