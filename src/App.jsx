import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import './App.css';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      upload: false,
      filePath: '',
    };
  }

  fileInput = (event) => {
    console.log(event.target.files[0]);
    const data = new FormData();
    data.append('file', event.target.files[0]);
    this.setState({
      ...this.state,
      data,
      filePath: `/project/val/w/${event.target.files[0].name}`,
    });
  }

  saveFile = () => {
    console.log('called');
    axios.post('/upload', this.state.data).then((response) => {
      console.log('response::', response);
      this.setState({
        ...this.state,
        upload: true,
      });
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
    if (!this.state.upload) {
      return (
        <div className="App-main">
          <div className="App-Head">Supermarket Grocery Detection Using Deep Learning</div>
          <div className="App-inp">
            <input type="file" onChange={this.fileInput} />
            <button onClick={() => this.saveFile()}>Upload</button>
          </div>
        </div>
      );
    }
    return (
      <div>
        <div className="App-Head">Supermarket Grocery Detection Using Deep Learning</div>
        {/* <div className="App-inp">
          <input type="file" onChange={this.fileInput} />
          <button onClick={() => this.saveFile()}>Upload</button>
        </div> */}
        <div className="App-img">
          <div>
            <img width="300px" height="300px" alt="text" src={this.state.filePath} />
          </div>
          <div><button onClick={() => this.predict()}>Predict</button></div>
          <div>
            The above item is predicted to be: {this.state.predictedValue}
          </div>
        </div>
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
