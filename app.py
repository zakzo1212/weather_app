from flask import Flask, jsonify, request
import openai

app = Flask(__name__)
openai.api_key = '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'

@app.route('/outfit-recommendation', methods=['POST'])
def generate_outfit_recommendation():
    # Retrieve weather data from the request
    weather_data = request.get_json()

    # Extract relevant information from weather data
    temperature = weather_data['temperature']
    weather_code = weather_data['weather_code']

    # Generate outfit recommendation using the OpenAI API
    outfit_recommendation = generate_outfit(temperature, weather_code)

    # Return the outfit recommendation as JSON response
    return jsonify({'outfit': outfit_recommendation})

def generate_outfit(temperature, weather_code):
    # Craft a prompt for outfit recommendation
    prompt = f"Based on the current weather conditions: temperature={temperature}, weather_code={weather_code}, please suggest an outfit recommendation."

    # Make the API call to OpenAI language model
    response = openai.Completion.create(
        engine='text-davinci-003',  # Specify the language model to use
        prompt=prompt,
        max_tokens=100,  # Adjust the maximum length of the generated text
        temperature=0.7,  # Adjust the randomness of the generated text
        n=1  # Specify the number of response choices to receive
    )

    # Retrieve and return the outfit recommendation
    outfit_recommendation = response.choices[0].text.strip()
    return outfit_recommendation

if __name__ == '__main__':
    app.run()

