using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace faceRecognitionAPI.Dtos.Class
{
    public class ClassForUpdateDto
    {
        public int id { get; set; }
        public string courseName { get; set; }
        public string courseCode { get; set; }
        public bool isDeleted { get; set; }
    }
}
