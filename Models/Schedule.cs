using faceRecognitionAPI.Models;
using System;
using System.Collections.Generic;

namespace facerecognitionapi.Models
{
    public class Schedule
    {
        public int id { get; set; }
        public int classId { get; set; }
        public Class Class { get; set; }
        public DateTime date { get; set; }
        public int staffId { get; set; }
        public ICollection<StudentAttendance> attendance { get; set; }
        public bool isDeleted { get; set; }


        //list of new model that contains [stdId, attendaceCase]
    }
}