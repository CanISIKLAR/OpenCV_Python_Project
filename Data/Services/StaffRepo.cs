using facerecognitionapi.Data;
using facerecognitionapi.Models;
using faceRecognitionAPI.Data.Interfaces;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace faceRecognitionAPI.Data.Services
{
    public class StaffRepo : IStaffRepo
    {
        private readonly DataContext _context;
        public StaffRepo(DataContext context)
        {
            _context = context;
        }

        public async Task<IEnumerable<Staff>> GetAllStaff()
        {
            return await _context.staffs.Where(x => x.role != "Admin" && !x.isDeleted).Include(x=>x.students).ToListAsync();

        }

        public async Task<Staff> GetStaffById(int id)
        {
            return await _context.staffs.Where(x=>!x.isDeleted).Include(x => x.students).FirstOrDefaultAsync(x => x.id == id);
        }

        public async Task<bool> UpdateStaff(Staff cla)
        {
            return await Save();
        }



        public async Task<bool> updateUserPassword(int staffId, string password)
        {
            byte[] passwordHash, passwordSalt;
            CreatePasswordHash(password, out passwordHash, out passwordSalt);

            var user = await GetStaffById(staffId);

            user.passwordHash = passwordHash;
            user.passwordSalt = passwordSalt;

            return await Save();
        }


        private void CreatePasswordHash(string password, out byte[] passwordHash, out byte[] passwordSalt)
        {
            using (var hmac = new System.Security.Cryptography.HMACSHA512())
            {
                passwordSalt = hmac.Key;
                passwordHash = hmac.ComputeHash(System.Text.Encoding.UTF8.GetBytes(password));
            }

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
