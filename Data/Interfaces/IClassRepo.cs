using facerecognitionapi.Models;
using faceRecognitionAPI.Dtos;
using faceRecognitionAPI.Dtos.Class;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace faceRecognitionAPI.Data.Interfaces
{
    public interface IClassRepo
    {
        Task<bool> AddClass(Class cla);
        Task<Class> GetClassById(int id);
        Task<Class> GetClassBycourseCode(string courseCode);
        Task<IEnumerable<Class>> GetClasses();
        Task<bool> UpdateClass(Class cla);
        //Task<IEnumerable<Students>> GetAllStudentsForClass(int id);
        //Task<IEnumerable<Students>> GetAllConfirmedStudentsForClass(int id);
        Task<IEnumerable<Students>> GetAllStudentsForClass(int id);
        Task<bool> AddStudentToClass(int cla, int std);
        Task<bool> RemoveStudentFromClass(int cla, int std);
        Task<bool> DeleteClass(int id);
        Task<bool> AddAttendanceSchedule(Schedule schedule);
        Task<Schedule> GetScheuleById(int scheduleId);
        Task<bool> UpdateSchdule(Schedule sch);
        Task<IEnumerable<Schedule>> getSchedulesForClass(int classId);
    }
}
