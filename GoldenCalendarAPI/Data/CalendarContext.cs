using Microsoft.EntityFrameworkCore;
using GoldenCalendar.Models;
using GoldenCalendar.Data;
using GoldenCalendarAPI.Models;

namespace GoldenCalendar.Data
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) {}

        public DbSet<TaskModel> Tasks { get; set; }

        public DbSet<Contact> Contacts { get; set; }

        public DbSet<GoalModel> Goals { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            // Tell EF that Yuu is an owned (embedded) type inside Contact
            modelBuilder.Entity<Contact>()
                .OwnsOne(c => c.Yuu);

            // Tell EF that Socials is a collection of owned types inside Contact
            modelBuilder.Entity<Contact>()
                .OwnsMany(c => c.Socials, sa =>
                {
                    sa.WithOwner(); // Optional but clear: each social belongs to a contact
                });
        }


    }
}
