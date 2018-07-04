using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Web.Http;

namespace Department.Service.Controllers
{
	[RoutePrefix("api/department")]
	public class DepartmentController : ApiController
	{
		readonly MicroservicePOCEntities _contextEntities = new MicroservicePOCEntities();

		[Route("list")]
		[HttpGet]
		[AuthLibrary.Authorize]
		public object List()
		{
			try
			{
				var department = _contextEntities.Departments;
				if (department != null)
				{
					return Json(new
					{
						Status = HttpStatusCode.OK,
						Message = "Success",
						Departments = department.Select(d => new {Id = d.Id, Name = d.Name}).ToList()
					});
				}
				else
				{
					return Json(new {Status = HttpStatusCode.NotFound, Message = "Failed"});
				}
			}
			catch (Exception e)
			{
				Console.WriteLine(e);
				return Json(new {Status = HttpStatusCode.NotFound, Message = e.Message});
			}
		}
	}
}