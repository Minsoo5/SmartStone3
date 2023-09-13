element.addEventListener('click', addKnife);

function addKnife() {
  const knifeStyle = document.getElementById('knifeStyle').value;
  const metalType = document.getElementById('metalType').value;
  const bevelSides = document.getElementById('bevelSides').value;
  const currentSharpnessLevel = document.getElementById('currentSharpness').value;
  const desiredOutcome = document.getElementById('desiredOutcome').value;

  const knifeData = {
    knifeStyle,
    knifeSize: null,
    metalType,
    bevelSides,
    currentSharpnessLevel,
    desiredOutcome,
    startingStone: 'Starting Stone: ',
    middleStone: 'Middle Stone: ',
    finishStone: 'Finishing Stone: ',
    stones: [
      {
        id: 4,
        gritLevel: 1000,
        sharpnessLimit: 4,
      },
      {
        id: 6,
        gritLevel: 2000,
        sharpnessLimit: 6,
      },
      {
        id: 9,
        gritLevel: 8000,
        sharpnessLimit: 9,
      },
    ],
  };

  fetch('http://localhost:8080/api/knives', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(knifeData),
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
