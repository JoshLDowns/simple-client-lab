import React, { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [animals, setAnimals] = useState(null);
  const [animalNumber, setAnimalNumber] = useState("");
  const [error, setError] = useState(null);

  const handleMoreAnimals = () => {
    fetch(`https://jd-animal-api.herokuapp.com/animal/${animalNumber}`)
      .then(res => res.json())
      .then(animalArray => {
        if (animalArray.message) {
          setError(animalArray.message)
        } else {
          let newAnimalArray = animals.concat(animalArray)
          setAnimals(newAnimalArray);
        }
      })
  }

  const handleLessAnimals = () => {
    if (animals.length > 1) {
      let currentAnimals = [...animals]
      currentAnimals.pop()
      setAnimals(currentAnimals)
    } else {
      alert("There must always be one cute animal!")
    }
  }

  useEffect(() => {
    if (!animals) {
      fetch("https://jd-animal-api.herokuapp.com/animal")
        .then((res) => res.json())
        .then((animalObj) => {
          setAnimals([animalObj]);
        });
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (error) {
      alert(error);
      setError(null);
      setAnimalNumber("")
    }
  }, [error])

  return (
    <div id="main-wrapper">
      <h1>Awww Cute Animals!</h1>
      <br />
      <input value={animalNumber} onChange={(evt) => setAnimalNumber(evt.target.value)} />
      <br />
      <button
        onClick={handleMoreAnimals}
        disabled={animalNumber.length === 0}
      >
        MORE CUTE!
      </button>
      <br />
      <button
        onClick={handleLessAnimals}
      >LESS CUTE!</button>
      <br />
      {animals ? (
        animals.map((animal) => (
          <div className="animal-wrapper" key={animal.name}>
            <img src={animal.img} alt={animal.name} className="animal-img" />
            <h3>{animal.name}</h3>
            <h5>{`Birthday: ${new Date(
              animal.birthday
            ).toLocaleDateString()}`}</h5>
          </div>
        ))
      ) : (
        <p>...Loading</p>
      )}
    </div>
  );
}

export default App;
