using facerecognitionapi.Models;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace faceRecognitionAPI.Data.Interfaces
{
    public interface IStaffRepo
    {
        Task<IEnumerable<Staff>> GetAllStaff();
        Task<Staff> GetStaffById(int id);
        Task<bool> UpdateStaff(Staff cla);
        Task<bool> updateUserPassword(int staffId,  string password);
    }
}