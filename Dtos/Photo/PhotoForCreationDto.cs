using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace faceRecognitionAPI.Dtos
{
    public class PhotoForCreationDto
    {
        public string url { get; set; }
        public IFormFile File { get; set; }
        public string description { get; set; }
        public DateTime dateAdded { get; set; }
        public string publicId { get; set; }

        public PhotoForCreationDto()
        {
            dateAdded = DateTime.Now;
        }
    }
}
