import logo from "../logo.svg";
import "../App.css";
import React from 'react'

function HomePage(props) {
const user = props.user
  return (
    <div className="App">
    {console.log(props)}
      <header className="App-header">
        <img src="http://www.jobari.com/wp-content/themes/jobari/img/jobari-logo.png" className="App-logo" alt="logo" />
       <br />
       {user &&
        <h1>
          Bienvenido {user.username}.
        </h1>}
        {!user &&
          <h1>
            Bienvenido, por favor inicia sesión.
          </h1>}
      </header>
    </div>
  );
}

export default HomePage;
