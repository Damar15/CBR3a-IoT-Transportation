import requests
from dotenv import dotenv_values

config = dotenv_values(".env")

topic = "bus/malang"
message = "Hello world!"

# create and format values for HTTPS request
publish_url = 'https://' + config["ENDPOINT"] + ':8443/topics/' + topic + '?qos=1'
publish_msg = message.encode('utf-8')

# make request
publish = requests.request('POST',
            publish_url,
            data=publish_msg,
            cert=[config["CERT"], config["KEY"]])

# print results
print("Response status: ", str(publish.status_code))
if publish.status_code == 200:
        print("Response body:", publish.text)