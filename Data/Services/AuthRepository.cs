using System.Threading.Tasks;
using facerecognitionapi.Data;
using facerecognitionapi.Models;
using Microsoft.EntityFrameworkCore;

namespace faceRecognitionAPI.Data
{
    public class AuthRepository : IAuthRepository
    {
         private readonly DataContext _context;
        public AuthRepository(DataContext context)
        {
            _context = context;
        }
         public async Task<Staff> Login(string username, string password)
        {
            username = username.ToLower();
            // var user = await _context.staffs.Include(x=> x.Photos).FirstOrDefaultAsync(x => x.Username == username);
            var user = await _context.staffs.FirstOrDefaultAsync(x => x.username == username);

            if (user == null)
                return null;
            
            if (!VerifyPasswordHash(password, user.passwordHash, user.passwordSalt))
                return null;

            return user;
        }

        private bool VerifyPasswordHash(string password, byte[] passwordHash, byte[] passwordSalt)
        {
            using (var hmac = new System.Security.Cryptography.HMACSHA512(passwordSalt))
            {
                var computedHash = hmac.ComputeHash(System.Text.Encoding.UTF8.GetBytes(password));
                for (int i = 0; i < computedHash.Length; i++)
                {
                    if (computedHash[i] != passwordHash[i]) return false;
                }
                return true;
            }
        }

        public async Task<Staff> Register(Staff user, string password)
        {
            byte[] passwordHash, passwordSalt;
            CreatePasswordHash(password, out passwordHash, out passwordSalt);

            user.passwordHash = passwordHash;
            user.passwordSalt = passwordSalt;

            await _context.staffs.AddAsync(user);

            await _context.SaveChangesAsync();

            return user;
        }

        private void CreatePasswordHash(string password, out byte[] passwordHash, out byte[] passwordSalt)
        {
            using (var hmac = new System.Security.Cryptography.HMACSHA512())
            {
                passwordSalt = hmac.Key;
                passwordHash = hmac.ComputeHash(System.Text.Encoding.UTF8.GetBytes(password));
            }
            
        }

        public async Task<bool> UserExists(string username)
        {
            if (await _context.staffs.AnyAsync(x => x.username == username))
                return true;

            return false;
        }
    }
}