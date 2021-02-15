﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using AutoMapper;
using CloudinaryDotNet;
using CloudinaryDotNet.Actions;
using faceRecognitionAPI.Data;
using faceRecognitionAPI.Dtos;
using faceRecognitionAPI.Helpers;
using faceRecognitionAPI.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;

namespace faceRecognitionAPI.Controllers
{
    //[Authorize]
    [Route("api/student/{userId}/photos")]
    [ApiController]
    public class PhotosControllerBase : ControllerBase
    {
        private readonly IStudentRepository _repo;
        private readonly IMapper _mapper;
        private readonly IOptions<CloudinarySettings> _cloudinaryConfig;
        private Cloudinary _cloudinary;

        public PhotosControllerBase(IStudentRepository repo, IMapper mapper,
        IOptions<CloudinarySettings> cloudinaryConfig)
        {
            _cloudinaryConfig = cloudinaryConfig;
            _mapper = mapper;
            _repo = repo;

            Account acc = new Account(
                _cloudinaryConfig.Value.CloudName,
                _cloudinaryConfig.Value.ApiKey,
                _cloudinaryConfig.Value.ApiSecret
            );

            _cloudinary = new Cloudinary(acc);
        }


        [HttpGet("{id}", Name = "GetPhoto")]
        public async Task<IActionResult> GetPhoto(int id)
        {
            var photoFromRepo = await _repo.GetPhoto(id);

            var photo = _mapper.Map<PhotoForReturnDto>(photoFromRepo);

            return Ok(photo);
        }

        [HttpPost]
        public async Task<IActionResult> AddPhotoForUser(int userId,
        [FromForm] PhotoForCreationDto photoForCreationDto)
        {
            //if (userId != int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value))
            //    return Unauthorized();

            var userFromRepo = await _repo.GetUser(userId);

            var file = photoForCreationDto.File;

            var uploadResult = new ImageUploadResult();

            if (file.Length > 0)
            {
                using (var stream = file.OpenReadStream())
                {
                    var uploadParams = new ImageUploadParams()
                    {
                        File = new FileDescription(file.Name, stream),
                        Transformation = new Transformation()
                            .Width(500).Height(500).Crop("fill").Gravity("face")
                    };

                    uploadResult = _cloudinary.Upload(uploadParams);
                }
            }

            photoForCreationDto.url = uploadResult.Uri.ToString();
            photoForCreationDto.publicId = uploadResult.PublicId;

            var photo = _mapper.Map<Photo>(photoForCreationDto);

            if (!userFromRepo.photos.Any(u => u.isMain))
            {
                photo.isMain = true;
            }

            userFromRepo.photos.Add(photo);
            if (userFromRepo.photos.Count >= 3)
            {
                userFromRepo.confirmed = true;
            }
            else
            {
                userFromRepo.confirmed = false   ;
            }


            if (await _repo.SaveAll())
            {
                if (!userFromRepo.confirmed)
                {
                    var userFromRepo3 = await _repo.GetUser(userId);
                    if (userFromRepo3.photos.Count >= 3)
                    {
                        userFromRepo.confirmed = true;
                        try
                        {
                            await _repo.SaveAll();
                        }
                        catch(Exception ex)
                        {

                        }
                    }
                }
                

                var photoToReturn = _mapper.Map<PhotoForReturnDto>(photo);
                int id = photo.id;
                return CreatedAtRoute("GetPhoto", new { userId = userId, id = photo.id }, photoToReturn);
            }

            return BadRequest("Could not add the photo");
        }

        [HttpPost("{id}/setMain")]
        public async Task<IActionResult> SetMainPhoto(int userId, int id)
        {
            if (userId != int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value))
                return Unauthorized();

            var user = await _repo.GetUser(userId);

            if (!user.photos.Any(p => p.id == id))
                return Unauthorized();

            var photoFromRepo = await _repo.GetPhoto(id);

            if (photoFromRepo.isMain)
                return BadRequest("This is already the main photo");

            var currentMainPhoto = await _repo.GetMainPhotoForUser(userId);
            currentMainPhoto.isMain = false;

            photoFromRepo.isMain = true;

            if (await _repo.SaveAll())
                return NoContent();

            return BadRequest("Could not set photo to main");
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeletePhoto(int userId, int id)
        {
            //if (userId != int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value))
            //    return Unauthorized();

            var user = await _repo.GetUser(userId);

            if (!user.photos.Any(p => p.id == id))
                return Unauthorized();

            var photoFromRepo = await _repo.GetPhoto(id);

            //if (photoFromRepo.isMain)
            //    return BadRequest("You cannot delete your main photo");

            if (photoFromRepo.publicId != null)
            {
                var deleteParams = new DeletionParams(photoFromRepo.publicId);

                var result = _cloudinary.Destroy(deleteParams);

                if (result.Result == "ok")
                {
                    _repo.Delete(photoFromRepo);
                }
            }

            if (photoFromRepo.publicId == null)
            {
                _repo.Delete(photoFromRepo);
            }

            if (user.photos.Count >= 4)
            {
                user.confirmed = true;
            }
            else
            {
                user.confirmed = false;
            }


            if (await _repo.SaveAll())
                return Ok();

            return BadRequest("Failed to delete the photo");
        }

    }
}