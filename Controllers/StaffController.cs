using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using facerecognitionapi.Models;
using faceRecognitionAPI.Data.Interfaces;
using faceRecognitionAPI.Dtos.Staff;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace faceRecognitionAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class StaffController : ControllerBase
    {
        private readonly IStaffRepo _repo;
        private readonly IMapper _mapper;

        public StaffController(IStaffRepo repo
            , IMapper mapper
            )
        {
            _repo = repo;
            _mapper = mapper;
        }

        [HttpGet("")]
        public async Task<IActionResult> GetAllStaff()
        {

            var staffs = await _repo.GetAllStaff();
            var staffToReturn = _mapper.Map<ICollection<staffForViewDto>>(staffs);

            return Ok(staffToReturn);
        }

        [HttpGet("{staffId}")]
        public async Task<IActionResult> GetStaffById(int staffId)
        {

            var staff = await _repo.GetStaffById(staffId);

            return Ok(staff);
        }


        [HttpPut("{staffId}")]
        public async Task<IActionResult> updateStaff(int staffId, staffForUpdateDto staff)
        {

            var staffForUpdate = await _repo.GetStaffById(staffId);

            _mapper.Map(staff, staffForUpdate);

            var result = await _repo.UpdateStaff(staffForUpdate);

            if (!result)
            {
                return BadRequest();
            }

            return Ok();
        }

        [Authorize(Roles = "Admin")]
        [HttpPut("password/{staffId}")]
        public async Task<IActionResult> UpdatePassword(int staffId , newPasswordDto password )
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var staff = await _repo.GetStaffById(staffId);
            if(staff == null)
            {
                return NotFound();
            }


            var result = _repo.updateUserPassword(staffId, password.password);


            return Ok();
        }



    }
}