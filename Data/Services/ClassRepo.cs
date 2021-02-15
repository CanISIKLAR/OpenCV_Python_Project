using facerecognitionapi.Data;
using facerecognitionapi.Models;
using faceRecognitionAPI.Data.Interfaces;
using faceRecognitionAPI.Dtos.Class;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace faceRecognitionAPI.Data.Services
{
    public class ClassRepo : IClassRepo
    {

        private readonly DataContext _context;
        public ClassRepo(DataContext context)
        {
            _context = context;
        }

        public async Task<bool> AddClass(Class cla)
        {
            await _context.classes.AddAsync(cla);
            return await Save();
        }



        //public Task<IEnumerable<Students>> GetAllConfirmedStudentsForClass(int id)
        //{
        //    throw new NotImplementedException();
        //}

        public async Task<IEnumerable<Students>> GetAllStudentsForClass(int id)
        {
            return await _context.students.Where(x=>!x.isDeleted).Include(x=> x.classes).Where(x => x.classes.Any(y=>y.id==id)).Include(x => x.photos).ToListAsync();
        }

        public async Task<Class> GetClassBycourseCode(string courseCode)
        {
            //return await _context.classes.FirstOrDefault(x => x.courseCode == courseCode).Include(x => x.students);
            return await _context.classes.Where(x=> !x.isDeleted).Include(x => x.students.Where(y=> !y.isDeleted)).FirstOrDefaultAsync(x => x.courseCode == courseCode);

        }

        public async Task<Class> GetClassById(int id)
        {
            return await _context.classes.Where(x => !x.isDeleted).Include(x => x.students.Where(y => !y.isDeleted)).FirstOrDefaultAsync(x => x.id == id);

        }

        public async Task<IEnumerable<Class>> GetClasses()
        {
            //return await _context.classes.ToListAsync();
            return await _context.classes.Where(x => !x.isDeleted)
                .Include(x => x.students.Where(y => !y.isDeleted))
                .ToListAsync();
        }

      

        public async Task<bool> UpdateClass(Class cla)
        {
            //_context.classes.Update(cla);
            return await Save();
        }

        public async Task<bool> AddStudentToClass(int cla, int std)
        {
            var student = await _context.students.Include(x=>x.classes).FirstOrDefaultAsync(x => x.id == std);
            var cl = await _context.classes.FirstOrDefaultAsync(x => x.id == cla);
            student.classes.Add(cl);
            return await Save();
        }

        public async Task<bool> RemoveStudentFromClass(int cla, int std)
        {
            var student = await _context.students.Include(x => x.classes).FirstOrDefaultAsync(x => x.id == std);
            var cl = await _context.classes.FirstOrDefaultAsync(x => x.id == cla);
            student.classes.Remove(cl);
            return await Save();
        }



        public async Task<bool> AddAttendanceSchedule(Schedule schedule)
        {
            schedule.date = DateTime.Now;
            await _context.schedules.AddAsync(schedule);
            return await Save();
        }
        public async Task<Schedule> GetScheuleById(int scheduleId)
        {
            return await _context.schedules.FirstOrDefaultAsync(x=> x.id == scheduleId);
        }
        public async Task<bool> UpdateSchdule(Schedule sch)
        {
            _context.schedules.Update(sch);
            return await Save();
        }


        public async Task<IEnumerable<Schedule>> getSchedulesForClass(int classId)
        {
            // no need to remove the deleted users from here 
            // since the schedule represents history --> the students attended that class when the schedule was taken
            return await _context.schedules
                //.Include(x => x.attendance.Select(y => y.students))
                .Include(x=> x.Class)
                .Include(x => x.attendance)
                .Include("attendance.students")
                .Where(x => x.classId == classId)
                .OrderByDescending(x=> x.date)
                .ToListAsync();
        }







        public Task<bool> DeleteClass(int id)
        {
            throw new NotImplementedException();
        }

        private async Task<bool> Save()
        {
            try
            {
                return await _context.SaveChangesAsync() > 0;
            }
            catch (Exception ex)
            {

                return false;
            }
        }

      
    }
}
