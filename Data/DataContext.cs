using facerecognitionapi.Models;
using faceRecognitionAPI.Models;
using Microsoft.EntityFrameworkCore;

namespace facerecognitionapi.Data
{
    public class DataContext : DbContext
    {
        public DataContext(DbContextOptions<DataContext> options) : base(options)
        {

        }

        public DbSet<Class> classes { get; set; }
        public DbSet<Photo> Photos { get; set; }
        public DbSet<Schedule> schedules { get; set; }
        public DbSet<Staff> staffs  { get; set; }
        public DbSet<StudentAttendance> studentAttendances { get; set; }
        public DbSet<Students> students { get; set; }
    }
}