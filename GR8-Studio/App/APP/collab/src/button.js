import React from 'react';
class MyButton extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      text: null
    };
  }

  render() {
    return (
      <button
        className="myButton"
        onClick={() => {
          console.log('button clicked');
          this.setState({ text: 'Clicked' });
        }}>
        { this.state.text }
      </button>
    )
  }
}

export default MyButton;