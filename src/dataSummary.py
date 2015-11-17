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
    months = {1: "January", 2: "February", 3: "March", 4: "April", 5: "May", 6: "June", 7: "July", 8: "August",
              9: "September", 10: "October", 11: "November", 12:"December"}
    monthDict = {"January": 0, "February": 0, "March": 0, "April": 0, "May": 0, "June":0, "July": 0, "August": 0,
                 "September": 0, "October": 0, "November": 0, "December": 0}
    for i in df['eventDate']:
        stri = str(i)
        if(stri[1]=='/'):
            key = stri[0]
        else:
            key = stri[0]+stri[1]
        key = months[int(key)]
        if(monthDict.has_key(key)):
            monthDict[key]+= 1
        else:
            monthDict[key] = 1
    return monthDict # search through the dictionary to populate the pie chart

def columnChartAnalytics():

    dictColumnChart = dict()
    totalNumberOfEventType = len(pd.unique(df.eventType.ravel()))
    dictColumnChart['totalNumberOfEventType'] = totalNumberOfEventType

    totalNumberOfLocation = len(pd.unique(df.eventLocation.ravel()))
    dictColumnChart['totalNumberOfLocation'] = totalNumberOfLocation

    avgVolunteerNumber = df['volunteerNumber'].mean()
    dictColumnChart['avgVolunteerNumber'] = avgVolunteerNumber

    avgTotalNumber = df['totalNumber'].mean()
    dictColumnChart['avgTotalNumber'] = avgTotalNumber

    avgEventBudget = df['eventBudget'].mean()
    dictColumnChart['avgEventBudget'] = avgEventBudget

    dictColumnChart['totalEventNumber'] = len(df)
    return dictColumnChart # search through the dictionary to populate the column chart

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
    print columnChartAnalytics()














