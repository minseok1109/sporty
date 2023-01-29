from django.urls import path, include
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView, TokenVerifyView
from . import views
from rest_framework.routers import DefaultRouter

router = DefaultRouter()
router.register('user', views.UserViewSet)
router.register('selfdata', views.UserSelfData)


urlpatterns = [
    path('signup/', views.SignupView.as_view(), name="login"),
    path('token/', TokenObtainPairView.as_view()),
    path('token/refresh/', TokenRefreshView.as_view()),
    path('token/verify/', TokenVerifyView.as_view()),
    path('api/', include(router.urls))
]
