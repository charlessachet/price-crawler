# -*- coding: utf-8 -*-
from pymongo import MongoClient
from datetime import datetime


class Persistence():

    def __init__(self):
        client = MongoClient('mongodb://mongo:27017/price_crawler')
        self.db = client['price_crawler']

    def get_users(self):
        users = self.db.users.find()
        return users

    def persist_product(self, user, product):
        self.db.users.update_one(
                {"_id": user, "products._id": product["_id"]},
                {"$push" : {"products.$.prices" : {"value": product["current_price"], "date": datetime.utcnow()}},
                    "$set": {"products.$.best_price": product["best_price"], "products.$.current_price": product["current_price"], "products.$.current_variation": product["current_variation"]}})
