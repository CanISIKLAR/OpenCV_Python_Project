using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace faceRecognitionAPI.Dtos.Student
{
    public class StudentForUpdateDto
    {
        public string name { get; set; }
        public string surname { get; set; }
        public string studentNumber { get; set; }
        public int? advisorId { get; set; }
        public bool isDeleted { get; set; }
    }
}
