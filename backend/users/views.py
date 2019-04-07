# from djoser.conf import django_settings
# from django.urls import reverse
# from rest_framework.response import Response
# from rest_framework.views import APIView
# from rest_framework.permissions import AllowAny
# from urllib import request, parse
# # import requests
#
#
# class ActivateUserByGet(APIView):
#     permission_classes = [AllowAny, ]
#
#     def get(self, r, uid, token, format = None):
#         print('request: ', r)
#         payload = {'uid': uid, 'token': token}
#         data = parse.urlencode(payload).encode()
#         # url = f'http://127.0.0.1:8000{reverse("customuser-confirm")}'
#         url = 'http://127.0.0.1:8000/api/auth/users/activate'
#         print('url: ', url)
#         req = request.Request(url, data=data)
#         resp = request.urlopen(req)
#
#         print('resp status: ', resp.getcode())
#
#         if resp.getcode() == 204:
#             return Response({'detail': 'all good, sir'})
#         else:
#             return Response({'detail': 'not good, sir'})
