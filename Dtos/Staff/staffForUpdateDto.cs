using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace faceRecognitionAPI.Dtos.Staff
{
    public class staffForUpdateDto
    {
        public int id { get; set; }
        public string username { get; set; }
        public string name { get; set; }
        public string surname { get; set; }
        public bool isDeleted { get; set; }
    }
}
