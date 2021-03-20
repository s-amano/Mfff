from django.shortcuts import render
from rest_framework import generics, authentication, permissions
# from django_filters import rest_framework as filters
from api_user import serializers
from core.models import User, Profile, FriendRequest
from django.db.models import Q
from rest_framework import viewsets
from rest_framework.exceptions import ValidationError
from rest_framework import status, views
from rest_framework.response import Response
from core import custompermissions


class CreateUserView(generics.CreateAPIView):
    serializer_class = serializers.UserSerializer


class UpdateUserView(generics.UpdateAPIView):
    queryset = User.objects.all()
    serializer_class = serializers.UserSerializer


class FriendRequestViewSet(viewsets.ModelViewSet):
    queryset = FriendRequest.objects.all()
    serializer_class = serializers.FriendRequestSerializer
    authentication_classes = (authentication.TokenAuthentication,)
    permission_classes = (permissions.IsAuthenticated,)

    def get_queryset(self):
        return self.queryset.filter(Q(askTo=self.request.user) | Q(askFrom=self.request.user))

    def perform_create(self, serializer):
        try:
            serializer.save(askFrom=self.request.user)
        except:
            raise ValidationError("User can have only unique request")

    def destroy(self, request, *args, **kwargs):
        response = {'message': 'Delete is not allowed !'}
        return Response(response, status=status.HTTP_400_BAD_REQUEST)

    def partial_update(self, request, *args, **kwargs):
        response = {'message': 'Patch is not allowed !'}
        return Response(response, status=status.HTTP_400_BAD_REQUEST)

# class UserFilter(filters.FilterSet):
#     class Meta:
#         model= User


class FriendList(views.APIView):

    def get(self, request, format=None, **kwargs):
        userId = self.kwargs['pk']

        querysetFriend = FriendRequest.objects.filter(
            approved=True, askFrom__id=userId)

        lst = [friend.askTo for friend in querysetFriend]

        querysetUser = User.objects.filter(email__in=lst)

        serializer = serializers.UserSerializer(
            instance=querysetUser, many=True)

        return Response(serializer.data)


class ProfileViewSet(viewsets.ModelViewSet):
    queryset = Profile.objects.all()
    serializer_class = serializers.ProfileSerializer
    authentication_classes = (authentication.TokenAuthentication,)
    permission_classes = (permissions.IsAuthenticated,
                          custompermissions.ProfilePermission)

    def perform_create(self, serializer):
        serializer.save(userPro=self.request.user)


class UserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = serializers.UserSerializer
    authentication_classes = (authentication.TokenAuthentication,)
    permission_classes = (permissions.IsAuthenticated,)


class MyProfileListView(generics.ListAPIView):
    queryset = Profile.objects.all()
    serializer_class = serializers.ProfileSerializer
    authentication_classes = (authentication.TokenAuthentication,)
    permission_classes = (permissions.IsAuthenticated,
                          custompermissions.ProfilePermission)

    def get_queryset(self):
        return self.queryset.filter(userPro=self.request.user)


class MyUserView(generics.ListAPIView):
    queryset = User.objects.all()
    serializer_class = serializers.UserSerializer
    authentication_classes = (authentication.TokenAuthentication,)
    permission_classes = (permissions.IsAuthenticated,)

    def get_queryset(self):
        return self.queryset.filter(email=self.request.user)
