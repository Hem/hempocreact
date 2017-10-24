﻿
namespace PocReact.Repository.Dtos
{
    public class Customer
    {
        public long Id { get; set; }

        public string Title { get; set; }
        public string FirstName { get; set; }
        public string MiddleName { get; set; }
        public string LastName { get; set; }
        public string Suffix { get; set; }

        public string CompanyName { get; set; }
        public string EmailAddress { get; set; }
        public string Phone { get; set; }


    }
}
