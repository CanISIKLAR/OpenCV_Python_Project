using faceRecognitionAPI.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace faceRecognitionAPI.Dtos.Schedule
{
    public class ScheduleForCreation
    {
        public int classId { get; set; }
        public DateTime date { get; set; }
        public int staffId { get; set; }
        public ICollection<faceRecognitionAPI.Models.StudentAttendance> attendance { get; set; }

    }
}
