import React from 'react'

import Filters from './Filters'
import PetBrowser from './PetBrowser'

class App extends React.Component {
  constructor() {
    super()

    this.state = {
      pets: [],
      filters: {
        type: 'all'
      }
    }
  }

  onAdoptPet = id => {
    const pets = this.state.pets.map(p => {
      return p.id === id ? { ...p, isAdopted: true } : p;
    });
    this.setState({ pets });
  };

  onChangeType = (newType) => {
    this.setState({
      filters:{
        ...this.state.filters,
        type: newType
      }
    })
  }

  onFindPetsClick = () => {
    let selection = this.state.filters.type
    let query = "/api/pets"
    switch (selection) {
      case "dog":
        query = "/api/pets?type=dog"
        break;
      case "micropig":
        query = "/api/pets?type=micropig"
        break;
      case "cat":
        query = "/api/pets?type=cat"
        break;
      default:
        query = "/api/pets"
    }
    fetch(query).then(response => response.json()).then(
      data=>this.setState({pets:data})
    )
  }

  render() {
    return (
      <div className="ui container">
        <header>
          <h1 className="ui dividing header">React Animal Shelter</h1>
        </header>
        <div className="ui container">
          <div className="ui grid">
            <div className="four wide column">
              <Filters
                onChangeType={this.onChangeType}
                onFindPetsClick={this.onFindPetsClick}
              />
            </div>
            <div className="twelve wide column">
              <PetBrowser
                pets={this.state.pets}
                onAdoptPet={this.onAdoptPet}
              />
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default App
