from chats.middleware import TokenAuthMiddleware
from channels.routing import ProtocolTypeRouter, URLRouter
from django.urls import path, re_path
from chats import consumers
from chats.consumers import ChatConsumer
from django.core.asgi import get_asgi_application
import os
import sys
from pathlib import Path
from channels.auth import AuthMiddlewareStack




os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'web_project.settings')


websocket_urlpatterns = [
    path("chats/<conversation_name>/<user>", ChatConsumer.as_asgi()),
]


application = ProtocolTypeRouter(
    {
        "http": get_asgi_application(),
        "websocket": (URLRouter(websocket_urlpatterns)),
    }
)
