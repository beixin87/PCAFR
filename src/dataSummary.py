__author__ = 'aradon'

# import numpy as np
import pandas as pd


Location = '/Users/aradon/PycharmProjects/Sample/data/event_data.csv' # add your file path of csv file
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











