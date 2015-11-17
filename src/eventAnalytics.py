author__ = 'aradon'

import numpy as np
import pandas as pd
from sklearn.cross_decomposition import PLSRegression
from sklearn.metrics import mean_squared_error
from math import sqrt
import requests


def predictEvent():
    Location = '../data/event_data.csv'
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
    rmse_volunteer_number = sqrt(mean_squared_error(test_Y['volunteerNumber'], Predicted_Y[:, 1]))
    predicted_budget = Predicted_Y[:, 0]
    original_budget = test_Y['eventBudget'].tolist()
    predicted_volunteer_number = Predicted_Y[:, 1]
    original_volunteer_number = test_Y['volunteerNumber'].tolist()

    return original_budget, predicted_budget, original_volunteer_number, predicted_volunteer_number, rmse_budget, rmse_volunteer_number

def data_upload():
    original_budget, predicted_budget, original_volunteer_number, predicted_volunteer_number, rmse_budget, rmse_volunteer_number = predictEvent()
    try:
        seq = 0
        for budget in original_budget:
            # print original_budget[seq]
            data = '{"seq": "' + str(seq) + '", "original_budget": "' + str(original_budget[seq]) + '", "predicted_budget": "' + str(int(float(predicted_budget[seq]))) + '", "original_volunteer_number": "' + str(original_volunteer_number[seq]) + '", "predicted_volunteer_number": "' + str(int(float(predicted_volunteer_number[seq])))  + '", "rmse_budget": "' + str(rmse_budget)  + '", "rmse_volunteer_number": "' + str(rmse_volunteer_number) + '"}';
            headers = {'Content-Type': 'application/json'}
            print "seq" + str(seq)
            response = requests.post('http://localhost:8000/api/v1/predict/', data=data, headers=headers)
            print response
            seq = seq + 1
    except:
        raise

if __name__ == "__main__":
    data_upload()



