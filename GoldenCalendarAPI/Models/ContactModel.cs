using System;
using System.Collections.Generic;

namespace GoldenCalendarAPI.Models
{
    public class Social
    {

        public Social(){}
        public int Id { get; set; }
        public string Platform { get; set; }
        public string Handle { get; set; }
        public string Link { get; set; }

        public Social(string platform, string handle, string link)
        {
            Platform = platform;
            Handle = handle;
            Link = link;
        }
    }

    public class Yuu
    {
        public int Id { get; set; }
        public string SelectedHead { get; set; }
        public string SelectedEyes { get; set; }
        public string SelectedMouth { get; set; }
        public string SelectedHair { get; set; }
        public string SelectedBackHair { get; set; }
        public string SelectedBeard { get; set; }
        public string SelectedNose { get; set; }
        public string SelectedGlasses { get; set; }
        public List<int> Hue { get; set; }
        public List<int> Brightness { get; set; }
        public List<int> Saturation { get; set; }
        public List<int> XOffset { get; set; }
        public List<int> YOffset { get; set; }
        public List<int> XScale { get; set; }
        public List<int> YScale { get; set; }

        public Yuu(
            string selectedHead, string selectedEyes, string selectedMouth, string selectedHair, string selectedBackHair,
            string selectedBeard, string selectedNose, string selectedGlasses,
            List<int> hue, List<int> brightness, List<int> saturation,
            List<int> xOffset, List<int> yOffset, List<int> xScale, List<int> yScale)
        {
            SelectedHead = selectedHead;
            SelectedEyes = selectedEyes;
            SelectedMouth = selectedMouth;
            SelectedHair = selectedHair;
            SelectedBackHair = selectedBackHair;
            SelectedBeard = selectedBeard;
            SelectedNose = selectedNose;
            SelectedGlasses = selectedGlasses;
            Hue = hue;
            Brightness = brightness;
            Saturation = saturation;
            XOffset = xOffset;
            YOffset = yOffset;
            XScale = xScale;
            YScale = yScale;
        }
    }

    public class Contact
    {
        public Contact() {}

        public int Id { get; set; }  // Primary Key
        public string Name { get; set; }
        public string Notes { get; set; }
        public string Phone { get; set; }
        public string Email { get; set; }
        public string Address { get; set; }
        public List<Social> Socials { get; set; }
        public bool[] Tags { get; set; }
        public DateTime Birthday { get; set; }
        public Yuu Yuu { get; set; }

        public Contact(
            string name, string notes, string phone, string email, string address, bool[] tags, DateTime birthday, Yuu yuu)
        {
            Name = name;
            Notes = notes;
            Phone = phone;
            Email = email;
            Address = address;
            Tags = tags;
            Birthday = birthday;
            Yuu = yuu;
            Socials = new List<Social>();
        }
    }
}