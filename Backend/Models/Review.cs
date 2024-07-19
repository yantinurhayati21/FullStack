using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace Backend.Models
{
    public class Review
    {
        [Key]
        public int Id { get; set; }

        [Required]
        public string ReviewerName { get; set; }

        [Required]
        public string Comment { get; set; }

        [Required]
        public int Rating { get; set; }

        [Required]
        public int FilmId { get; set; }

        [ForeignKey("FilmId")]
        public Film Film { get; set; }
    }
}