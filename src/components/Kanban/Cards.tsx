import Card from "./Card";

type CardsProps = {
  cards: ICard[];
};

const Cards: React.FC<CardsProps> = ({ cards }) => {
  return (
    <div className="mb-4 flex h-[calc(100vh_-_230px_-_90px)] flex-col space-y-6">
      {cards.map((card: ICard, index: number) => (
        <Card key={card._id} card={card} index={index} />
      ))}
    </div>
  );
};

export default Cards;
