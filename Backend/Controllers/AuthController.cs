using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Threading.Tasks;
using Azure;
using Backend.Dtos;
using Backend.Helpers;
using Backend.Models;
using Backend.Repository;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;

namespace Backend.Controllers
{
    [Route("api")]
    [ApiController]
    public class AuthController : Controller
    {
        private readonly IUserRepository _repository;
        private readonly JwtService _jwt;
        private readonly ILogger<AuthController> _logger;

        public AuthController(IUserRepository repository, JwtService jwt, ILogger<AuthController> logger)
        {
            _repository = repository;
            _jwt = jwt;
            _logger = logger;
        }

        [HttpGet]
        public IActionResult Hello()
        {
            return Ok("Success");
        }

        //https://localhost:8000/api/register
        [HttpPost("register")]
        public IActionResult CreateUser(RegistrasiDto dto)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var userExists = _repository.GetByEmail(dto.Email);
            if (userExists != null)
            {
                return Conflict(new { message = "Email is already in use." });
            }

            var user = new User
            {
                Name = dto.Name,
                Email = dto.Email,
                Password = BCrypt.Net.BCrypt.HashPassword(dto.Password)
            };

            try
            {
                var createdUser = _repository.Create(user);
                _logger.LogInformation("User created successfully with ID: {UserId}", createdUser.Id);
                return Created("Success", createdUser);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error creating user");
                return StatusCode(500, "Internal server error");
            }
        }

        [HttpPost("login")]
        public IActionResult Login(LoginDto dto)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var user = _repository.GetByEmail(dto.Email);
            if (user == null || !BCrypt.Net.BCrypt.Verify(dto.Password, user.Password))
            {
                return Unauthorized(new { message = "Invalid Credentials" });
            }

            var jwt = _jwt.Generate(user.Id);

            Response.Cookies.Append("jwt", jwt, new CookieOptions
            {
                HttpOnly = true,
                Secure = true,
                SameSite = SameSiteMode.Strict
            });

            _logger.LogInformation("User logged in successfully with ID: {UserId}", user.Id);
            return Ok(new { message = "You have successfully logged in" });
        }

        [HttpGet("user")]
        public IActionResult User()
        {
            try
            {
                var jwt = Request.Cookies["jwt"];
                var token = _jwt.Verify(jwt);
                int userId = int.Parse(token.Issuer);
                var user = _repository.GetById(userId);

                if (user == null)
                {
                    return NotFound();
                }

                return Ok(user);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error fetching user data");
                return Unauthorized();
            }
        }

        [HttpPost("logout")]
        public IActionResult Logout()
        {
            Response.Cookies.Delete("jwt");
            _logger.LogInformation("User logged out");
            return Ok(new { message = "Successfully logged out" });
        }
    }
}
