import React from 'react';
import { connect } from 'react-redux';

import { setImage, flipCard } from '../../actions/card';

export class ImageForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      errorMessage: ''
    };
  }

  searchImage(e) {
    e.preventDefault();
    if (this.props.isCardFlipped) {
      this.props.dispatch(flipCard());
    }
    const page = 1;
    const per_page = 10;
    const orientation = 'landscape';
    const query = this.searchInput.value;
    const unsplashAuth =
      'Client-ID 72f712e5e78353fa3a7bb238edf115fdb80e04120f85d42b48f85ffb5e849cca';
    let url = `https://api.unsplash.com/search/photos?page=${page}&per_page=${per_page}&orientation=${orientation}&query=${query}`;
    fetch(`${url}`, {
      headers: {
        method: 'GET',
        'Content-Type': 'application/JSON',
        'Accept-Version': 'v1',
        Authorization: `${unsplashAuth}`
      }
    })
      .then(response => response.json())
      .then(data => {
        if (data.total === 0) {
          this.setState({ errorMessage: 'There were no results. Try a simpler search term' });
        } else {
          this.setState({ errorMessage: '' });
          const image = {
            full: data.results[1].urls.regular,
            thumb: data.results[1].urls.thumb,
            alt: data.results[1].description,
            credit: data.results[1].user.name,
            portfolio: data.results[1].user.links.html
          };
          this.props.dispatch(setImage(image));
        }
      });
  }

  handleNoResults() {}

  render() {
    return (
      <div className="create-page-form-wrapper">
        <form onSubmit={e => this.searchImage(e)}>
          <label htmlFor="search">1) Search for an image</label>
          <div className="create-page-form-row">
            <input
              id="search"
              placeholder="e.g. London, Paris, cat, nature"
              required={true}
              ref={input => (this.searchInput = input)}
            />
            <button type="submit">Search</button>
          </div>
          <div className="error-message">{this.state.errorMessage}</div>
        </form>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  isCardFlipped: state.card.isCardFlipped
});

export default connect(mapStateToProps)(ImageForm);
