from django.conf.urls import url
from main.views import index_view, post_view, post2_view

urlpatterns = [
    url(r'^$', index_view, name='index_view'),
    url(r'get_values/', post_view, name='post_view'),
    url(r'get_values2/', post2_view, name='post_view2'),
]
