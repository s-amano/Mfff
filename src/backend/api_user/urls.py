from django.urls import path, include
from api_user import views
from rest_framework.routers import DefaultRouter

app_name = 'user'

router = DefaultRouter()
router.register('profile',views.ProfileViewSet)
router.register('approval', views.FriendRequestViewSet)

urlpatterns = [
    path('create/', views.CreateUserView.as_view(), name='create'),
    path('update/<int:pk>/', views.UpdateUserView.as_view(), name='update'),
    path('get/', views.GetUserListView.as_view(), name='get'),
    path('myprofile/', views.MyProfileListView.as_view(), name='myprofile'),
    path('myuser/', views.MyUserView.as_view(), name='myuser'),
    path('',include(router.urls))
]
