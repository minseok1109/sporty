from .common import *


SECRET_KEY = 'django-insecure-mxfd2m&89)l_p4-0)vc9$$=z&)16u^ffq2m*b0oo@s%2af6vvx'

DEBUG = True

INSTALLED_APPS += [
    'debug_toolbar',
]

MIDDLEWARE = [
    'debug_toolbar.middleware.DebugToolbarMiddleware',
] + MIDDLEWARE


INTERNAL_IPS = ['127.0.0.1']

CORS_ORIGIN_WHITELIST = ['http://localhost:3000']
