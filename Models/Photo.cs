using System;
using facerecognitionapi.Models;

namespace faceRecognitionAPI.Models
{
    public class Photo
    {
        public int id { get; set; }
        public string url { get; set; }
        public string description { get; set; }
        public DateTime dateAdded { get; set; }
        public bool isMain { get; set; }
        public string publicId { get; set; }
        public Students students { get; set; }
        public int studentsId { get; set; }
    }
}