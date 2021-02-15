using facerecognitionapi.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace faceRecognitionAPI.Models
{
    public class StudentAttendance
    {
        public int id { get; set; }
        public Students students { get; set; }
        public int studentsId { get; set; }
        public Schedule schedule { get; set; }
        public int scheduleId { get; set; }
        public bool attended { get; set; }
        public bool isDeleted { get; set; }


    }
}
