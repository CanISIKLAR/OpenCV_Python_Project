using System.Collections.Generic;
using faceRecognitionAPI.Models;

namespace facerecognitionapi.Models
{
    public class Students
    {
        public int id { get; set; }
        public string name { get; set; }
        public string code { get; set; }
        public int? advisorId { get; set; }
        public string surname { get; set; }
        public string studentNumber { get; set; }
        public bool confirmed { get; set; }
        public bool isDeleted { get; set; }
        public Staff advisor { get; set; }
        public ICollection<Photo> photos { get; set; }
        public ICollection<StudentAttendance> attendance { get; set; }
        public ICollection<Class> classes { get; set; }
    }
}