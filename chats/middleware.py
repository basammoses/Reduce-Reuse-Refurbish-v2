from urllib.parse import parse_qs
from channels.db import database_sync_to_async

from django.contrib.auth import get_user_model
from django.utils.translation import gettext_lazy as _
from rest_framework.exceptions import AuthenticationFailed
from rest_framework_simplejwt.tokens import RefreshToken
from refurb import settings
from rest_framework_simplejwt.authentication import JWTAuthentication
from rest_framework.exceptions import AuthenticationFailed
from jwt.exceptions import InvalidTokenError








# class RefreshTokenMiddleware:
#     def __init__(self, get_response):
#         self.get_response = get_response

#     def __call__(self, request):
#         # Check if the request contains a refresh token
#         refresh_token = request.META.get('HTTP_AUTHORIZATION')  # Assumes the refresh token is included in the Authorization header
#         if refresh_token:
#             try:
#                 # Verify and decode the refresh token
#                 token = RefreshToken(refresh_token)
#                 # Perform any additional authentication or authorization checks here
#                 # For example, you can extract user information from the token and set request.user
#                 request.user = token.get('user')
#             except Exception as e:
#                 # Handle any exceptions that may occur during token decoding
#                 pass

#         response = self.get_response(request)
#         return response
#     def authenticate_credentials(self, request):
#         header = self.get_header(request)
#         raw_token = request.COOKIES.get(settings.SIMPLE_JWT['AUTH_COOKIE']) or None 

#         if header is None:
#             return None
#         else:
#             raw_token = self.get_raw_token(header)

#         if raw_token is None:
#             return None
        
#         validated_token = self.get_validated_token(raw_token)
      
#         return self.get_user(validated_token), validated_token
  


jwt_authentication = JWTAuthentication()

 





class TokenAuthentication:
    """
    Simple token based authentication.

    Clients should authenticate by passing the token key in the query parameters.
    For example:

        ?token=401f7ac837da42b97f613d789819ff93537bee6a
    """

    model = None

    def get_model(self):
        if self.model is not None:
            return self.model
        from rest_framework_simplejwt.tokens import RefreshToken


        return RefreshToken

    

# Define the authenticate_request function that uses JWTAuthentication
    def authenticate_credentials(self, key):
      try:
        # Get the token from the request's authorization header
        # token = jwt_authentication.get_jwt_value(request)
        # if token is None:
        #     raise AuthenticationFailed('No JWT token found in request headers.')

        # Authenticate the token and get the user object
        user, token = jwt_authentication.authenticate(key)
        if user is None:
            raise AuthenticationFailed('Invalid JWT token.')

        # Return the authenticated user
        return user
      except InvalidTokenError as e:
        raise AuthenticationFailed('Invalid JWT token.')
      except AuthenticationFailed as e:
        raise e
        
        

    # def authenticate_credentials(self, key):
    #     model = self.get_model()
    #     try:
    #         token = jwt_authentication.authenticate(key)
    #     except model.DoesNotExist:
    #         raise AuthenticationFailed(_("Invalid token."))

    #     if not token.user.is_active:
    #         raise AuthenticationFailed(_("User inactive or deleted."))
    #     return token.user


@database_sync_to_async
def get_user(scope):
    
  

    if "token" not in scope:
        raise ValueError(
            "Cannot find token in scope. You should wrap your consumer in "
            "TokenAuthMiddleware."
        )
    token = scope["token"]
    user = None
    try:
        auth = TokenAuthentication()
        user = auth.authenticate_credentials(token)
    except AuthenticationFailed:
        pass
    return user
  


class TokenAuthMiddleware:
    """
    Custom middleware that takes a token from the query string and authenticates via
    Django Rest Framework authtoken.
    """

    def __init__(self, app):
        # Store the ASGI application we were passed
        self.app = app

    async def __call__(self, scope, receive, send):
        # Look up user from query string (you should also do things like
        # checking if it is a valid user ID, or if scope["user"] is already
        # populated).
        query_params = parse_qs(scope["query_string"].decode())
        token = query_params["token"][0]
        scope["token"] = token
        scope["user"] = await get_user(scope)
        return await self.app(scope, receive, send)
      
      
      
