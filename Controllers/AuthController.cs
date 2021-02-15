using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;
using AutoMapper;
using facerecognitionapi.Models;
using faceRecognitionAPI.Data;
using faceRecognitionAPI.Dtos;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;

namespace faceRecognitionAPI.Controllers
{
    //[Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        private readonly IAuthRepository _repo;
        private readonly IMapper _mapper;
        private readonly IConfiguration _config;

        public AuthController(IAuthRepository repo
            , IConfiguration config
            , IMapper mapper
            )
        {
            _config = config;
            _repo = repo;
            _mapper = mapper;
        }

        [Authorize(Roles = "Admin")]
        [HttpPost("register")]
        public async Task<IActionResult> Register(staffForRegisterDto userForRegisterDto)
        {
             if(!ModelState.IsValid)
             return BadRequest(ModelState);

            userForRegisterDto.username = userForRegisterDto.username.ToLower();

            if (await _repo.UserExists(userForRegisterDto.username))
                return BadRequest("Username already exists");

            var userToCreate = _mapper.Map<Staff>(userForRegisterDto);
            //var userToCreate = new Staff
            //{
            //    Name = "Admin",
            //    Surename ="Admin",
            //    Username = userForRegisterDto.Username,
            //    Role = "Admin"
            //};

            var createdUser = await _repo.Register(userToCreate, userForRegisterDto.password);

            //var userToReturn = _mapper.Map<UserForDetailedDto>(createdUser);

            //return CreatedAtRoute("GetUser", new { Controller = "Users", id = createdUser.Id }, userToReturn);
            return Ok();
        }

        [AllowAnonymous]
        [HttpPost("login")]
        public async Task<IActionResult> Login(staffForLoginDto userForLoginDto)
        {
            //throw new Exception("Computer says no!");

            var userFromRepo = await _repo.Login(userForLoginDto.username, userForLoginDto.password);

            if (userFromRepo == null)
                //return Unauthorized();
                return Ok();

            var claims = new[]
            {
                new Claim(ClaimTypes.NameIdentifier, userFromRepo.id.ToString()),
                new Claim(ClaimTypes.Name, userFromRepo.username),
                new Claim(ClaimTypes.Role, userFromRepo.role)
            };

            var key = new SymmetricSecurityKey(Encoding.UTF8
                .GetBytes(_config.GetSection("AppSettings:Token").Value));

            var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha512Signature);

            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(claims),
                Expires = DateTime.Now.AddYears(1),// .AddDays(1),
                SigningCredentials = creds
            };

            var tokenHandler = new JwtSecurityTokenHandler();

            var token = tokenHandler.CreateToken(tokenDescriptor);

            //var user = _mapper.Map<UserForListDto>(userFromRepo);

            return Ok(new
            {
                token = tokenHandler.WriteToken(token)
                //,user
            });
        }

    }
}