from flask import Flask, request, jsonify, make_response
from peewee import *
from playhouse.shortcuts import model_to_dict, dict_to_model
import json
from flask_cors import CORS
from flask_cors import cross_origin






db = PostgresqlDatabase('inventory', user='postgres', password='postgres', host='localhost', port=5432)

class BaseModel(Model):
    class Meta:
        database = db

class Product(BaseModel):
    productName = CharField()
    companyName: CharField()
    year = IntegerField()
    refurbished = BooleanField()
    color = CharField()
    price = FloatField()
    size = CharField()
    screen = CharField()
    stock = IntegerField()
    img = CharField()
    
class Cart(BaseModel):
    productName = CharField()
    price = FloatField()
    img = CharField()
    
    

db.connect()
db.drop_tables([Product])
db.create_tables([Product])
db.drop_tables([Cart])
db.create_tables([Cart])


f = open('inventory.json')

data = json.load(f)

for product in data:
    Product.create(
        productName = product['productName'],
        companyName = product['companyName'],
        year = product['year'],
        refurbished = product['refurbished'],
        color = product['color'],
        price = product['price'],
        size = product['size'],
        screen = product['screen'],
        stock = product['stock'],
        img = product['img']
    )
    
app = Flask(__name__)
CORS(app)

@app.route('/', methods=['GET'])
def get_all_products():
    products = Product.select()
    products = [model_to_dict(product) for product in products]
    return jsonify(products)

@app.route('/<productName>', methods=['GET'])
def get_product(productName):
    product = Product.get(Product.productName == productName)
    product = model_to_dict(product)
    return jsonify(product)
  
@app.route('/add', methods=['POST'])
def add_product():
    payload = request.get_json()
    product = dict_to_model(Product, payload)
    product.save()
    return jsonify(model_to_dict(product))

@app.route('/update/<productName>', methods=['PUT'])
def update_product(productName):
    payload = request.get_json()
    product = Product.get(Product.productName == productName)
    product.productName = payload['productName']
    product.companyName = payload['companyName']
    product.year = payload['year']
    product.refurbished = payload['refurbished']
    product.color = payload['color']
    product.price = payload['price']
    product.size = payload['size']
    product.screen = payload['screen']
    product.stock = payload['stock']
    product.img = payload['img']
    product.save()
    return jsonify(model_to_dict(product))

@app.route('/delete/<productName>', methods=['DELETE'])
def delete_product(productName):
    
    product = Product.get(Product.productName == productName)
    product.delete_instance()
    return jsonify(model_to_dict(product))
  
@app.route('/search', methods=['GET'])
def search_product():
    payload = request.get_json()
    products = Product.select().where(Product.productName.contains(payload['productName']))
    products = [model_to_dict(product) for product in products]
    return jsonify(products)
  
@app.route('/cart', methods=['GET'])
def get_all_cart():
    products = Cart.select()
    products = [model_to_dict(product) for product in products]
    return jsonify(products)

@app.route('/cart/add', methods=['POST'])
def add_cart():
    payload = request.get_json()
    product = dict_to_model(Cart, payload)
    product.save()
    return jsonify(model_to_dict(product))

@app.route('/cart/delete/<productName>', methods=['DELETE'])
@cross_origin()
def delete_cart(productName):
    response = make_response()
    response.headers.add("Access-Control-Allow-Origin", "*")
    response.headers.add('Access-Control-Allow-Headers', "*")
    response.headers.add('Access-Control-Allow-Methods', "*")
    product = Cart.get(Cart.productName == productName)
    product.delete_instance()
    return jsonify(model_to_dict(product))
   
  
    
    
     
    product = dict_to_model(Cart, payload)
    product.save()
    return jsonify(model_to_dict(product)) 


app.run(debug=True, port=8000)

    



