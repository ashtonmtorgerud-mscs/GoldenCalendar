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
