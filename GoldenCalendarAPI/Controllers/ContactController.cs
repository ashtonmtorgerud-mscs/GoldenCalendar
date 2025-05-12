using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using GoldenCalendarAPI.Models;
using GoldenCalendar.Data;
using Microsoft.EntityFrameworkCore.Query.Internal;

namespace GoldenCalendarAPI.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ContactController : ControllerBase
    {
        private readonly AppDbContext _context;

        public ContactController(AppDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public ActionResult<List<Contact>> GetAllContacts()
        {
            if (this._context.Contacts == null || this._context.Contacts.Count() == 0)
            {
                return NotFound("No Contacts found.");

            }
            return _context.Contacts.ToList();
        }

        [HttpGet("{id}")]
        public ActionResult<Contact> GetContactById(int id)
        {
            var contact = _context.Contacts.FirstOrDefault(c => c.Id == id);
            if (contact == null)
            {
                return NotFound($"Contact with ID '{id}' not found.");
            }
            return Ok(contact);
        }


        [HttpGet("paged")]
        public ActionResult<IEnumerable<Contact>> GetPagedContacts(
            [FromQuery] int page = 1,
            [FromQuery] int pageSize = 10,
            [FromQuery] string? search = null,
            [FromQuery] string? tag = null,
            [FromQuery] string sort = "name",           // Default sort by name
            [FromQuery] bool descending = false         // Default ascending
        )
        {
            if (page <= 0 || pageSize <= 0)
                return BadRequest("Page and pageSize must be greater than zero.");

            var query = _context.Contacts.AsQueryable();

            // 🔍 Search
            if (!string.IsNullOrEmpty(search))
            {
                query = query.Where(c =>
                    c.Name.Contains(search) ||
                    c.Email.Contains(search) ||
                    c.Phone.Contains(search) ||
                    c.Notes.Contains(search)
                );
            }

            // 🏷️ Tag filtering (checks if the tag exists in the contact's tags list)
            if (!string.IsNullOrEmpty(tag))
            {
                query = query.Where(c =>
                    (tag == "favorites" && c.Tags[0]) ||
                    (tag == "family" && c.Tags[1]) ||
                    (tag == "friends" && c.Tags[2]) ||
                    (tag == "work" && c.Tags[3]) ||
                    (tag == "academia" && c.Tags[4])
                );
            }

            // 🔠 Sorting
            query = sort.ToLower() switch
            {
                "email" => descending ? query.OrderByDescending(c => c.Email) : query.OrderBy(c => c.Email),
                "birthday" => descending ? query.OrderByDescending(c => c.Birthday) : query.OrderBy(c => c.Birthday),
                _ => descending ? query.OrderByDescending(c => c.Name) : query.OrderBy(c => c.Name)
            };

            // 📃 Pagination
            var totalItems = query.Count();
            var totalPages = (int)Math.Ceiling(totalItems / (double)pageSize);

            var contacts = query
                .Skip((page - 1) * pageSize)
                .Take(pageSize)
                .ToList();

            var result = new
            {
                Page = page,
                PageSize = pageSize,
                TotalItems = totalItems,
                TotalPages = totalPages,
                Data = contacts
            };

            return Ok(result);
        }


        [HttpPost]
        public ActionResult AddContact(Contact newContact)
        {
            
            if (newContact == null)
            {
                return BadRequest("Contact cannot be null.");
            }
            Console.WriteLine(newContact.ToString());
            _context.Contacts.Add(newContact);
            _context.SaveChanges();

            return CreatedAtAction(nameof(GetContactById), new { id = newContact.Id }, newContact);
        }




        [HttpPut("{id}")]
        public ActionResult UpdateContact(int id, [FromBody] Contact updatedContact)
        {
            var contact = _context.Contacts.FirstOrDefault(c => c.Id == id);
            if (contact == null)
            {
                return NotFound($"Contact with ID '{id}' not found.");
            }

            contact.Name = updatedContact.Name;
            contact.Email = updatedContact.Email;
            contact.Phone = updatedContact.Phone;
            contact.Socials = updatedContact.Socials;
            contact.Birthday = updatedContact.Birthday;
            contact.Notes = updatedContact.Notes;
            contact.Yuu = updatedContact.Yuu;
            contact.Tags = updatedContact.Tags;

            _context.Contacts.Update(contact);
            _context.SaveChanges();

            return NoContent();
        }

        [HttpDelete("{id}")]
        public ActionResult DeleteContact(int id)
        {
            var contact = _context.Contacts.FirstOrDefault(c => c.Id == id);
            if (contact == null)
            {
                return NotFound($"Contact with ID '{id}' not found.");
            }

            _context.Contacts.Remove(contact);
            _context.SaveChanges();

            return NoContent();
        }

        [HttpGet("ping")]
        public IActionResult Ping()
        {
            return Ok("pong");
        }
    }
}
