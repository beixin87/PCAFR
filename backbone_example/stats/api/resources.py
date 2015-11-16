from tastypie.resources import ModelResource
from tastypie.authorization import Authorization
from django.conf.urls.defaults import url
from tastypie.utils import trailing_slash
import json
import requests
import time
import splunklib.client as client
from splunklib.binding import HTTPError


from stats.models import Stat

class StatResource(ModelResource):
    class Meta:
        queryset = Stat.objects.all()
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

        SPLUNK_OWNER = 'nobody'
        SPLUNK_APP = 'Splunk_ML_Toolkit'
        host = '52.32.2.170'
        splunkuser = 'admin'
        splunkpassword = 'jonasyao'
        service = client.connect(
            host=host,
            port=8089,
            username=splunkuser,
            password=splunkpassword,
            app=SPLUNK_APP,
            owner=SPLUNK_OWNER
        )
        search = "| inputlookup event_data.csv | fit LinearRegression \"event budge\" from \"event date\" \"event location\" \"event type\" \"satisfy\" \"total number\" \"volunteer certification\" \"volunteer number\" \"volunteer's bonus\" \"volunteer's score\""
        kwargs_oneshot = {'output_mode': 'json', 'preview': 0, 'count': 0 , 'auto_finalize_ec':0 }
        try:
            oneshot_search = service.jobs.oneshot(search, **kwargs_oneshot)
            oneshot_search_string = oneshot_search.read()
            if "result" in oneshot_search_string:
                start = oneshot_search_string.find("results")
                search_results = oneshot_search_string[start : -1]
                actual_search_data = search_results
                temp = actual_search_data.split('},{')
                predict_budge = []
                for item in temp:
                    temp_item = item.split('","')
                    predict_budge.append(int(float(temp_item[4].split('":"')[1])))
                data = ""
                seq = 1

                for predict in predict_budge:
                    data = '{"seq": "' + str(seq) + '", "budget": "' + str(predict) + '"}'
                    headers = {'Content-Type': 'application/json'}
                    print "sending" + str(seq)
                    # response = requests.get('http://localhost:8000/api/v1/predict/1/')
                    # response = requests.post('http://localhost:8000/api/v1/predict/', data=data, headers=headers,timeout=3)
                    seq = seq + 1
        except:
            print "error"
            raise        

    	return self.create_response(request,'')
