import React from 'react';
import { connect } from 'react-redux';
import { fetchCards } from '../../actions/card';

export function ConfirmDeleteModal() {
  return (
    <div className="delete-card-modal">
      <p>Are you sure you want to delete this postcard?</p>
      <button className="modal-cancel-btn">Cancel</button>
      <button className="modal-delete-btn">Delete</button>
    </div>
  );
}

export class UserCards extends React.Component {
  componentDidMount() {
    this.props.dispatch(fetchCards());
  }

  showModal() {
    console.log('deleteCard btn clicked');
    return <ConfirmDeleteModal />;
  }

  deleteCard() {}

  render() {
    if (this.props.loading) {
      return (
        <div>
          <p>Loading cards</p>
        </div>
      );
    }
    const userCards = this.props.userCards.map((card, index) => (
      <div className="saved-card" key={index}>
        <p className="saved-card-flip-instruction">Click to edit</p>
        <button className="delete-card-btn" onClick={e => this.showModal(e)}>
          <i className="fa fa-trash" />
        </button>
        <img src={card.image.thumb} alt={card.image.alt} />
      </div>
    ));

    return (
      <section className="saved-cards-container">
        <p className="saved-cards-container-label">My saved postcards</p>
        {userCards}
      </section>
    );
  }
}

const mapStateToProps = state => ({
  userCards: state.card.userCards,
  loading: state.card.loading
});

export default connect(mapStateToProps)(UserCards);
