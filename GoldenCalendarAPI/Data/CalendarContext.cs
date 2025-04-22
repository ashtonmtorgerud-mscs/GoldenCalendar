using Microsoft.EntityFrameworkCore;
using GoldenCalendar.Models;
using GoldenCalendar.Data;

namespace GoldenCalendar.Data
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) {}

        public DbSet<TaskModel> Tasks { get; set; }
    }
}
