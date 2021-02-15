using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace faceRecognitionAPI.Dtos
{
    public class PhotoForReturnDto
    {
        public int id { get; set; }
        public string url { get; set; }
        public string description { get; set; }
        public DateTime dateAdded { get; set; }
        public bool isMain { get; set; }
        public string publicId { get; set; }
    }
}
