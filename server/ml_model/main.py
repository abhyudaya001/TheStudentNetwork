from nltk.corpus import stopwords
from sklearn.metrics.pairwise import cosine_similarity
from gensim.models.doc2vec import Doc2Vec, TaggedDocument
import matplotlib.pyplot as plt
from tqdm import tqdm
from nltk.tokenize import word_tokenize   # module for tokenizing strings
from nltk.stem import PorterStemmer        # module for stemming
import numpy as np
import pandas as pd
import os
from sklearn.model_selection import train_test_split
import re                                  # library for regular expression operations
import string                              # for string operations
from pymongo import MongoClient

from flask import Flask, request, render_template, jsonify, make_response
from flask_cors import CORS


app = Flask(__name__, template_folder='templates')
CORS(app)

client = MongoClient(
    "mongodb+srv://abhyudayakandwal001:tsn@cluster0.r0ibasw.mongodb.net/?retryWrites=true&w=majority")
db = client["test"]
collection1 = db["posts"]
collection2 = db["posts"]
# io = collection.find({})


# def get_posts():
#     # Fetch data from the "post" collection
#     posts = list(io)

#     # Return the fetched data as a JSON response
#     return posts

data_df_text = list(collection1.find({}))
data_df = list(collection2.find({}))

# for i in range(len(data_df)):
#     print(data_df[i]["_id"])
# print(data_df_text[0])


def remove_punctuation(text):
    return "".join(["" if ch in string.punctuation else ch.lower() for ch in text])


stopwords_english = set(stopwords.words('english'))


def clean_words(headline):
    return [
        word for word in headline
        if word not in stopwords_english
    ]


stemmer = PorterStemmer()


def words_stems(headline):
    return [
        stemmer.stem(word) for word in headline
    ]


def tokenize_text(text):
    return word_tokenize(text)


def remove_numbers(text):
    return re.sub("[^a-zA-Z]", " ", text)


for i in range(len(data_df_text)):
    data_df_text[i]['title'] = remove_punctuation(
        data_df_text[i]['title'])
    data_df_text[i]['title'] = remove_numbers(
        data_df_text[i]['title'])
    data_df_text[i]['title'] = tokenize_text(
        data_df_text[i]['title'])
    data_df_text[i]['title'] = clean_words(
        data_df_text[i]['title'])

# print(data_df_text[0])

tagged_data = []
for i, item in enumerate(data_df_text):
    title = item.get("title")
    tagged_data.append(TaggedDocument(title, [i]))

# model = Doc2Vec(tagged_data, vector_size=20, window=2,
#                 min_count=1, workers=4, epochs=100)

# model.save("st_doc2vec.model")

model = Doc2Vec.load("st_doc2vec.model")


def get_embedding(sentence):
    func_embeddings, func_item_name = [], []
    for word in sentence:
        try:
            vec = model.wv[word]
            func_embeddings.append(vec)
            func_item_name.append(sentence)
        except:
            pass
    return func_embeddings


for i in range(len(data_df_text)):
    texts = data_df_text[i]["title"]
    embed_list = []
    for text in texts:
        embed_list.append(get_embedding(text))
    data_df_text[i]["embeddings"] = embed_list

# print(data_df_text[0])

# ques = "overlay an image in CSS"


@app.route('/')
def hello():
    return 'Hello, World!'


@app.route("/recommend", methods=["GET"])
def recommend():
    # print(hello)
    tag = request.args.get("tag")
    print(tag)
    recommended_posts = predict_similar_string(tag)
    print(recommended_posts)
    return jsonify(recommended_posts)


def predict_similar_string(ques):
    print(ques)
    score_list = []
    # print("length of datadf is " + str(len(data_df_text)))
    for i in range(len(data_df_text)):
        if data_df_text[i]['embeddings']:
            func_embeddings = data_df_text[i]['embeddings'][0]
        else:
            continue

        # print(func_embeddings)
        func_embeddings2, func_item_name2 = [], []
        for word in ques.split():

            try:
                vec = model.wv[word]
                func_embeddings2.append(vec)

            except:
                pass
        final_vec2 = [0]*model.wv.vector_size
        # if (i == 2):
        #     print(data_df_text[3]);
        # print(func_embeddings)
        # print(".................................")
        # print(func_embeddings2)
        for v in func_embeddings2:
            final_vec2 += v

        try:
            x = func_embeddings
            y = func_embeddings2
            # print(type(x))
            # print(type(y))
            # print(x)
            # print(y)
            score = cosine_similarity(x, y)
            # print("score completed")
            score = np.mean(score)
            # print(data_df[i]['description'])
            # print("score completed")
            # print(score)
            score_list.append([score, data_df[i]['_id'], data_df[i]['userId'], data_df[i]['firstName'], data_df[i]['lastName'], data_df[i]['title'],
                              data_df[i]['description'], data_df[i]['likes'], data_df[i]['comments'], data_df[i]['createdAt'], data_df[i]['updatedAt']])
            # print(score_list)
        except:
            pass
            # Code to handle the exception
            # print("An exception occurred:", e)

    score_list.sort(reverse=True)
    print(len(score_list))
    res = []
    try:
        res = [{"_id": str(row[1]), "userId": row[2], "firstName": row[3], "lastName":row[4], "title":row[5], "description":row[6], "likes":row[7], "comments":row[8], "createdAt":row[9], "updatedAt":row[10]}
               for row in score_list][:10]
        # print(res)
        return res
    except:
        return "nan"


# predict_similar_string()

# predict_similar_string("overlay an image in CSS")

if __name__ == "__main__":
    app.run(debug=True)
