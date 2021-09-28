using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SalesProject.Models
{
    public class JoinTable
    {
        public Customer customerList { get; set; }
        public Product productList { get; set; }
        public Store storeList { get; set; }
        public Sales saleList { get; set; }

        public int saleId { get; set; }
        public int customerId { get; set; }
        public string customerName { get; set; }
        public int productId { get; set; }
        public string productName { get; set; }
        public int storeId { get; set; }
        public string storeName { get; set; }

        public DateTime? datesold { get; set; }
    }
}
