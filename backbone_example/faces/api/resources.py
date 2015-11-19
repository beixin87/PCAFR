from tastypie.resources import ModelResource
from tastypie.authorization import Authorization
from django.conf.urls.defaults import url
from tastypie.utils import trailing_slash
from tastypie.http import HttpResponse
import requests

from faces.models import Face

class FaceResource(ModelResource):
    class Meta:
        queryset = Face.objects.all()
        authorization = Authorization()
        list_allowed_methods = ['get', 'post']
        detail_allowed_methods = ['get']

    def override_urls(self):
    	return [
    		url(r"^(?P<resource_name>%s)/imageupload%s$" % (self._meta.resource_name, trailing_slash()), self.wrap_view('image_upload'), name="api_image_upload")
    	]

    def image_upload(self, request, **kwargs):
    	self.method_check(request, allowed = ['get', 'post'])
    	self.is_authenticated(request)
    	self.throttle_check(request)
    	object = []
    	object_list = {
    		'similarity' : '98,67,43'
    	}
    	return self.create_response(request, object_list, response_class=HttpResponse)
