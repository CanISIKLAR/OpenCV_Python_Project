using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace faceRecognitionAPI.Dtos.Student
{
    public class StudentForClassDto
    {
        public int id { get; set; }
        public string name { get; set; }
        public string code { get; set; }
        public string surname { get; set; }
        public string studentNumber { get; set; }
        public bool confirmed { get; set; }
        public bool isDeleted { get; set; }
        public ICollection<PhotosForDetailedDto> photos { get; set; }
    }
}
