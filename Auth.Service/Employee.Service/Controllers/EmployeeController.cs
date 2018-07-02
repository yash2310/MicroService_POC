using System;
using System.Linq;
using System.Net;
using System.Web.Http;

namespace Employee.Service.Controllers
{
	[RoutePrefix("api/employee")]
	public class EmployeeController : ApiController
	{
		readonly MicroservicePOCEntities _contextEntities = new MicroservicePOCEntities();

		[Route("list")]
		//[AuthLibrary.Authorize]
		[HttpGet]
		public object List()
		{
			try
			{
				var employees = _contextEntities.Employees;
				if (employees != null)
				{
					return Json(new
					{
						Status = HttpStatusCode.OK,
						Message = "Success",
						Employees = employees.Select(d => new
						{
							Id = d.Id,
							Name = d.Name,
							Age = d.Age,
							Gender = d.Gender,
							DeptId = d.Department.Id,
							DeptName = d.Department.Name
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

		[Route("detail")]
		[AuthLibrary.Authorize]
		[HttpGet]
		public object Details(int id)
		{
			try
			{
				var employees = _contextEntities.Employees.Find(id);
				if (employees != null)
				{
					return Json(new
					{
						Status = HttpStatusCode.OK,
						Message = "Success",
						Employee = new
						{
							Id = employees.Id,
							Name = employees.Name,
							Age = employees.Age,
							Gender = employees.Gender,
							DeptId = employees.Department.Id,
							DeptName = employees.Department.Name
						}
					});
				}
				else
				{
					return Json(new {Status = HttpStatusCode.NotFound, Message = "Invalid Employee Id"});
				}
			}
			catch (Exception e)
			{
				Console.WriteLine(e);
				return Json(new {Status = HttpStatusCode.NotFound, Message = e.Message});
			}
		}

		[Route("add")]
		[AuthLibrary.Authorize]
		[HttpPost]
		public object Add(EmployeeAdd empData)
		{
			try
			{
				Employee employee = new Employee
				{
					Name = empData.Name,
					Email = empData.Email,
					Age = empData.Age,
					Gender = empData.Gender,
					Department = _contextEntities.Departments.Find(empData.DeptartmentId)
				};

				_contextEntities.Employees.Add(employee);
				_contextEntities.SaveChanges();

				return Json(new
				{
					Status = HttpStatusCode.OK,
					Message = "Added"
				});
			}
			catch (Exception e)
			{
				Console.WriteLine(e);
				return Json(new {Status = HttpStatusCode.NotFound, Message = "Failed"});
			}
		}

		[Route("update")]
		[AuthLibrary.Authorize]
		[HttpPost]
		public object Edit(EmployeeUpdate employeeUpdate)
		{
			try
			{
				var employees = _contextEntities.Employees.Find(employeeUpdate.Id);

				if (employees != null)
				{
					employees.Name = employeeUpdate.Name;
					employees.Age = employeeUpdate.Age;
					employees.Gender = employeeUpdate.Gender;
					employees.Department = _contextEntities.Departments.Find(employeeUpdate.DeptartmentId);

					_contextEntities.SaveChanges();

					return Json(new
					{
						Status = HttpStatusCode.OK,
						Message = "Updated"
					});
				}
				else
				{
					return Json(new
					{
						Status = HttpStatusCode.NotFound,
						Message = "Invalid Employee"
					});
				}
			}
			catch (Exception e)
			{
				Console.WriteLine(e);
				return Json(new {Status = HttpStatusCode.NotFound, Message = e.Message});
			}
		}

		[Route("remove")]
		[AuthLibrary.Authorize]
		[HttpGet]
		public object Delete(int id)
		{
			try
			{
				var employee = _contextEntities.Employees.Find(id);
				if (employee != null)
				{
					_contextEntities.Employees.Remove(employee);
					_contextEntities.SaveChanges();

					return Json(new
					{
						Status = HttpStatusCode.OK,
						Message = "Deleted"
					});
				}
				else
				{
					return Json(new
					{
						Status = HttpStatusCode.NotFound,
						Message = "Invalid Employee"
					});
				}
			}
			catch (Exception e)
			{
				Console.WriteLine(e);
				return Json(new {Status = HttpStatusCode.NotFound, Message = e.Message});
			}
		}
	}

	public class EmployeeAdd
	{
		public string Name { get; set; }
		public string Email { get; set; }
		public int Age { get; set; }
		public string Gender { get; set; }
		public int DeptartmentId { get; set; }
	}

	public class EmployeeUpdate
	{
		public int Id { get; set; }
		public string Name { get; set; }
		public int Age { get; set; }
		public string Gender { get; set; }
		public int DeptartmentId { get; set; }
	}
}