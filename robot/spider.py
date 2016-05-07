# -*- coding: utf-8 -*-
import requests
import re
import time
import logging
from product_loader import Persistence


def _scrape_price(pattern, response_body):
    price = re.compile(pattern).search(response_body)
    if price:
        return float(price.group(1))


def _set_best_price(product):
    if product['best_price'] > product['current_price']:
        product['best_price'] = product['current_price']
    return product


def _set_current_variation(product):
    product['current_variation'] = (
        (product['current_price'] * 100) / product['first_price']
    ) - 100
    return product

STORES = {
    'Americanas': 'price/salesPrice" content="([^"]+)',
    'Shoptime': 'price/salesPrice">R\$\s+([^<]+)',
    'Submarino': 'price/salesPrice" content="([^"]+)',
    'Pontofrio': 'sale price">([^<]+)',
}

def _sleep_seconds(seconds):
    time.sleep(seconds)

def main():

    while True:
        persistence = Persistence()
        users = persistence.get_users()
        for user in users:
            for product in user['products']:
                logging.info('User: ' + user['username'] + ' Product: ' + str(product))
                response = requests.get(product['link'])
                if response.status_code != 200:
                    print "Request error!"
                product['current_price'] = _scrape_price(
                    STORES[product['store_name']], response.text
                )
                product = _set_best_price(product)
                product = _set_current_variation(product)
                persistence.persist_product(user['_id'], product)
            _sleep_seconds(2)
        _sleep_seconds(600)

if __name__ == "__main__":
    main()
