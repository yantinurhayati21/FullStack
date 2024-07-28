using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Backend.Dtos
{
    public class ReviewDisplayDto
    {
        public int Id { get; set; }
        public string ReviewerName { get; set; }
        public string Comment { get; set; }
        public int Rating { get; set; }
        public int FilmId { get; set; }
        public string FilmTitle { get; set; }
    }
}