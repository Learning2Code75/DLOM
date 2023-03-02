from flask import Flask, jsonify, request
from utilities import predict_pipeline
from utilities import predict_pment_op
from utilities import predict_m1
from utilities import predict_m2
from utilities import predict_m3
from utilities import predict_m4
from utilities import predict_m5
import numpy as np
from flask_cors import CORS

app = Flask(__name__)
CORS(app)


@app.post('/predict')
def predict():
    data = request.json
    try:
        sample = data['text']
    except KeyError:
        return jsonify({'error': 'No text sent'})
    sample = [sample]
    predictions = predict_pipeline(sample)

    try:
        result = jsonify(predictions[0])
    except TypeError as e:
        result = jsonify({'error': str(e)})
    return result


@app.post('/predict_arr')
def predict_arr():
    data = request.json
    try:
        sample = data['textArr']
    except KeyError:
        return jsonify({'error': 'No text sent'})

    predictions = predict_pipeline(sample)

    try:
        result = jsonify(predictions)
    except TypeError as e:
        result = jsonify({'error': str(e)})
    return result


@app.post('/predict_orderwise_reg')
def predict_orderwise_reg():
    data = request.json
    try:
        # ['comp2',5,'03','4',0.9,0.4]
        sample = []
        sample.append(int(data['qty']))
        sample.append(float(data['cliAvgSenti']))
        sample.append(float(data['spAvgSenti']))
        sample.append(str(data['clientName']))
        sample.append(str(data['month']))
        sample.append(str(data['day']))

        print(sample, flush=True)
    except KeyError:
        return jsonify({'error': 'No input sent'})

    prediction = predict_m1(sample)

    try:
        result = jsonify({'orderwise_sales_pred': float(prediction[0])})
    except Exception as e:
        result = jsonify({'error': str(e)})

    return result


@app.post('/predict_prodwise_reg')
def predict_prodwise_reg():
    data = request.json
    try:
        # [int(4),float(5000),float(0.6),float(0.7),'comp2','prodsku20','05','3']
        sample = []
        sample.append(int(data['qty']))
        sample.append(float(data['sales']))
        sample.append(float(data['cliAvgSenti']))
        sample.append(float(data['spAvgSenti']))
        sample.append(str(data['clientName']))
        sample.append(str(data['prodName']))
        sample.append(str(data['month']))
        sample.append(str(data['day']))

        print(sample, flush=True)
    except KeyError:
        return jsonify({'error': 'No input sent'})

    prediction = predict_m2(sample)

    try:
        result = jsonify({'prodwise_sales_pred': float(prediction[0])})
    except Exception as e:
        result = jsonify({'error': str(e)})

    return result


@app.post('/predict_prodwise_client_classif')
def predict_prodwise_client_classif():
    data = request.json
    try:
        # [int(4),float(5000),float(0.6),float(0.7),float(8000),'prodsku20','05','3']
        sample = []
        sample.append(int(data['orderQty']))
        sample.append(float(data['orderTotal']))
        sample.append(float(data['cliAvgSenti']))
        sample.append(float(data['spAvgSenti']))
        sample.append(float(data['sales']))
        sample.append(str(data['prodName']))
        sample.append(str(data['month']))
        sample.append(str(data['day']))

        print(sample, flush=True)
    except KeyError:
        return jsonify({'error': 'No input sent'})

    prediction = predict_m3(sample)

    try:
        result = jsonify({'prodwise_client_pred': str(prediction[0])})
    except Exception as e:
        result = jsonify({'error': str(e)})

    return result


@app.post('/predict_prodwise_product_classif')
def predict_prodwise_product_classif():
    data = request.json
    try:
        # [int(4),float(5000),float(0.6),float(0.7),float(8000),'comp2','05','3']
        sample = []
        sample.append(int(data['orderQty']))
        sample.append(float(data['orderTotal']))
        sample.append(float(data['cliAvgSenti']))
        sample.append(float(data['spAvgSenti']))
        sample.append(float(data['sales']))
        sample.append(str(data['clientName']))
        sample.append(str(data['month']))
        sample.append(str(data['day']))

        print(sample, flush=True)
    except KeyError:
        return jsonify({'error': 'No input sent'})

    prediction = predict_m4(sample)

    try:
        result = jsonify({'prodwise_product_pred': str(prediction[0])})
    except Exception as e:
        result = jsonify({'error': str(e)})

    return result


@app.post('/predict_clientwise_reg')
def predict_clientwise_reg():
    data = request.json
    try:
        # [int(4),'comp2','05','3']
        sample = []
        sample.append(int(data['qty']))
        sample.append(str(data['clientName']))
        sample.append(str(data['month']))
        sample.append(str(data['day']))

        print(sample, flush=True)
    except KeyError:
        return jsonify({'error': 'No input sent'})

    prediction = predict_m5(sample)

    try:
        result = jsonify({'clientwise_sales_pred': float(prediction[0])})
    except Exception as e:
        result = jsonify({'error': str(e)})

    return result


@app.post('/predictpment')
def predict_pment():
    data = request.json
    cgpa = float(data['cgpa'])
    iq = int(data['iq'])
    profile_score = int(data['profile_score'])
    pred = predict_pment_op(
        np.array([cgpa, iq, profile_score]).reshape(1, 3))
    try:
        result = jsonify({'pment': int(pred[0])})

    except Exception as e:
        result = jsonify({'error': str(e)})

    return result


if __name__ == "__main__":
    app.run(host="0.0.0.0", debug=True)
