using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace Backend.Models
{
    public class Film
    {
        [Key]
        public int Id { get; set; }

        [Required]
        public string Title { get; set; }

        [Required]
        public string Director { get; set; }

        [Required]
        public DateTime ReleaseDate { get; set; }

        [Required]
        public string Genre { get; set; }

        public string Synopsis { get; set; }

        public string CoverImage { get; set; }

        public int Duration { get; set; }

        public ICollection<Review> Reviews { get; set; }
    }

}