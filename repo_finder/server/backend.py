from flask import Flask, request, jsonify
import subprocess

app = Flask(__name__)

@app.route('/run-python-script', methods=['POST'])
def run_python_script():
    script = request.json.get('script')
    local_storage_data = request.json.get('localStorageData')  # Get the data from local storage
    
    # You can now use 'local_storage_data' in your Python script as needed

    result = subprocess.run(['python', '-c', script], capture_output=True, text=True, check=True)
    return jsonify({"output": result.stdout, "error": result.stderr})

if __name__ == '__main__':
    app.run(debug=True)
