from django.contrib.auth.tokens import default_token_generator
from templated_mail.mail import BaseEmailMessage
from djoser import utils
from djoser.conf import settings as djoser_settings
from django.conf import settings


class ActivationEmail(BaseEmailMessage):
    template_name = 'users/activation_email.html'

    def get_context_data(self):
        context = super(ActivationEmail, self).get_context_data()
        user = context.get('user')
        context['uid'] = utils.encode_uid(user.pk)
        context['token'] = default_token_generator.make_token(user)
        context['url'] = djoser_settings.ACTIVATION_URL.format(**context)
        context['domain'] = settings.DJOSER_EMAIL.get('DOMAIN')
        context['site_name'] = settings.DJOSER_EMAIL.get('SITE_NAME')

        return context


class PasswordResetEmail(BaseEmailMessage):
    template_name = 'users/password_reset_email.html'

    def get_context_data(self):
        context = super(PasswordResetEmail, self).get_context_data()
        user = context.get('user')
        context['uid'] = utils.encode_uid(user.pk)
        context['token'] = default_token_generator.make_token(user)
        context['url'] = djoser_settings.PASSWORD_RESET_CONFIRM_URL.format(**context)
        context['domain'] = settings.DJOSER_EMAIL.get('DOMAIN')
        context['site_name'] = settings.DJOSER_EMAIL.get('SITE_NAME')

        return context


# Not in usage currently
# class ConfirmationEmail(BaseEmailMessage):
#     template_name = 'users/confirmation_email.html'
