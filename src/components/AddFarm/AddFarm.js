import { TextField } from '@material-ui/core';
import React from 'react';
import './AddFarm.css';

export default class AddFarm extends React.Component {
  constructor(props) {
    super(props);
    console.log('i am the add farm constructor');
    this.state = {
      farmName: null,
      description: null,
      /* userID: null, // this.props.userID? */
      email: null,
      phone: null,
      address: null,
      zipCode: null,
    };
  }

  render() {
    const {
      farmName, description, email, phone, address, zipCode,
    } = this.state;

    return (
      <form>
        <h1>
          {farmName || 'no farm name :('}
          {description || 'no description :('}
          {email || 'no email :('}
          {phone || 'no phone :('}
          {address || 'no address :('}
          {zipCode || 'no zip code :('}
        </h1>
        <div>
          <TextField
            id="outlined-basic"
            label="Enter your farm name"
            required
            onChange={(event) => this.setState({ farmName: event.target.value })}
          />
        </div>
        <div>
          <TextField
            id="outlined-multiline-flexible"
            label="Enter your description"
            multiline
            rowsMax={4}
            onChange={(event) => this.setState({ description: event.target.value })}
          />
        </div>
        <TextField
          id="outlined-basic"
          label="Enter your email"
          required
          onChange={(event) => this.setState({ email: event.target.value })}
        />
        <div />
        <div>
          <TextField
            id="outlined-basic"
            label="Enter your phone number"
            required
            onChange={(event) => this.setState({ phone: event.target.value })}
          />
        </div>
        <div>
          <TextField
            id="outlined-basic"
            label="Enter your address"
            required
            onChange={(event) => this.setState({ address: event.target.value })}
          />
        </div>
        <div>
          <TextField
            id="outlined-basic"
            label="Enter your zip code"
            required
            onChange={(event) => this.setState({ zipCode: event.target.value })}
          />
        </div>
      </form>
    );
  }
}
