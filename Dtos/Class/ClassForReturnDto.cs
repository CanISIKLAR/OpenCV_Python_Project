using faceRecognitionAPI.Dtos.Student;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace faceRecognitionAPI.Dtos.Class
{
    public class ClassForReturnDto
    {
        public int id { get; set; }
        public string courseName { get; set; }
        public string courseCode { get; set; }
        public int staffId { get; set; }
        public ICollection<StudentForClassDto> students { get; set; }
        public bool isDeleted { get; set; }
    }
}
