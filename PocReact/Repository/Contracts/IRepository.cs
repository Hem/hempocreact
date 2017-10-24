using System.Collections.Generic;

namespace PocReact.Repository.Contracts
{
    public interface IRepository<T>
    {
        IEnumerable<T> Find(string filter, int pageNumber, int pageSize);

        T GetById(long id);

        T Create(T dto);

        T Update(T dto);
    }
}
