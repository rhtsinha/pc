import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { saveCard, updateCard, setEditing } from '../../actions/card';
import { CLIENT_BASE_URL } from '../../config';
import './create-page.css';
import '../card/card.css';

import ImageForm from './image-form';
import MessageForm from './message-form';
import CardContainer from '../card/card-container';
import RecipientForm from './recipient-form';
import SavedCards from './saved-cards';

export class CreatePage extends React.Component {
  saveCard() {
    const { full, thumb, alt, credit, portfolio } = this.props.image;
    const currentCard = {
      username: this.props.currentUser,
      image: {
        full,
        thumb,
        alt,
        credit,
        portfolio
      },
      message: this.props.message,
      recipients: this.props.recipients
    };
    this.props.dispatch(saveCard(currentCard));
  }

  updateCard() {
    const { full, thumb, alt, credit, portfolio } = this.props.image;
    const currentCard = {
      image: {
        full,
        thumb,
        alt,
        credit,
        portfolio
      },
      message: this.props.message,
      recipients: this.props.recipients
    };
    const id = this.props.editingId;
    this.props.dispatch(updateCard(id, currentCard));
    this.props.dispatch(setEditing(false));
  }

  render() {
    console.log(`currentUser: ${this.props.currentUser}`);
    return (
      <main role="main">
        <ImageForm />
        <CardContainer card={this.props.card} />
        <MessageForm />
        <RecipientForm />
        <div className="card-btn-wrapper">
          <Link to="/preview">
            <button className="create-page-btn">Preview</button>
          </Link>
          <button
            className={this.props.currentUser ? 'create-page-btn' : 'hidden'}
            onClick={e => (!this.props.editing ? this.saveCard(e) : this.updateCard(e))}
          >
            {!this.props.editing ? 'Save' : 'Save changes'}
          </button>

          <a
            href={`mailto:${this.props.recipients}?subject=${
              this.props.currentUser ? this.props.currentUser : 'Demo User'
            } sent you a postcard!&body=Click on this link to view the postcard: ${CLIENT_BASE_URL}/preview`}
          >
            <button
              className="create-page-btn"
              onClick={e =>
                this.props.currentUser && !this.props.editing ? this.saveCard(e) : null
              }
            >
              Send
            </button>
          </a>
        </div>
        <hr />
        <section className="card-collection-container">
          <p className="card-collection-container-label">My collection</p>
          {this.props.currentUser ? (
            <SavedCards />
          ) : (
            <p className="collection-message">Sign up to start your collection</p>
          )}
        </section>
      </main>
    );
  }
}

const mapStateToProps = state => ({
  card: state.card,
  image: state.card.image,
  message: state.card.message,
  recipients: state.card.recipients,
  editing: state.card.editing,
  editingId: state.card.editingId,
  currentUser: state.auth.currentUser
});

export default connect(mapStateToProps)(CreatePage);
