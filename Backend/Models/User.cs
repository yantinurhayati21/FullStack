using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Backend.Models
{
    public class User
    {
        public int Id {get;set;}
        public string Name {get;set;}
        public string Email {get;set;}
        public string Password {get;set;}
    }
}