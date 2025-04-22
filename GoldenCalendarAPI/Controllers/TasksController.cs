using Microsoft.AspNetCore.Mvc;
using GoldenCalendar.Data;
using GoldenCalendar.Models;
using System.Collections.Generic;

[ApiController]
[Route("api/[controller]")]
public class TasksController : ControllerBase
{
    private readonly AppDbContext _context;

    public TasksController(AppDbContext context)
    {
        _context = context;
    }

    [HttpGet]
    public ActionResult<IEnumerable<TaskModel>> GetTasks()
    {
        if (this._context.Tasks == null || this._context.Tasks.Count() == 0)
        {
            return NotFound("No tasks found.");

        }
        return _context.Tasks.ToList();
    }

    [HttpPost]
    public IActionResult CreateTask(TaskModel task)
    {
        _context.Tasks.Add(task);
        _context.SaveChanges();
        return CreatedAtAction(nameof(GetTasks), new { id = task.Id }, task);
    }


    [HttpGet("ping")]
    public IActionResult Ping()
    {
        return Ok("pong");
    }

}
