import * as React from 'react';

class Home extends React.Component {  
  render() {
    return (   
      <h3>Home {JSON.stringify(this.props)}</h3>
    );
  }
}

export default Home;
