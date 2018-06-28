using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using AuthLibrary;

namespace Auth.Service.Controllers
{
	[RoutePrefix("api/security")]
	public class SecurityController : ApiController
	{
		[HttpGet]
		[Route("login")]
		public IHttpActionResult Login(string uname, string pwd)
		{
			try
			{
				if (uname.ToLower() == "admin" && pwd == "admin")
				{
					string token = TokenHandler.CreateToken(uname);
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