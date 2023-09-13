element.addEventListener('click', addKnife());

function addKnife() {
  const knifeStyle = document.getElementById('knifeStyle').value;
  const knifeSize = document.getElementById('knifeSize').value;
  const metalType = document.getElementById('metalType').value;
  const bevelSides = document.getElementById('bevelSides').value;
  const currentSharpnessLevel = document.getElementById('currentSharpness').value;
  const desiredOutcome = document.getElementById('desiredOutcome').value;

  const knifeData = {
    knifeStyle,
    knifeSize,
    metalType,
    bevelSides,
    currentSharpnessLevel,
    desiredOutcome,
    startingStone: 'Stone 1',
    middleStone: 'Stone 2',
    finishStone: 'Stone 3',
    stones: [
      {
        id: 4,
        gritLevel: 1000,
        sharpnessLimit: 4,
      },
      {
        id: 6,
        gritLevel: 3000,
        sharpnessLimit: 6,
      },
      {
        id: 9,
        gritLevel: 6000,
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
