using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Backend.Dtos;
using Backend.Models;

namespace Backend.Repository
{
    public interface IReviewRepository
    {
        IEnumerable<ReviewDisplayDto> GetAll();
        Review GetById(int id);
        Review Create(Review review);
        void Update(Review review);
        void Delete(int id);
    }
}