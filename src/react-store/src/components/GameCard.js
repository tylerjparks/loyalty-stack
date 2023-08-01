import "../css/main.css";
function GameCard({ title, price, image, description }) {
  return (
    <div className="card box" title={title}>
      <div className="card-image">
        <figure className="image is-1by1">
          <img src={`./images/${image}`} alt="game card" />
        </figure>
      </div>
      <div className="card-content">
        <div className="media-content">
          <div title={title} className="title is-4 text-control">
            {title}
          </div>
          <p className="subtitle is-6">{price}</p>
        </div>
        <div title={description} className="content text-control">
          {description}
        </div>
      </div>
    </div>
  );
}

export default GameCard;
