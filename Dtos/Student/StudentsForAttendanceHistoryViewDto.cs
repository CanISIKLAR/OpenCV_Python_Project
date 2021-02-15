using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace faceRecognitionAPI.Dtos.Student
{
    public class StudentsForAttendanceHistoryViewDto
    {
        public int id { get; set; }
        public string name { get; set; }
        public string surname { get; set; }
        public string studentNumber { get; set; }
        public bool confirmed { get; set; }
    }
}
