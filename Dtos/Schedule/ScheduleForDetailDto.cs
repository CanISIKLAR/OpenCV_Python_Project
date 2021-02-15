using faceRecognitionAPI.Dtos.StudentAttendance;
using faceRecognitionAPI.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace faceRecognitionAPI.Dtos.Schedule
{
    public class ScheduleForDetailDto
    {
        public int id { get; set; }
        public int classId { get; set; }
        public string courseCode { get; set; }
        public string courseName { get; set; }
        public DateTime date { get; set; }
        public int staffId { get; set; }
        public ICollection<StudentAttendanceForViewDto> attendance { get; set; }
        public bool isDeleted { get; set; }
    }
}
