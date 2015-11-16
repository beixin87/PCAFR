from django.conf.urls.defaults import patterns, url, include
from stats.api import v1

from .views import IndexView, DetailView

urlpatterns = patterns('',
    url(r'^$',
        IndexView.as_view(),
        name='index'),
    
    url(r'^api/', include(v1.urls)),
)


