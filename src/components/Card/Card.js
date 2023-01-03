import CardBody from "./CardBody";
import CardImage from "./CardImage";

export default function Card(props) {
  return (
    <div className="card">
      <CardImage image={props.image} />
      <CardBody name={props.name} text={props.price} />
    </div>
  );
}