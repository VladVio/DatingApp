
using System.ComponentModel.DataAnnotations;

namespace API.Entities
{

    public class Group
    {
        public Group(string name)
        {

        }
        [Key]
        public string Name { get; set; }
        public ICollection<Connection> Connections { get; set; } = new List<Connection>();
    }
}