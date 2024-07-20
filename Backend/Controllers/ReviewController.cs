using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Threading.Tasks;
using Backend.Dtos;
using Backend.Models;
using Backend.Repository;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;

namespace Backend.Controllers
{
    [Route("api/reviews")]
    public class ReviewController : Controller
    {
        private readonly IReviewRepository _repository;
        private readonly ILogger<ReviewController> _logger;

        //private readonly IFilmRepository _filmRepository;

        public ReviewController(
            IReviewRepository repository,
            IFilmRepository filmRepository,
            ILogger<ReviewController> logger)
        {
            _repository = repository;
            //_filmRepository = filmRepository;
            _logger = logger;
        }

        [HttpGet]
        public IActionResult GetAll()
        {
            _logger.LogInformation("Getting all reviews");
            try
            {
                var reviews = _repository.GetAll();
                return Ok(reviews);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error occurred while getting all reviews");
                return StatusCode(500, "Internal server error");
            }
        }

        [HttpGet("{id}")]
        public IActionResult GetById(int id)
        {
            _logger.LogInformation("Getting review by ID: {id}", id);
            try
            {
                var review = _repository.GetById(id);
                if (review == null)
                {
                    _logger.LogWarning("Review not found with ID: {id}", id);
                    return NotFound();
                }
                return Ok(review);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error occurred while getting review by ID: {id}", id);
                return StatusCode(500, "Internal server error");
            }
        }

        [HttpPost("add")]
        public IActionResult Create([FromBody] ReviewDto dto)
        {
            _logger.LogInformation("Received request to add review: {@review}", dto);

            if (!ModelState.IsValid)
            {
                _logger.LogWarning("Model state is invalid: {@ModelState}", ModelState);
                return BadRequest(ModelState);
            }

            var review = new Review
            {
                ReviewerName = dto.ReviewerName,
                Comment = dto.Comment,
                Rating = dto.Rating,
                FilmId = dto.FilmId
            };

            try
            {
                var createdReview = _repository.Create(review);
                _logger.LogInformation("Review created successfully: {@createdReview}", createdReview);
                return CreatedAtAction(nameof(GetById), new { id = createdReview.Id }, createdReview);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error occurred while creating review. Review DTO: {@review}", dto);
                return StatusCode(500, "Internal server error. Please contact support.");
            }
        }

        [HttpPut("{id}")]
        public IActionResult Update(int id, [FromBody] ReviewUpdateDto dto)
        {
            _logger.LogInformation("Received request to update review with ID: {id}", id);

            if (!ModelState.IsValid)
            {
                _logger.LogWarning("Model state is invalid: {@ModelState}", ModelState);
                return BadRequest(ModelState);
            }

            try
            {
                var existingReview = _repository.GetById(id);
                if (existingReview == null)
                {
                    _logger.LogWarning("Review not found with ID: {id}", id);
                    return NotFound();
                }

                existingReview.ReviewerName = dto.ReviewerName;
                existingReview.Comment = dto.Comment;
                existingReview.Rating = dto.Rating;
                existingReview.FilmId = dto.FilmId;

                _repository.Update(existingReview);
                _logger.LogInformation("Review updated successfully: {@existingReview}", existingReview);
                return NoContent();
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error occurred while updating review with ID: {id}", id);
                return StatusCode(500, "Internal server error");
            }
        }

        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            _logger.LogInformation("Received request to delete review with ID: {id}", id);

            try
            {
                var review = _repository.GetById(id);
                if (review == null)
                {
                    _logger.LogWarning("Review not found with ID: {id}", id);
                    return NotFound();
                }

                _repository.Delete(id);
                _logger.LogInformation("Review deleted successfully with ID: {id}", id);
                return NoContent();
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error occurred while deleting review with ID: {id}", id);
                return StatusCode(500, "Internal server error");
            }
        }

    }
}