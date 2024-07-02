from flask import Flask, jsonify, request
import requests
import time
from collections import deque

app = Flask(__name__)

WINDOW_SIZE = 10
numbers = deque(maxlen=WINDOW_SIZE)

# Dummy URL for the third-party API (replace with the actual one)
THIRD_PARTY_API_URL = 'https://example.com/api/getNumber'

def fetch_number():
    try:
        start_time = time.time()
        response = requests.get(THIRD_PARTY_API_URL, timeout=0.5)
        response_time = time.time() - start_time
        if response_time > 0.5 or response.status_code != 200:
            return None
        return response.json().get('number')
    except requests.exceptions.RequestException:
        return None

@app.route('/numbers/<numberid>', methods=['GET'])
def get_numbers(numberid):
    if numberid not in ['p', 'f', 'e', 'r']:
        return jsonify({"error": "Invalid number ID"}), 400

    prev_state = list(numbers)
    number = fetch_number()

    if number and number not in numbers:
        numbers.append(number)

    avg = sum(numbers) / len(numbers) if numbers else 0

    return jsonify({
        'windowPrevState': prev_state,
        'windowCurrState': list(numbers),
        'numbers': [number],
        'avg': avg
    })

if __name__ == '__main__':
    app.run(debug=True)
