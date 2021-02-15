using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using AutoMapper.Configuration;
using facerecognitionapi.Models;
using faceRecognitionAPI.Data.Interfaces;
using faceRecognitionAPI.Dtos;
using faceRecognitionAPI.Dtos.Class;
using faceRecognitionAPI.Dtos.Schedule;
using Microsoft.AspNetCore.Mvc;

namespace faceRecognitionAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ClassController : ControllerBase
    {
        private readonly IClassRepo _repo;
        private readonly IMapper _mapper;

        public ClassController(IClassRepo repo, IMapper mapper)
        {
            _repo = repo;
            _mapper = mapper;
        }


        [HttpGet]
        public async Task<IActionResult> GetClasses()
        {
            var classes = await _repo.GetClasses();

            var classesToReturn = _mapper.Map<IEnumerable<ClassForReturnDto>>(classes);

            return Ok(classesToReturn);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetClassById(int id)
        {
            var classes = await _repo.GetClassById(id);

            var classesToReturn = _mapper.Map<IEnumerable<ClassForReturnDto>>(classes);

            return Ok(classesToReturn);
        }

        [HttpGet("courseCode/{courseCode}")]
        public async Task<IActionResult> GetClassByCourseCode(string courseCode)
        {
            var classes = await _repo.GetClassBycourseCode(courseCode);

            var classesToReturn = _mapper.Map<IEnumerable<ClassForReturnDto>>(classes);

            return Ok(classesToReturn);
        }


        [HttpGet("{courseId}/Students")]
        public async Task<IActionResult> GetAllStudentsByCourseId(int courseId)
        {
            var students = await _repo.GetAllStudentsForClass(courseId);

            var studentsToReturn = _mapper.Map<IEnumerable<StudentsForListDto>>(students);

            return Ok(studentsToReturn);
        }


        [HttpPost()]
        public async Task<IActionResult> AddClass(ClassForCreation cla)
        {
            if (cla == null)
            {
                return BadRequest();
            }
            var classToAdd = _mapper.Map<Class>(cla);

            var users = await _repo.AddClass(classToAdd);

            //var usersToReturn = _mapper.Map<ClassForDetailDto>(users);
            //return Ok(usersToReturn);

            return Ok(users);
        }


        [HttpPut("{classId}")]
        public async Task<IActionResult> EditClass(int classId, [FromBody] ClassForUpdateDto cla)
        {

            if (cla == null)
            {
                return BadRequest();
            }

            var ClassToUpdate = await _repo.GetClassById(classId);

            _mapper.Map(cla, ClassToUpdate);

            //busToUpdate.PlateNumber = bus.PlateNumber;

            var result = await _repo.UpdateClass(ClassToUpdate);

            if (result != true)
            {
                return BadRequest();
            }

            return Ok();
        }

        [HttpPut("{classId}/Add/{StudentId}")]
        public async Task<IActionResult> AddStudentToClass(int classId, int StudentId)
        {


            var users = await _repo.AddStudentToClass(classId, StudentId);

            return Ok(users);
        }


        [HttpPut("{classId}/Remove/{StudentId}")]
        public async Task<IActionResult> RemoveStudentFromClass(int classId, int StudentId)
        {

            var users = await _repo.RemoveStudentFromClass(classId, StudentId);

            return Ok(users);
        }


        [HttpGet("Schedule/{classId}")]
        public async Task<IActionResult> GetSchedulesByClassId(int classId)
        {
            if (classId == 0)
            {
                return BadRequest();
            }

            try
            {
                var schedules = await _repo.getSchedulesForClass(classId);
                var schedulesToReturn = _mapper.Map<IEnumerable<ScheduleForDetailDto>>(schedules);

                return Ok(schedulesToReturn);
            }
            catch (Exception ex)
            {
                return Ok();
            }

            
        }



        [HttpPost("Schedule")]
        public async Task<IActionResult> AddScheduleToClass(ScheduleForCreation schedule)
        {
            if (schedule == null)
            {
                return BadRequest();
            }
            var scheduleToAdd = _mapper.Map<Schedule>(schedule);

            var result = await _repo.AddAttendanceSchedule(scheduleToAdd);

            //var usersToReturn = _mapper.Map<ClassForDetailDto>(users);
            //return Ok(usersToReturn);

            return Ok(result);
        }

        [HttpPut("Schedule/{scheduleId}")]
        public async Task<IActionResult> EditSchedule(int scheduleId, [FromBody] ScheduleForUpdate scheule)
        {

            if (scheule == null)
            {
                return BadRequest();
            }

            var scheuleToUpdate = await _repo.GetScheuleById(scheduleId);

            _mapper.Map(scheule, scheuleToUpdate);

            //busToUpdate.PlateNumber = bus.PlateNumber;

            var result = await _repo.UpdateSchdule(scheuleToUpdate);

            if (result != true)
            {
                return BadRequest();
            }

            return Ok();
        }



    }
}