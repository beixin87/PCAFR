__author__ = 'aradon'

import pandas as pd
import requests


Location = '../data/event_data.csv' # add your file path of csv file
df = pd.read_csv(Location)

def pieChartEventNumberPerLocation():
    eventPerLocation = df.groupby('eventLocation').count()
    eventPerLocation = dict(eventPerLocation['eventDate'])
    return eventPerLocation # search through the dictionary to populate the pie chart

def pieChartEventNumberPerMonth():
    monthDict = dict()
    for i in df['eventDate']:
        stri = str(i)
        if(stri[1]=='/'):
            key = stri[0]
        else:
            key = stri[0]+stri[1]
        if(monthDict.has_key(key)):
            monthDict[key]+= 1
        else:
            monthDict[key] = 1
    return monthDict # search through the dictionary to populate the pie chart

def data_upload():
    eventPerLocation = pieChartEventNumberPerLocation()
    monthDict = pieChartEventNumberPerMonth()
    try:
        for location in eventPerLocation:
            print location
            print eventPerLocation[location]
            data = '{"geo_location": "' + str(location) + '", "event_number": "' + str(eventPerLocation[location]) + '", "volunteer_number": "' + "0" + '", "month": "' + "test" + '", "month_event_number": "' + "0" + '", "month_volunteer_number": "' + "0" + '"}'
            headers = {'Content-Type': 'application/json'}
            response = requests.post('http://localhost:8000/api/v1/stat/', data=data, headers=headers)
            print response
        for month in monthDict:
            print month
            print monthDict[month]
            data = '{"geo_location": "' + "test" + '", "event_number": "' + "0" + '", "volunteer_number": "' + "0" + '", "month": "' + str(month) + '", "month_event_number": "' + str(monthDict[month]) + '", "month_volunteer_number": "' + "0" + '"}'
            headers = {'Content-Type': 'application/json'}
            response = requests.post('http://localhost:8000/api/v1/stat/', data=data, headers=headers)
            print response
    except:
        raise

if __name__ == "__main__":
    data_upload()














