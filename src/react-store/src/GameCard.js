function GameCard({ title, price, image, description }) {
  return (
    <div className="card" title={title}>
      <div className="card-image">
        <figure className="image is-1by1">
          <img src={`./images/${image}`} alt="game image" />
        </figure>
      </div>
      <div className="card-content">
        <div className="media-content">
          <p className="title is-4">{title}</p>
          <p className="subtitle is-6">{price}</p>
        </div>
        <div className="content">{description}</div>
      </div>
    </div>
  );
}

export default GameCard;
