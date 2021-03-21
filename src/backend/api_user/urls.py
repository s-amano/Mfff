from django.urls import path, include
from api_user import views
from rest_framework.routers import DefaultRouter

app_name = 'user'

router = DefaultRouter()
router.register('profile', views.ProfileViewSet)
router.register('approval', views.FriendRequestViewSet)
router.register('user', views.UserViewSet)

urlpatterns = [
    path('create/', views.CreateUserView.as_view(), name='create'),
    path('myprofile/create/', views.CreateProfileView.as_view(),
         name='createmyprofile'),
    path('profinfo/<int:pk>/', views.ProfileInfoViewSet.as_view(), name='profinfo'),
    path('update/<int:pk>/', views.UpdateUserView.as_view(), name='update'),
    path('myprofile/', views.MyProfileListView.as_view(), name='myprofile'),
    path('myuser/', views.MyUserView.as_view(), name='myuser'),
    path('friend/<int:pk>/', views.FriendList.as_view(), name='friend'),
    path('', include(router.urls))
]
