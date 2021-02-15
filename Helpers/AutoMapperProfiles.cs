using AutoMapper;
using facerecognitionapi.Models;
using faceRecognitionAPI.Dtos;
using faceRecognitionAPI.Dtos.Class;
using faceRecognitionAPI.Dtos.Schedule;
using faceRecognitionAPI.Dtos.Staff;
using faceRecognitionAPI.Dtos.Student;
using faceRecognitionAPI.Dtos.StudentAttendance;
using faceRecognitionAPI.Models;
using System.Linq;


namespace faceRecognitionAPI.Helpers
{
    public class AutoMapperProfiles : Profile
    {
        public AutoMapperProfiles()
        {
            // Source - destenation

            //student

            CreateMap<Students, StudentsForListDto>()
                .ForMember(dest => dest.photoUrl, opt =>
                    opt.MapFrom(src => src.photos.FirstOrDefault(p => p.isMain).url))
                //.ForMember(dest => dest.Age, opt => opt.MapFrom(src =>
                //src.DateOfBirth.CalculateAge()))
                ;

            CreateMap<Students, StudentForDetailDto>();
            CreateMap<Students, StudentForClassDto>();
            CreateMap<StudentForCreationDto, Students>();
            CreateMap<StudentForUpdateDto, Students>();
            CreateMap<Students, StudentsForAttendanceHistoryViewDto>();
            

            //CreateMap<Students, StudentsForUpdateDto>()
            //    .ForMember(dest => dest.PhotoUrl, opt =>
            //        opt.MapFrom(src => src.Photos.FirstOrDefault(p => p.IsMain).Url))
            //    //.ForMember(dest => dest.Age, opt => opt.MapFrom(src =>
            //    //src.DateOfBirth.CalculateAge()))
            //;




            // photo
            CreateMap<Photo, PhotosForDetailedDto>();
            CreateMap<Photo, PhotoForReturnDto>();
            CreateMap<PhotoForCreationDto, Photo>();

            //staff
            CreateMap<staffForRegisterDto, Staff>();
            CreateMap<staffForUpdateDto, Staff>();
            CreateMap<Staff, staffForViewDto>();


            // class
            CreateMap<Class, ClassForReturnDto>();
            CreateMap<Class, ClassForStudentDetailDto>();
            CreateMap<ClassForCreation, Class>();
            CreateMap<ClassForUpdateDto, Class>();

            //schedule
            CreateMap<Schedule, ScheduleForDetailDto>()
                          .ForMember(dest => dest.courseCode,
                              m => m.MapFrom(src => src.Class.courseCode))
                          .ForMember(dest => dest.courseName,
                              m => m.MapFrom(src => src.Class.courseName));
            CreateMap<ScheduleForCreation, Schedule>();
            CreateMap<ScheduleForUpdate, Schedule>();
            CreateMap<StudentAttendance, StudentAttendanceForViewDto>();

            CreateMap<StudentAttendance, StudentAttendanceForViewDto>()
                          .ForMember(dest => dest.studentName,
                              m => m.MapFrom(src => src.students.name))
                          .ForMember(dest => dest.studentSurname,
                              m => m.MapFrom(src => src.students.surname))
                           .ForMember(dest => dest.studentNumber,
                              m => m.MapFrom(src => src.students.studentNumber))
                           .ForMember(dest => dest.courseName,
                              m => m.MapFrom(src => src.schedule.Class.courseName))
                           .ForMember(dest => dest.courseCode,
                              m => m.MapFrom(src => src.schedule.Class.courseCode))
                           .ForMember(dest => dest.Date,
                              m => m.MapFrom(src => src.schedule.date));

        }

    }
}
