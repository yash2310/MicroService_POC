using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using Auth.Service.Models;
using AuthLibrary;

namespace Auth.Service.Controllers
{
	[RoutePrefix("api/security")]
	public class SecurityController : ApiController
	{
		[HttpPost]
		[Route("login")]
		public IHttpActionResult Login([FromBody] LoginRequest login)
		{
			try
			{
                string userName = login.Username.ToLower();
                string password = login.Password;

                if (userName == "admin" && password == "admin")
				{
					string token = TokenHandler.CreateToken(userName);
					return Json(new
					{
						Status = HttpStatusCode.OK,
						Message = "Success",
						Access_Token = token
					});
				}
				else
				{
					return Json(new {Status = HttpStatusCode.Unauthorized, Message = "Invalid User"});
				}
			}
			catch (Exception e)
			{
				return Json(new {Status = HttpStatusCode.Unauthorized, Message = e.Message});
			}

		}

	}
}