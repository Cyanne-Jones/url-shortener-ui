import React, { Component } from 'react';
import './App.css';
import { getUrls } from '../../apiCalls';
import UrlContainer from '../UrlContainer/UrlContainer';
import UrlForm from '../UrlForm/UrlForm';

export class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      urls: [],
      error: ""
    }
  }

  componentDidMount() {
    getUrls()
      .then(res => this.setState({urls: res.urls}))
      .catch(error => this.setState({error: error.message}))
  }

  addUrl = (newUrl) => {
    fetch("http://localhost:3001/api/v1/urls", {
      method: "POST",
      body: JSON.stringify(newUrl),
      headers: {
        "Content-Type": "application/json"
      }
    })
    .then(res => res.json())
    .then(res =>  this.setState({urls: [...this.state.urls, res]}))
    .catch(error => this.setState({error: error.message}))
  }

  render() {
    return (
      <main className="App">
        {this.state.error && <p>{this.state.error}</p>}
        <header>
          <h1>URL Shortener</h1>
          <UrlForm addUrl={this.addUrl}/>
        </header>

        <UrlContainer urls={this.state.urls}/>
      </main>
    );
  }
}

export default App;
