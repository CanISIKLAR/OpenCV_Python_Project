using facerecognitionapi.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace faceRecognitionAPI.Dtos.StudentAttendance
{
    public class StudentAttendanceForViewDto
    {
        public int id { get; set; }
        public int studentsId { get; set; }
        public int scheduleId { get; set; }
        //public Students students { get; set; }
        public string studentName { get; set; }
        public string studentSurname { get; set; }
        public string studentNumber { get; set; }
        public string courseName { get; set; }
        public string courseCode { get; set; }
        public DateTime Date { get; set; }
        public bool attended { get; set; }
        public bool isDeleted { get; set; }
    }
}
