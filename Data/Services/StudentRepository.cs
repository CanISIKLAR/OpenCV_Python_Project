using facerecognitionapi.Data;
using facerecognitionapi.Models;
using faceRecognitionAPI.Models;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace faceRecognitionAPI.Data
{
    class StudentRepository : IStudentRepository
    {
        private readonly DataContext _context;
        public StudentRepository(DataContext context)
        {
            _context = context;
        }
        public void Add<T>(T entity) where T : class
        {
            _context.Add(entity);
        }

        public void Delete<T>(T entity) where T : class
        {
            _context.Remove(entity);
        }

        public async Task<Photo> GetMainPhotoForUser(int userId)
        {
            return await _context.Photos.Where(u => u.studentsId == userId).FirstOrDefaultAsync(p => p.isMain == true);
        }

        public async Task<Photo> GetPhoto(int id)
        {
            var photo = await _context.Photos.FirstOrDefaultAsync(p => p.id == id);

            return photo;
        }

        public async Task<Students> GetUser(int id)
        {
            var user = await _context.students.Where(x => !x.isDeleted)
                .Include(p => p.photos)
                .Include(x => x.classes.Where(x => !x.isDeleted))
                .Include(x => x.attendance)
                .FirstOrDefaultAsync(u => u.id == id);

            return user;
        }


        public async Task<Students> GetUserByStdNum(string id)
        {
            var user = await _context.students.Where(x => !x.isDeleted)
                .Include(p => p.photos)
                .Include(x => x.classes.Where(x => !x.isDeleted))
                .Include(x => x.attendance)
                .FirstOrDefaultAsync(u => u.studentNumber == id);

            return user;
        }

        public async Task<IEnumerable<Students>> GetUsers(int advisorId = 0)
        {
            if(advisorId == 0)
            {
                var users = await _context.students.Where(x => !x.isDeleted)
               .Include(p => p.photos)
               .Include(x => x.classes.Where(x => !x.isDeleted))
               .Include(x => x.attendance)
               .ToListAsync();
                return users;
            }
            else
            {
                var users = await _context.students.Where(x => !x.isDeleted && x.advisorId == advisorId)
               .Include(p => p.photos)
               .Include(x => x.classes.Where(x => !x.isDeleted))
               .Include(x => x.attendance)
               .ToListAsync();
                return users;
            }
           
        }

        public async Task<IEnumerable<StudentAttendance>> GetAttendanceForStudent(int studentId)
        {
            //represent old data so no need to remove the deleted classes
            return await _context.studentAttendances.Include(x=>x.students)
                .Where(x => x.students.id == studentId)
                .Include(x => x.schedule)
                .Include("schedule.Class")
                .ToListAsync();
            
        }

        public async Task<IEnumerable<Students>> GetConfirmedUsers()
        {
            var users = await _context.students.Where(x => x.confirmed && !x.isDeleted).Include(p => p.photos)
                .Include(x => x.classes.Where(x => !x.isDeleted)).Include(x => x.attendance).ToListAsync();
            return users;
        }
        public async Task<IEnumerable<Students>> GetNotConfirmedUsers()
        {
            var users = await _context.students.Where(x => !x.confirmed && !x.isDeleted).Include(p => p.photos)
                .Include(x => x.classes.Where(x => !x.isDeleted)).Include(x => x.attendance).ToListAsync();
            return users;
        }

        public async Task<bool> StudentNumberExists(string std)
        {
            // can consider removing the !x.isDeleted from here ===> 
            //then won't be able to make 2 users with same std# even if the old one is deleted 
            if (await _context.students.AnyAsync(x => x.studentNumber == std && !x.isDeleted))
                return true;

            return false;
        }

        public async Task<Students> addNewStudent(Students student)
        {
            
            await _context.students.AddAsync(student);

            await _context.SaveChangesAsync();

            return student;
        }

        public async Task<Class> getClassById(int id)
        {
            return await _context.classes.FirstOrDefaultAsync(x => x.id == id);
        }

        public async Task<bool> SaveAll()
        {
            return await _context.SaveChangesAsync() > 0;
        }

        
    }
}
