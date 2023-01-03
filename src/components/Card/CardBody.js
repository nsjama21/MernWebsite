export default function CardBody({ name, price }) {
  return (
    <div className="card-body">
      <h5 className="card-name">{name}</h5>
      <p className="card-price">{price}</p>
      {/* <Button url={url} /> */}
    </div>
  );
}