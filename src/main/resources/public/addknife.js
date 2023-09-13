element.addEventListener('click', addKnife);

function addKnife() {
  const knifeStyle = document.getElementById('knifeStyle').value;
  const metalType = document.getElementById('metalType').value;
  const bevelSides = document.getElementById('bevelSides').value;
  const currentSharpness = document.getElementById('currentSharpness').value;
  const desiredOutcome = document.getElementById('desiredOutcome').value;

  const data = {
    knifeStyle,
    metalType,
    bevelSides,
    currentSharpness,
    desiredOutcome,
  };

  fetch('http://localhost:8080/api/knives', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  })
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .then(responseData => {
      // Handle the response data here
      console.log('Response Data:', responseData);
    })
    .catch(error => {
      // Handle any errors that occurred during the fetch
      console.error('Fetch Error:', error);
    });
}
