using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace faceRecognitionAPI.Dtos
{
    public class staffForRegisterDto
    {
        [Required]
        public string username { get; set; }
        [Required]
        public string password { get; set; }
        public string name { get; set; }
        public string surname { get; set; }
        public string role { get; set; }
    }
}
