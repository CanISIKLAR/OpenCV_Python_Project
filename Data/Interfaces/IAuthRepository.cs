using System.Threading.Tasks;
using facerecognitionapi.Models;

namespace faceRecognitionAPI.Data
{
    public interface IAuthRepository
    {
          Task<Staff> Register(Staff user, string password);
         Task<Staff> Login(string username, string password);
         Task<bool> UserExists(string username);
    }
}