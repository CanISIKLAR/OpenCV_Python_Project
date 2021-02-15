using facerecognitionapi.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace faceRecognitionAPI.Models
{
    public class StudentClass
    {
        public int classId { get; set; }
        public Class Class { get; set; }
        public int studentId { get; set; }
        public Students student { get; set; }
    }
}
