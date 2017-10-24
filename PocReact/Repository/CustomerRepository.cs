using SimpleNet.Core.Data;
using PocReact.Repository.Dtos;
using SimpleNet.Core.Data.Mappers;
using PocReact.Repository.Contracts;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System;

namespace PocReact.Repository
{
    public class CustomerRepository : BaseRepository , ICustomerRepository
    {
        static IRowMapper<Customer> CUSTOMER_MAPPER = MapBuilder<Customer>
                .MapAllProperties()
                .Map(x => x.Id).ToColumn("CustomerId")
                .Build();


        const string SELECT_CLAUSE = @"SELECT 
                 [CustomerID]
                ,[Title]
                ,[FirstName]
                ,[MiddleName]
                ,[LastName]
                ,[Suffix]
                ,[CompanyName]
                ,[EmailAddress]
                ,[Phone]
            FROM [SalesLT].[PocCustomer] ";


        public CustomerRepository(ISimpleDataAccessLayer database) : base(database)
        {   
        }

        public IEnumerable<Customer> Find(string filter, int pageNumber, int pageSize)
        {
            const string SQL = SELECT_CLAUSE + @" WHERE LastName like @filter ";

            return Database.Read<Customer>(CUSTOMER_MAPPER, SQL, CommandType.Text, new[]
            {
                GetParameter("@filter", $"{filter}%")
            });

        }

        public Customer GetById(long id)
        {
            const string SQL = SELECT_CLAUSE + @" WHERE CustomerID = @id ";

            return Database.Read<Customer>(CUSTOMER_MAPPER, SQL, CommandType.Text, new[]
            {
                GetParameter("@id", id)
            }).FirstOrDefault();

        }

        public Customer Create(Customer dto)
        {
            const string SQL = @"

INSERT INTO [SalesLT].[PocCustomer]
           (
            [Title]
           ,[FirstName]
           ,[MiddleName]
           ,[LastName]
           ,[Suffix]
           ,[CompanyName]
           ,[EmailAddress]
           ,[Phone])
     VALUES
           (
             @Title
           , @FirstName
           , @MiddleName
           , @LastName
           , @Suffix
           , @CompanyName
           , @EmailAddress
           , @Phone)
;

SELECT SCOPE_IDENTITY()
";
            var id = ExecuteScalar(SQL, CommandType.Text, new[]
            {
                GetParameter("@Title", dto.Title),
                GetParameter("@FirstName", dto.FirstName),
                GetParameter("@MiddleName", dto.MiddleName ?? null),
                GetParameter("@LastName", dto.LastName),
                GetParameter("@Suffix", dto.Suffix),
                GetParameter("@CompanyName", dto.CompanyName),
                GetParameter("@EmailAddress", dto.EmailAddress),
                GetParameter("@Phone", dto.Phone),
            });

            return GetById( Convert.ToInt64(id) );
        }

        public Customer Update(Customer dto)
        {
            throw new System.NotImplementedException();
        }
    }
}
