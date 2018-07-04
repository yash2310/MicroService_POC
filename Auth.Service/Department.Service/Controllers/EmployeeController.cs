using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace Department.Service.Controllers
{
	[RoutePrefix("api/department/employee")]
	public class EmployeeController : ApiController
	{
		readonly MicroservicePOCEntities _contextEntities = new MicroservicePOCEntities();

		[Route("list")]
		[HttpGet]
		[AuthLibrary.Authorize]
		public object List(int departmentId)
		{
			try
			{
				var department = _contextEntities.Departments.FirstOrDefault(d => d.Id.Equals(departmentId));
				if (department != null)
				{
					return Json(new
					{
						Status = HttpStatusCode.OK,
						Message = "Success",
						Employees = department.Employees.Count <= 0
							? null
							: department.Employees.Select(d => new
							{
								Id = d.Id,
								Name = d.Name,
								Email = d.Email,
								Age = d.Age,
								Gender = d.Gender
							}).ToList()
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