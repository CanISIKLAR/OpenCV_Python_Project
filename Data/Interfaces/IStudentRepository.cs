using facerecognitionapi.Models;
using faceRecognitionAPI.Models;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace faceRecognitionAPI.Data
{
    public interface IStudentRepository
    {
        void Add<T>(T entity) where T : class;
        void Delete<T>(T entity) where T : class;
        Task<bool> SaveAll();
        Task<IEnumerable<Students>> GetUsers(int advisorId = 0);
        Task<IEnumerable<Students>> GetConfirmedUsers();
        Task<IEnumerable<Students>> GetNotConfirmedUsers();
        Task<IEnumerable<StudentAttendance>> GetAttendanceForStudent(int studentId);
        Task<Students> GetUser(int id);
        Task<Students> GetUserByStdNum(string id);
        Task<Photo> GetPhoto(int id);
        Task<Photo> GetMainPhotoForUser(int userId);
        Task<bool> StudentNumberExists(string std);
        Task<Students> addNewStudent(Students student);
        Task<Class> getClassById(int id);
    }
}

