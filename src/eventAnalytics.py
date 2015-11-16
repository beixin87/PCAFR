author__ = 'aradon'


import numpy as np
import pandas as pd
from sklearn.cross_decomposition import PLSRegression
from sklearn.metrics import mean_squared_error
from math import sqrt


def predictEvent():
    Location = '/Users/aradon/Documents/SplunkWork/HackWeek/EventAnalytics/SplunkHW/data/event_data.csv'
    df = pd.read_csv(Location)
    df['satisfy'] = df['satisfy'].astype('category')
    df['volunteerCertification'] = df['volunteerCertification'].astype('category')
    df['eventType'] = df['eventType'].astype('category')
    df['eventLocation'] = df['eventLocation'].astype('category')
    cat_columns = df.select_dtypes(['category']).columns
    df[cat_columns] = df[cat_columns].apply(lambda x: x.cat.codes)


    mask = np.random.rand(len(df)) < 0.6
    train = df[mask]
    # print len(train)
    test = df[~mask]
    train_X = train[['totalNumber', 'volunteerBonus', 'volunteerScore', 'volunteerCertification', 'satisfy', 'eventType',
                    'eventLocation']]
    train_Y = train[['eventBudget', 'volunteerNumber']]
    test_X = test[['totalNumber', 'volunteerBonus', 'volunteerScore', 'volunteerCertification', 'satisfy', 'eventType',
                   'eventLocation']]
    test_Y = test[['eventBudget', 'volunteerNumber']]
    pls2 = PLSRegression(n_components=3)
    pls2 = pls2.fit(train_X, train_Y)

    Predicted_Y = pls2.predict(test_X)
    rmse_budget= sqrt(mean_squared_error(test_Y['eventBudget'], Predicted_Y[:, 0]))
    rmse_vounteer_number = sqrt(mean_squared_error(test_Y['volunteerNumber'], Predicted_Y[:, 1]))
    predicted_budget = Predicted_Y[:, 0]
    original_budget = test_Y['eventBudget'].tolist()
    predicted_volunteer_number = Predicted_Y[:, 1]
    original_volunteer_number = test_Y['volunteerNumber'].tolist()

    return original_budget, predicted_budget, original_volunteer_number, predicted_volunteer_number, rmse_budget, rmse_vounteer_number

original_budget, predicted_budget, original_volunteer_number, predicted_volunteer_number, rmse_budget, rmse_vounteer_number = predictEvent()



