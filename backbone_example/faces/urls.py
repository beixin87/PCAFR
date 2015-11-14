from django.conf.urls.defaults import patterns, url, include
from faces.api import v1

from .views import IndexView

urlpatterns = patterns('',
    url(r'^$',
        IndexView.as_view(),
        name='index'),
    url(r'^api/', include(v1.urls)),
)


