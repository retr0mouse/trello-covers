using Microsoft.AspNetCore.Mvc;

namespace server.Controllers;

[ApiController]
[Route("[controller]")]
public class GamesController : ControllerBase
{
    [HttpGet]
    public dynamic Get()
    {
        var dig = new Dictionary<string, string>();
        dig.Add("toned", "vvode");
        return dig;
    }
}
