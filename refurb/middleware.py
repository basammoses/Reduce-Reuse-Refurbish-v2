from rest_framework_simplejwt.tokens import RefreshToken







class RefreshTokenMiddleware:
    def __init__(self, get_response):
        self.get_response = get_response

    def __call__(self, request):
        # Check if the request contains a refresh token
        refresh_token = request.META.get('HTTP_AUTHORIZATION')  # Assumes the refresh token is included in the Authorization header
        if refresh_token:
            try:
                # Verify and decode the refresh token
                token = RefreshToken(refresh_token)
                # Perform any additional authentication or authorization checks here
                # For example, you can extract user information from the token and set request.user
                request.user = token.get('user')
            except Exception as e:
                # Handle any exceptions that may occur during token decoding
                pass

        response = self.get_response(request)
        return response
