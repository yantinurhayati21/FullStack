using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Backend.Models;

namespace Backend.Repository
{
    public interface IFilmRepository
    {
        IEnumerable<Film> GetAll();
        Film GetById(int id);
        Film Create(Film film);
        void Update(Film film);
        void Delete(int id);
    }
}