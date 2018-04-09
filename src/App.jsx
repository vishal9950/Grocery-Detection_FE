import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import './App.css';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

    };
  }

  fileInput = (event) => {
    console.log(event.target.files[0]);
    const data = new FormData();
    data.append('file', event.target.files[0]);
    this.setState({
      data,
    });
  }

  saveFile = () => {
    console.log('called');
    axios.post('/upload', this.state.data).then((response) => {
      console.log(response);
    });
  }

  predict = () => {
    axios.get('/predict').then((predictedValue) => {
      this.setState({
        ...this.state,
        predictedValue: predictedValue.data,
      });
    });
  }

  render() {
    return (
      <div className="App-main">
        <input type="file" onChange={this.fileInput} />
        <button onClick={() => this.saveFile()}>Upload</button>
        <button onClick={() => this.predict()}>Predict</button>
        {this.state.predictedValue}
      </div>
    );
  }
}

const render = () => {
  ReactDOM.render(
    <App />,
    document.getElementById('root'),
  );
};


export default render;
