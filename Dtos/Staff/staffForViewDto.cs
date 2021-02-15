using facerecognitionapi.Models;
using faceRecognitionAPI.Dtos.Student;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace faceRecognitionAPI.Dtos.Staff
{
    public class staffForViewDto
    {
        public int id { get; set; }
        public string username { get; set; }
        public string name { get; set; }
        public string surname { get; set; }
        public ICollection<StudentsForAttendanceHistoryViewDto> students { get; set; }

    }
}
