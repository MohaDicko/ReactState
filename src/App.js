// Importation des modules nécessaires depuis React et le fichier de style CSS
import React, { Component } from 'react';
import './App.css';

// Définition de la classe App qui étend la classe Component de React
class App extends Component {
  // Constructeur pour initialiser l'état de la classe
  constructor(props) {
    super(props);
    // Initialisation de l'état avec les informations de la personne, 
    // une variable 'shows' pour déterminer si le profil est affiché,
    // un timestamp 'lastMounted' pour enregistrer le moment où le composant est monté,
    // et un intervalle pour suivre le temps écoulé depuis le montage
    this.state = {
      person: {
        fullName: 'John Doe',
        bio: 'A software developer from California.',
        imgSrc: 'https://via.placeholder.com/150',
        profession: 'Software Developer'
      },
      shows: false,
      lastMounted: null,
      interval: 0
    };
  }

  // Méthode du cycle de vie qui s'exécute après que le composant a été monté
  componentDidMount() {
    // Enregistrement du timestamp actuel dans l'état
    this.setState({ lastMounted: Date.now() });
    // Mise en place d'un intervalle qui met à jour l'état toutes les secondes
    this.intervalId = setInterval(() => {
      // Calcul du temps écoulé depuis le montage en secondes et mise à jour de l'état
      this.setState({ interval: Math.floor((Date.now() - this.state.lastMounted) / 1000) });
    }, 1000);
  }

  // Méthode du cycle de vie qui s'exécute juste avant que le composant soit démonté
  componentWillUnmount() {
    // Nettoyage de l'intervalle pour éviter les fuites de mémoire
    clearInterval(this.intervalId);
  }

  // Méthode pour basculer l'état 'shows' entre true et false
  toggleShow = () => {
    this.setState((prevState) => ({ shows: !prevState.shows }));
  };

  // Méthode render pour définir ce qui est affiché à l'écran
  render() {
    const { person, shows, interval } = this.state; // Déstructuration de l'état
    return (
      <div className="App">
        <header className="App-header">
          {/* Bouton pour afficher ou masquer le profil */}
          <button onClick={this.toggleShow}>
            {shows ? 'Hide Profile' : 'Show Profile'}
          </button>
          {/* Affichage du profil si 'shows' est vrai */}
          {shows && (
            <div className="profile">
              <img src={person.imgSrc} alt={person.fullName} />
              <h1>{person.fullName}</h1>
              <p>{person.bio}</p>
              <h2>{person.profession}</h2>
            </div>
          )}
          {/* Affichage du temps écoulé depuis le dernier montage */}
          <p>Time since last mount: {interval} seconds</p>
        </header>
      </div>
    );
  }
}

// Exportation de la classe App pour qu'elle puisse être utilisée dans d'autres fichiers
export default App;
