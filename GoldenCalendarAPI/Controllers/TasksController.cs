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

    

    [HttpGet("bymonth")]
    public IActionResult GetTasksByMonth(int year, int month)
    {
        var tasks = _context.Tasks
            .Where(t => t.DueDate.Year == year && t.DueDate.Month == month)
            .ToList();

        return Ok(tasks);
    }


    [HttpPost]
    public IActionResult CreateTask(TaskModel task)
    {
        _context.Tasks.Add(task);
        _context.SaveChanges();
        return CreatedAtAction(nameof(GetTasks), new { id = task.Id }, task);
    }


    [HttpPut("{id}")]
    public IActionResult UpdateTask(int id, TaskModel updatedTask)
    {
        var existingTask = _context.Tasks.FirstOrDefault(t => t.Id == id);
        if (existingTask == null)
        {
            return NotFound($"Task with ID {id} not found.");
        }

        // Update fields
        existingTask.Title = updatedTask.Title;
        existingTask.Description = updatedTask.Description;
        existingTask.DueDate = updatedTask.DueDate;
        existingTask.IsCompleted = updatedTask.IsCompleted;

        _context.SaveChanges();
        return NoContent();
    }


    [HttpDelete("{id}")]
    public IActionResult DeleteTask(int id)
    {
        var task = _context.Tasks.FirstOrDefault(t => t.Id == id);
        if (task == null)
        {
            return NotFound($"Task with ID {id} not found.");
        }

        _context.Tasks.Remove(task);
        _context.SaveChanges();
        return NoContent();
    }


    [HttpGet("ping")]
    public IActionResult Ping()
    {
        return Ok("pong");
    }

}
