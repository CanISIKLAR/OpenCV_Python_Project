using System.Collections.Generic;

namespace facerecognitionapi.Models
{
    public class Staff
    {
        public int id { get; set; }
        public string username { get; set; }
        public string name { get; set; }
        public string surname { get; set; }
        public string role { get; set; }
        //public string Password { get; set; }
        public byte[] passwordHash { get; set; }
        public byte[] passwordSalt { get; set; }
        public bool isDeleted { get; set; }
        public ICollection<Students> students { get; set; }


    }
}