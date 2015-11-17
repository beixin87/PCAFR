from tastypie.resources import ModelResource
from tastypie.authorization import Authorization
from django.conf.urls.defaults import url
from tastypie.utils import trailing_slash
import requests


from predicts.models import Predict

class PredictResource(ModelResource):
    class Meta:
        queryset = Predict.objects.all()
        authorization = Authorization()
        list_allowed_methods = ['get', 'post']
        detail_allowed_methods = ['get']

    def override_urls(self):
    	return [
    		url(r"^(?P<resource_name>%s)/dataload%s$" % (self._meta.resource_name, trailing_slash()), self.wrap_view('data_load'), name="api_data_load")
    	]

    def data_load(self, request, **kwargs):
    	self.method_check(request, allowed = ['get', 'post'])
    	self.is_authenticated(request)
    	self.throttle_check(request)

    	return self.create_response(request,'')
