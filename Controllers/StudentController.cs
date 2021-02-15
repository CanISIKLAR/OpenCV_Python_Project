using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using AutoMapper;
using facerecognitionapi.Models;
using faceRecognitionAPI.Data;
using faceRecognitionAPI.Dtos;
using faceRecognitionAPI.Dtos.Student;
using faceRecognitionAPI.Dtos.StudentAttendance;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;

namespace faceRecognitionAPI.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class StudentController : ControllerBase
    {
        private readonly IStudentRepository _repo;
        private readonly IMapper _mapper;
        private readonly IConfiguration _config;

        public StudentController(IStudentRepository repo, IConfiguration config, IMapper mapper)
        {
            _config = config;
            _repo = repo;
            _mapper = mapper;
        }
       


        [HttpGet]
        public async Task<IActionResult> GetStudents()
        {
            var role = User.FindFirst(ClaimTypes.Role).Value;
           var staffId = int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value);
            
            if(role == "Admin")
            {
                var users = await _repo.GetUsers();

                var usersToReturn = _mapper.Map<IEnumerable<StudentsForListDto>>(users);

                return Ok(usersToReturn);
            }
            else
            {
                var users = await _repo.GetUsers(staffId);

                var usersToReturn = _mapper.Map<IEnumerable<StudentsForListDto>>(users);

                return Ok(usersToReturn);
            }
            
        }

        [HttpGet("confirmed")]
        public async Task<IActionResult> GetConfirmedStudents()
        {
            var users = await _repo.GetConfirmedUsers();

            var usersToReturn = _mapper.Map<IEnumerable<StudentsForListDto>>(users);

            return Ok(usersToReturn);
        }

        [HttpGet("notConfirmed")]
        public async Task<IActionResult> GetNotConfirmedStudents()
        {
            var users = await _repo.GetConfirmedUsers();

            var usersToReturn = _mapper.Map<IEnumerable<StudentsForListDto>>(users);

            return Ok(usersToReturn);
        }

        [HttpGet("{studentId}/attendance")]
        public async Task<IActionResult> GetattendanceByStudentId(int studentId)
        {
            var attendance = await _repo.GetAttendanceForStudent(studentId);

            var attendanceToReturn = _mapper.Map<IEnumerable<StudentAttendanceForViewDto>>(attendance);

            return Ok(attendanceToReturn);
        }

        [HttpGet("{id}", Name = "GetUser")]
        public async Task<IActionResult> GetById(int id)
        {
            var user = await _repo.GetUser(id);

            var userToReturn = _mapper.Map<StudentsForListDto>(user);

            return Ok(userToReturn);
        }


        [AllowAnonymous]
        [HttpGet("stdNumber/{id}")]
        public async Task<IActionResult> GetByStudentNumber(string id)
        {
            var user = await _repo.GetUserByStdNum(id);

            var userToReturn = _mapper.Map<StudentsForListDto>(user);

            return Ok(userToReturn);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> Update(int id, StudentForUpdateDto userForUpdateDto)
        {
            //if (id != int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value))
            //    return Unauthorized();

            var userFromRepo = await _repo.GetUser(id);

            _mapper.Map(userForUpdateDto, userFromRepo);

            if (await _repo.SaveAll())
                return NoContent();

            throw new Exception($"Updating user {id} failed on save");
        }


        [HttpPost()]
        public async Task<IActionResult> Add(StudentForCreationDto userForCreateDto)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            if (await _repo.StudentNumberExists(userForCreateDto.studentNumber))
                return BadRequest("Student Number already exists");

            var studentToCreate = _mapper.Map<Students>(userForCreateDto);

            // generats random string with length 6
            studentToCreate.code = CreateString(6);

            List<Class> classesToAdd = new List<Class>();


            foreach (int id in userForCreateDto.classesIds)
            {
                try
                {
                    var classToAdd = await _repo.getClassById(id);
                    classesToAdd.Add(classToAdd);
                }
                catch(Exception ex)
                {

                }
            }

            if(classesToAdd.Count != 0)
            {
                studentToCreate.classes = classesToAdd;
            }

            var result = await _repo.addNewStudent(studentToCreate);

           
                //var userToReturn = _mapper.Map<UserForDetailedDto>(createdUser);

                //return CreatedAtRoute("GetUser", new { Controller = "Users", id = createdUser.Id }, userToReturn);
                return Ok();
            
        }

        static Random rd = new Random();
        internal static string CreateString(int stringLength)
        {
            //const string allowedChars = "ABCDEFGHJKLMNOPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz0123456789!@$?_-";
            const string allowedChars = "ABCDEFGHJKLMNOPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz0123456789";
            char[] chars = new char[stringLength];

            for (int i = 0; i < stringLength; i++)
            {
                chars[i] = allowedChars[rd.Next(0, allowedChars.Length)];
            }

            return new string(chars);
        }
    }
}