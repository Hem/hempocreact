using SimpleNet.Core.Data.Repository;
using SimpleNet.Core.Data;

namespace PocReact.Repository
{
    public class BaseRepository : AbstractSimpleRepository
    {
        public override ISimpleDataAccessLayer Database { get; set; }
        
        public BaseRepository(ISimpleDataAccessLayer database)
        {
            this.Database = database;
        }

    }
}
