using Microsoft.IdentityModel.Tokens;
using System;
using System.IdentityModel.Tokens.Jwt;
using System.Net;
using System.Net.Http;
using System.Web.Http.Controllers;
using System.Web.Http.Filters;

namespace AuthLibrary
{
	public class Authorize : AuthorizationFilterAttribute
	{
		private static bool TryRetrieveToken(HttpActionContext context, out string token)
		{
			token = null;
			if (context.Request.Headers.Authorization == null)
			{
				return false;
			}

			token = context.Request.Headers.Authorization.Parameter;
			return true;
		}

		public override void OnAuthorization(HttpActionContext actionContext)
		{
			//determine whether a jwt exists or not
			if (!TryRetrieveToken(actionContext, out var token))
			{
				actionContext.Response = actionContext.Request.CreateResponse(HttpStatusCode.Unauthorized);
			}
			else
			{
				try
				{
					const string sec =
						"401b09eab3c013d4ca54922bb802bec8fd5318192b0a75f201d8b3727429090fb337591abd3e44453b954555b7a0812e1081c39b740293f765eae731f5a65ed1";
					var securityKey =
						new Microsoft.IdentityModel.Tokens.SymmetricSecurityKey(
							System.Text.Encoding.Default.GetBytes(sec));

					SecurityToken securityToken;
					JwtSecurityTokenHandler handler = new JwtSecurityTokenHandler();
					TokenValidationParameters validationParameters = new TokenValidationParameters()
					{
						ValidAudience = "http://localhost:50191",
						ValidIssuer = "http://localhost:50191",
						ValidateLifetime = true,
						ValidateIssuerSigningKey = true,
						LifetimeValidator = this.LifetimeValidator,
						IssuerSigningKey = securityKey
					};
					//extract and assign the user of the jwt
					handler.ValidateToken(token, validationParameters, out securityToken);
				}
				catch (SecurityTokenValidationException e)
				{
					Console.WriteLine(e.Message);
					actionContext.Response = actionContext.Request.CreateResponse(HttpStatusCode.Unauthorized);
				}
				catch (Exception ex)
				{
					Console.WriteLine(ex.Message);
					actionContext.Response = actionContext.Request.CreateResponse(HttpStatusCode.Unauthorized);
				}
			}

			base.OnAuthorization(actionContext);
		}

		private bool LifetimeValidator(DateTime? notBefore, DateTime? expires, SecurityToken securityToken,
			TokenValidationParameters validationParameters)
		{
			if (expires != null)
			{
				if (DateTime.UtcNow < expires) return true;
			}

			return false;
		}
	}
}