import re
import pickle
import numpy as np
import pandas as pd

# nltk
from nltk.stem import WordNetLemmatizer

lemmatizer = WordNetLemmatizer()

with open('models/pipeline.pickle', 'rb') as f:
    loaded_pipe = pickle.load(f)

with open('models/model.pkl', 'rb') as f:
    pment_model = pickle.load(f)

with open('models/m1.pkl', 'rb') as f:
    m1_loaded = pickle.load(f)

with open('models/m2.pkl', 'rb') as f:
    m2_loaded = pickle.load(f)

with open('models/m3.pkl', 'rb') as f:
    m3_loaded = pickle.load(f)

with open('models/m4.pkl', 'rb') as f:
    m4_loaded = pickle.load(f)

with open('models/m5.pkl', 'rb') as f:
    m5_loaded = pickle.load(f)

with open('models/clientName_oe.pkl', 'rb') as f:
    clientName_oe_loaded = pickle.load(f)

with open('models/prodName_oe.pkl', 'rb') as f:
    prodName_oe_loaded = pickle.load(f)

with open('models/month_oe.pkl', 'rb') as f:
    month_oe_loaded = pickle.load(f)

with open('models/day_oe.pkl', 'rb') as f:
    day_oe_loaded = pickle.load(f)


def predict_m1(arr):
    test_m1_input = np.array(arr).reshape(1, 6)
    test_m1_input_df = pd.DataFrame(test_m1_input, columns=[
                                    'qty', 'cliAvgSenti', 'spAvgSenti', 'clientName', 'month', 'day'])

    test_m1_input_df_clientName = pd.DataFrame(clientName_oe_loaded.transform(
        test_m1_input_df['clientName']), columns=['clientName'])
    test_m1_input_df_month = pd.DataFrame(month_oe_loaded.transform(
        test_m1_input_df['month']), columns=['month'])
    test_m1_input_df_day = pd.DataFrame(
        day_oe_loaded.transform(test_m1_input_df['day']), columns=['day'])
    test_m1_input_df_transformed = pd.concat([test_m1_input_df.drop(
        columns=['clientName', 'month', 'day']), test_m1_input_df_clientName, test_m1_input_df_month, test_m1_input_df_day], axis=1)

    test_m1_input_df_transformed['qty'] = test_m1_input_df_transformed['qty'].astype(
        int)
    test_m1_input_df_transformed['cliAvgSenti'] = test_m1_input_df_transformed['cliAvgSenti'].astype(
        float)
    test_m1_input_df_transformed['spAvgSenti'] = test_m1_input_df_transformed['spAvgSenti'].astype(
        float)

    return m1_loaded.predict(test_m1_input_df_transformed)


def predict_m2(arr):
    test_m2_input = np.array(arr).reshape(1, 8)
    test_m2_input_df = pd.DataFrame(test_m2_input, columns=[
                                    'orderQty', 'orderTotal', 'cliAvgSenti', 'spAvgSenti', 'clientName', 'prodName', 'month', 'day'])

    test_m2_input_df_prodName = pd.DataFrame(prodName_oe_loaded.transform(
        test_m2_input_df['prodName']), columns=['prodName'])
    test_m2_input_df_clientName = pd.DataFrame(clientName_oe_loaded.transform(
        test_m2_input_df['clientName']), columns=['clientName'])
    test_m2_input_df_month = pd.DataFrame(month_oe_loaded.transform(
        test_m2_input_df['month']), columns=['month'])
    test_m2_input_df_day = pd.DataFrame(
        day_oe_loaded.transform(test_m2_input_df['day']), columns=['day'])
    test_m2_input_df_transformed = pd.concat([test_m2_input_df.drop(columns=['prodName', 'clientName', 'month', 'day']),
                                             test_m2_input_df_clientName, test_m2_input_df_prodName, test_m2_input_df_month, test_m2_input_df_day], axis=1)

    test_m2_input_df_transformed['orderQty'] = test_m2_input_df_transformed['orderQty'].astype(
        int)
    test_m2_input_df_transformed['orderTotal'] = test_m2_input_df_transformed['orderTotal'].astype(
        float)
    test_m2_input_df_transformed['cliAvgSenti'] = test_m2_input_df_transformed['cliAvgSenti'].astype(
        float)
    test_m2_input_df_transformed['spAvgSenti'] = test_m2_input_df_transformed['spAvgSenti'].astype(
        float)

    return m2_loaded.predict(test_m2_input_df_transformed)


def predict_m3(arr):
    test_m3_input = np.array(arr).reshape(1, 8)
    test_m3_input_df = pd.DataFrame(test_m3_input, columns=[
                                    'orderQty', 'orderTotal', 'cliAvgSenti', 'spAvgSenti', 'sales', 'prodName', 'month', 'day'])

    test_m3_input_df_prodName = pd.DataFrame(prodName_oe_loaded.transform(
        test_m3_input_df['prodName']), columns=['prodName'])
    test_m3_input_df_month = pd.DataFrame(month_oe_loaded.transform(
        test_m3_input_df['month']), columns=['month'])
    test_m3_input_df_day = pd.DataFrame(
        day_oe_loaded.transform(test_m3_input_df['day']), columns=['day'])
    test_m3_input_df_transformed = pd.concat([test_m3_input_df.drop(
        columns=['prodName', 'month', 'day']), test_m3_input_df_prodName, test_m3_input_df_month, test_m3_input_df_day], axis=1)

    test_m3_input_df_transformed['orderQty'] = test_m3_input_df_transformed['orderQty'].astype(
        int)
    test_m3_input_df_transformed['orderTotal'] = test_m3_input_df_transformed['orderTotal'].astype(
        float)
    test_m3_input_df_transformed['cliAvgSenti'] = test_m3_input_df_transformed['cliAvgSenti'].astype(
        float)
    test_m3_input_df_transformed['spAvgSenti'] = test_m3_input_df_transformed['spAvgSenti'].astype(
        float)
    test_m3_input_df_transformed['sales'] = test_m3_input_df_transformed['sales'].astype(
        float)

    return clientName_oe_loaded.inverse_transform(m3_loaded.predict(test_m3_input_df_transformed))


def predict_m4(arr):
    test_m4_input = np.array(arr).reshape(1, 8)
    test_m4_input_df = pd.DataFrame(test_m4_input, columns=[
                                    'orderQty', 'orderTotal', 'cliAvgSenti', 'spAvgSenti', 'sales', 'clientName', 'month', 'day'])

    test_m4_input_df_clientName = pd.DataFrame(clientName_oe_loaded.transform(
        test_m4_input_df['clientName']), columns=['clientName'])
    test_m4_input_df_month = pd.DataFrame(month_oe_loaded.transform(
        test_m4_input_df['month']), columns=['month'])
    test_m4_input_df_day = pd.DataFrame(
        day_oe_loaded.transform(test_m4_input_df['day']), columns=['day'])
    test_m4_input_df_transformed = pd.concat([test_m4_input_df.drop(
        columns=['clientName', 'month', 'day']), test_m4_input_df_clientName, test_m4_input_df_month, test_m4_input_df_day], axis=1)

    test_m4_input_df_transformed['orderQty'] = test_m4_input_df_transformed['orderQty'].astype(
        int)
    test_m4_input_df_transformed['orderTotal'] = test_m4_input_df_transformed['orderTotal'].astype(
        float)
    test_m4_input_df_transformed['cliAvgSenti'] = test_m4_input_df_transformed['cliAvgSenti'].astype(
        float)
    test_m4_input_df_transformed['spAvgSenti'] = test_m4_input_df_transformed['spAvgSenti'].astype(
        float)
    test_m4_input_df_transformed['sales'] = test_m4_input_df_transformed['sales'].astype(
        float)

    return prodName_oe_loaded.inverse_transform(m4_loaded.predict(test_m4_input_df_transformed))


def predict_m5(arr):
    test_m5_input = np.array(arr).reshape(1, 4)
    test_m5_input_df = pd.DataFrame(
        test_m5_input, columns=['qty', 'cliName', 'month', 'day'])

    test_m5_input_df_clientName = pd.DataFrame(clientName_oe_loaded.transform(
        test_m5_input_df['cliName']), columns=['cliName'])
    test_m5_input_df_month = pd.DataFrame(month_oe_loaded.transform(
        test_m5_input_df['month']), columns=['month'])
    test_m5_input_df_day = pd.DataFrame(
        day_oe_loaded.transform(test_m5_input_df['day']), columns=['day'])
    test_m5_input_df_transformed = pd.concat([test_m5_input_df.drop(
        columns=['cliName', 'month', 'day']), test_m5_input_df_clientName, test_m5_input_df_month, test_m5_input_df_day], axis=1)

    test_m5_input_df_transformed['qty'] = test_m5_input_df_transformed['qty'].astype(
        int)

    return m5_loaded.predict(test_m5_input_df_transformed)


def predict_pment_op(arr):
    return pment_model.predict(arr)


def predict_pipeline(text):
    return predict(loaded_pipe, text)


# Defining dictionary containing all emojis with their meanings.
emojis = {':)': 'smile', ':-)': 'smile', ';d': 'wink', ':-E': 'vampire', ':(': 'sad',
          ':-(': 'sad', ':-<': 'sad', ':P': 'raspberry', ':O': 'surprised',
          ':-@': 'shocked', ':@': 'shocked', ':-$': 'confused', ':\\': 'annoyed',
          ':#': 'mute', ':X': 'mute', ':^)': 'smile', ':-&': 'confused', '$_$': 'greedy',
          '@@': 'eyeroll', ':-!': 'confused', ':-D': 'smile', ':-0': 'yell', 'O.o': 'confused',
          '<(-_-)>': 'robot', 'd[-_-]b': 'dj', ":'-)": 'sadsmile', ';)': 'wink',
          ';-)': 'wink', 'O:-)': 'angel', 'O*-)': 'angel', '(:-D': 'gossip', '=^.^=': 'cat'}

# Defining set containing all stopwords in english.
stopwords = ['a', 'about', 'above', 'after', 'again', 'ain', 'all', 'am', 'an',
             'and', 'any', 'are', 'as', 'at', 'be', 'because', 'been', 'before',
             'being', 'below', 'between', 'both', 'by', 'can', 'd', 'did', 'do',
             'does', 'doing', 'down', 'during', 'each', 'few', 'for', 'from',
             'further', 'had', 'has', 'have', 'having', 'he', 'her', 'here',
             'hers', 'herself', 'him', 'himself', 'his', 'how', 'i', 'if', 'in',
             'into', 'is', 'it', 'its', 'itself', 'just', 'll', 'm', 'ma',
             'me', 'more', 'most', 'my', 'myself', 'now', 'o', 'of', 'on', 'once',
             'only', 'or', 'other', 'our', 'ours', 'ourselves', 'out', 'own', 're',
             's', 'same', 'she', "shes", 'should', "shouldve", 'so', 'some', 'such',
             't', 'than', 'that', "thatll", 'the', 'their', 'theirs', 'them',
             'themselves', 'then', 'there', 'these', 'they', 'this', 'those',
             'through', 'to', 'too', 'under', 'until', 'up', 've', 'very', 'was',
             'we', 'were', 'what', 'when', 'where', 'which', 'while', 'who', 'whom',
             'why', 'will', 'with', 'won', 'y', 'you', "youd", "youll", "youre",
             "youve", 'your', 'yours', 'yourself', 'yourselves']


# grouping together the inflected forms ("better" -> "good")


def preprocess(textdata):
    processed_texts = []

    # Defining regex patterns.
    url_pattern = r"((http://)[^ ]*|(https://)[^ ]*|( www\.)[^ ]*)"
    user_pattern = '@[^\s]+'
    alpha_pattern = "[^a-zA-Z0-9]"
    sequence_pattern = r"(.)\1\1+"
    seq_replace_pattern = r"\1\1"

    for tweet in textdata:
        tweet = tweet.lower()

        # Replace all URls with 'URL'
        tweet = re.sub(url_pattern, ' URL', tweet)
        # Replace all emojis.
        for emoji in emojis.keys():
            tweet = tweet.replace(emoji, "EMOJI" + emojis[emoji])
            # Replace @USERNAME to 'USER'.
        tweet = re.sub(user_pattern, ' USER', tweet)
        # Replace all non alphabets.
        tweet = re.sub(alpha_pattern, " ", tweet)
        # Replace 3 or more consecutive letters by 2 letter.
        tweet = re.sub(sequence_pattern, seq_replace_pattern, tweet)

        preprocessed_words = []
        for word in tweet.split():
            # Check if the word is a stopword.
            if len(word) > 1 and word not in stopwords:
                # Lemmatizing the word.
                word = lemmatizer.lemmatize(word)
                preprocessed_words.append(word)

        processed_texts.append(' '.join(preprocessed_words))

    return processed_texts


def predict(model, text):
    # Predict the sentiment
    preprocessed_text = preprocess(text)
    predictions = model.predict(preprocessed_text)

    pred_to_label = {0: 'Negative', 1: 'Positive'}

    # Make a list of text with sentiment.
    data = []
    for t, pred in zip(text, predictions):
        print({'text': t, 'pred': int(pred), 'label': pred_to_label[pred]})
        data.append({'text': t, 'pred': int(pred),
                    'label': pred_to_label[pred]})

    return data


if __name__ == "__main__":
    # Text to classify should be in a list.
    text = ["I hate twitter",
            "May the Force be with you.",
            "Mr. Stark, I don't feel so good"]

    predictions = predict_pipeline(text)
    print(predictions)
