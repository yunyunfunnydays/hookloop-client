import Card from "./Card";

type CardsProps = {
  cards: ICard[];
};

const Cards: React.FC<CardsProps> = ({ cards }) => {
  return (
    <div className="flex flex-col">
      {cards.map((card: ICard, index: number) => (
        <Card key={card._id} card={card} index={index} />
      ))}
    </div>
  );
};

export default Cards;
