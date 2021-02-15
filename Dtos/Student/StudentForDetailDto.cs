using facerecognitionapi.Models;
using faceRecognitionAPI.Dtos.Class;
using faceRecognitionAPI.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace faceRecognitionAPI.Dtos
{
    public class StudentForDetailDto
    {
        public int id { get; set; }
        public string name { get; set; }
        public string code { get; set; }
        public string surname { get; set; }
        public string studentNumber { get; set; }
        public bool confirmed { get; set; } 
        public string photoUrl { get; set; }
        public int advisorId { get; set; }
        public facerecognitionapi.Models.Staff advisor { get; set; }
        public ICollection<PhotosForDetailedDto> photos { get; set; }
        public ICollection<faceRecognitionAPI.Models.StudentAttendance> attendance { get; set; }
        public ICollection<ClassForStudentDetailDto> classes { get; set; }
    }
}
