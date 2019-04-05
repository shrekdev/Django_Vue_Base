from djoser.conf import django_settings
from rest_framework.views import APIView


class ActivateUserByGet(APIView):

    def post(self, request, uid, token, format = None):
        print('ActivateUserByGet - get POST')
        # payload = {'uid': uid, 'token': token}
        #
        # url = '{0}://{1}{2}'.format(django_settings.PROTOCOL, django_settings.DOMAIN, reverse('user-activate'))
        # response = requests.post(url, data = payload)
        #
        # if response.status_code == 204:
        #     return Response({'detail': 'all good sir'})
        # else:
        #     return Response(response.json())
