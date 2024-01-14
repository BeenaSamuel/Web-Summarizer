function getActiveTabUrl() {
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
      var currentUrl = tabs[0].url;
  
      // Send POST request to the Flask app with the URL
      fetch('http://localhost:5000/summarize', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ url: currentUrl })
      })
      .then(response => response.json())
      .then(data => {
        if (data.error) {
          // Handle error
          console.error('Error:', data.error);
          document.getElementById("summary").innerHTML = "An error occurred: " + data.error;
        } else {
          // Display the summary
          document.getElementById("summary").innerHTML = "Summary:<br>" + data.summary;
        }
      })
      .catch(error => {
        // Handle network errors
        console.error('Network error:', error);
        document.getElementById("summary").innerHTML = "A network error occurred.";
      });
    });
  }
  
  document.getElementById("summarizeButton").addEventListener("click", getActiveTabUrl);
  