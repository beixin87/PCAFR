import splunklib.client as client
from splunklib.binding import HTTPError


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
            print actual_search_data
    except:
        raise