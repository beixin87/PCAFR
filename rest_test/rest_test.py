import splunklib.client as client
from splunklib.binding import HTTPError
import json
import requests
import time


SPLUNK_OWNER = 'nobody'
SPLUNK_APP = 'Splunk_ML_Toolkit'
host = '52.32.2.170'
splunkuser = 'admin'
splunkpassword = 'jonasyao'

if __name__ == "__main__":
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
            # print predict_budge
            # print len(predict_budge)

            data = ""
            seq = 1

            for predict in predict_budge:
                data = '{"seq": "' + str(seq) + '", "budget": "' + str(predict) + '"}'
                headers = {'Content-Type': 'application/json'}
                print "seq" + str(seq)
                response = requests.post('http://localhost:8000/api/v1/predict/', data=data, headers=headers)
                seq = seq + 1
            # stats = [1,2,3,4,5,6]
            # for stat in stats:
            #     geo_location = "west vancouver"
            #     event_number = 3
            #     volunteer_number = 4
            #     month = "January"
            #     month_event_number = 10
            #     month_volunteer_number = 32
            #     data = '{"geo_location": "' + str(geo_location) + '", "event_number": "' + str(event_number) + '", "volunteer_number": "' + str(volunteer_number) + '", "month": "' + str(month) + '", "month_event_number": "' + str(month_event_number) + '", "month_volunteer_number": "' + str(month_volunteer_number) + '"}'
            #     headers = {'Content-Type': 'application/json'}
            #     response = requests.post('http://localhost:8000/api/v1/stat/', data=data, headers=headers)
            # data = data[:-1]
            # print data
            # data_json = json.dumps(data)
            # print data_json

            # curl --dump-header - -H "Content-Type: application/json" -X POST --data '{"seq": "0", "budget": "13"}' http://localhost:8000/api/v1/predict/
            # print count
            # test = ast.literal_eval(actual_search_data)
            # print actual_search_data.count("predicted(event budge)")
    except:
        raise