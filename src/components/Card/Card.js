import CardBody from "./CardBody";
import CardImage from "./CardImage";

export default function Card(props) {
  return (
    <div className="card" style={{ width: "18rem" }}>
      <CardImage image={props.image} />
      <CardBody name={props.name} text={props.price} />
    </div>
  );
}