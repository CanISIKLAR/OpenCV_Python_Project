using System.Collections.Generic;

namespace facerecognitionapi.Models
{
    public class Class
    {
        public int id { get; set; }
        public string courseName { get; set; }
        public string courseCode { get; set; }
        public ICollection<Students> students { get; set; }
        public bool isDeleted { get; set; }


    }
}