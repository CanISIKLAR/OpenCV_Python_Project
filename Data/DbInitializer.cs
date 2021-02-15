using facerecognitionapi.Data;
using facerecognitionapi.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace faceRecognitionAPI.Data
{
    public class DbInitializer
    {
        //private DataContext _repo;

        //public DbInitializer(DataContext context)
        //{
        //    _repo = context;
        //}

        public static void SeedData(DataContext context)
        {


            if(!context.staffs.Any(x=>x.username == "admin"))
            {
                Register(context);
            }

        }

        public static  void Register(DataContext _repo)
        {
            var user = new Staff
            {
                username = "admin",
                name = "Admin",
                surname = "Admin",
                role = "Admin"
            };
            byte[] passwordHash, passwordSalt;
            var password = "Admin";
            CreatePasswordHash(password, out passwordHash, out passwordSalt);

            user.passwordHash = passwordHash;
            user.passwordSalt = passwordSalt;

            _repo.staffs.Add(user);

            _repo.SaveChanges();

            return ;
        }

        private static void CreatePasswordHash(string password, out byte[] passwordHash, out byte[] passwordSalt)
        {
            using (var hmac = new System.Security.Cryptography.HMACSHA512())
            {
                passwordSalt = hmac.Key;
                passwordHash = hmac.ComputeHash(System.Text.Encoding.UTF8.GetBytes(password));
            }

        }


    }
}
