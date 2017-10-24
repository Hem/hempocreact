using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using PocReact.Repository.Contracts;
using PocReact.Repository.Dtos;

namespace PocReact.Controllers
{
    [Produces("application/json")]
    [Route("api/Customer")]
    public class CustomerController : Controller
    {
        readonly ICustomerRepository Repository;

        public CustomerController(ICustomerRepository repository)
        {
            this.Repository = repository;
        }


        // GET: api/Customer
        [HttpGet]
        public IEnumerable<Customer> Get(string filter = "")
        {
            return Repository.Find(filter, 0, 0);
        }

        // GET: api/Customer/5
        [HttpGet("{id}", Name = "Get")]
        public Customer Get(int id)
        {
            return Repository.GetById(id);
        }
        
        // POST: api/Customer
        [HttpPost]
        public Customer Post([FromBody] Customer customer)
        {
            return Repository.Create(customer);
        }
        
        // PUT: api/Customer/5
        [HttpPut("{id}")]
        public void Put(int id, [FromBody]string value)
        {
        }
        
        // DELETE: api/ApiWithActions/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
        }
    }
}
