# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.core.mail import EmailMessage
from django.http import HttpResponse
from django.shortcuts import render
from django.template import Context, Template
from django.views.decorators.csrf import csrf_exempt

from landing.settings import BASE_DIR


def index_view(request):
    context = {}
    template = 'index.html'

    return render(request, template, context)


@csrf_exempt
def post_view(request):
    name = ''
    phone = ''
    if request.method == 'POST':
        try:
            name = request.POST['name']
            phone = request.POST['phone']

        except:
            pass

        import os
        f = open(os.path.join(BASE_DIR, "templates/mail.html"))

        content = f.read()
        f.close()
        context = Context(
            dict(name=name, phone=phone))
        template = Template(content)
        mail = EmailMessage('Сообщение с сайта', template.render(context), to=['men.ishkermin2018@gmail.com'])
        mail.content_subtype = 'html'
        mail.send()

        return HttpResponse('success')


@csrf_exempt
def post2_view(request):
    name = ''
    phone = ''
    email = ''
    if request.method == 'POST':
        try:
            name = request.POST['name']
            phone = request.POST['phone']
            email = request.POST['email']

        except:
            pass

        import os
        f = open(os.path.join(BASE_DIR, "templates/mail.html"))

        content = f.read()
        f.close()
        context = Context(
            dict(name=name, phone=phone, email=email))
        template = Template(content)
        mail = EmailMessage('Сообщение с сайта с почтой', template.render(context), to=['men.ishkermin2018@gmail.com'])
        mail.content_subtype = 'html'
        mail.send()

        return HttpResponse('success')
