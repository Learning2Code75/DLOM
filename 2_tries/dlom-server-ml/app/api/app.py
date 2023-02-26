from flask import Flask, jsonify, request
from utilities import predict_pipeline
from utilities import predict_pment_op
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
