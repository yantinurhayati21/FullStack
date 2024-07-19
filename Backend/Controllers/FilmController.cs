using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using System;
using Backend.Dtos;
using Backend.Models;
using Backend.Repository;
using Microsoft.AspNetCore.Http.HttpResults;

namespace Backend.Controllers
{
    [Route("api/films")]
    [ApiController]
    public class FilmController : Controller
    {
        private readonly IFilmRepository _repository;
        private readonly ILogger<FilmController> _logger;

        public FilmController(IFilmRepository repository, ILogger<FilmController> logger)
        {
            _repository = repository;
            _logger = logger;
        }

        [HttpGet]
        public IActionResult GetAll()
        {
            _logger.LogInformation("Getting all films");
            try
            {
                var films = _repository.GetAll();
                return Ok(films);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error occurred while getting all films");
                return StatusCode(500, "Internal server error");
            }
        }

        [HttpGet("{id}")]
        public IActionResult GetById(int id)
        {
            _logger.LogInformation("Getting film by ID: {id}", id);
            try
            {
                var film = _repository.GetById(id);
                if (film == null)
                {
                    _logger.LogWarning("Film not found with ID: {id}", id);
                    return NotFound();
                }
                return Ok(film);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error occurred while getting film by ID: {id}", id);
                return StatusCode(500, "Internal server error");
            }
        }

        [HttpPost("add")]
        public IActionResult Create(FilmDto dto)
        {
            _logger.LogInformation("Received request to add film: {@dto}", dto);

            if (!ModelState.IsValid)
            {
                _logger.LogWarning("Model state is invalid: {@ModelState}", ModelState);
                return BadRequest(ModelState);
            }

            var film = new Film
            {
                Title = dto.Title,
                Director = dto.Director,
                ReleaseDate = dto.ReleaseDate,
                Genre = dto.Genre,
                Synopsis = dto.Synopsis,
                CoverImage = dto.CoverImage,
                Duration = dto.Duration
            };

            try
            {
                var createdFilm = _repository.Create(film);
                _logger.LogInformation("Film created successfully: {@createdFilm}", createdFilm);
                return Created("Success", createdFilm);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error occurred while creating film");
                return StatusCode(500, "Internal server error");
            }
        }

        [HttpPut("{id}")]
        public IActionResult Update(int id, [FromBody] FilmUpdateDto dto)
        {
            _logger.LogInformation("Received request to update film with ID: {id}", id);

            if (!ModelState.IsValid)
            {
                _logger.LogWarning("Model state is invalid: {@ModelState}", ModelState);
                return BadRequest(ModelState);
            }

            try
            {
                var existingFilm = _repository.GetById(id);
                if (existingFilm == null)
                {
                    _logger.LogWarning("Film not found with ID: {id}", id);
                    return NotFound();
                }

                existingFilm.Title = dto.Title;
                existingFilm.Director = dto.Director;
                existingFilm.ReleaseDate = dto.ReleaseDate;
                existingFilm.Genre = dto.Genre;
                existingFilm.Synopsis = dto.Synopsis;
                existingFilm.CoverImage = dto.CoverImage;
                existingFilm.Duration = dto.Duration;

                _repository.Update(existingFilm);
                _logger.LogInformation("Film updated successfully: {@existingFilm}", existingFilm);
                return NoContent();
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error occurred while updating film with ID: {id}", id);
                return StatusCode(500, "Internal server error");
            }
        }

        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            _logger.LogInformation("Received request to delete film with ID: {id}", id);

            try
            {
                var film = _repository.GetById(id);
                if (film == null)
                {
                    _logger.LogWarning("Film not found with ID: {id}", id);
                    return NotFound();
                }

                _repository.Delete(id);
                _logger.LogInformation("Film deleted successfully with ID: {id}", id);
                return NoContent();
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error occurred while deleting film with ID: {id}", id);
                return StatusCode(500, "Internal server error");
            }
        }
    }
}
