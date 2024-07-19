using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;
using Backend.Models;

namespace Backend.Dtos
{
    public class ReviewUpdateDto
    {
        public string ReviewerName { get; set; }

        public string Comment { get; set; }

        public int Rating { get; set; }

        public int FilmId { get; set; }
        
        // [ForeignKey("FilmId")]
        // public Film Film { get; set; }
    }
}