using Backend.Data;
using Backend.Models;
using System.Collections.Generic;
using System.Linq;

namespace Backend.Repository
{
    public class FilmRepository : IFilmRepository
    {
        private readonly AppDbContext _context;

        public FilmRepository(AppDbContext context)
        {
            _context = context;
        }

        public IEnumerable<Film> GetAll()
        {
            return _context.Film.ToList();
        }

        public Film GetById(int id)
        {
            return _context.Film.Find(id);
        }

        public Film Create(Film film)
        {
            _context.Film.Add(film);
            film.Id = _context.SaveChanges();
            return film;
        }

        public void Update(Film film)
        {
            _context.Film.Update(film);
            _context.SaveChanges();
        }

        public void Delete(int id)
        {
            var film = _context.Film.Find(id);
            if (film != null)
            {
                _context.Film.Remove(film);
                _context.SaveChanges();
            }
        }
    }
}
