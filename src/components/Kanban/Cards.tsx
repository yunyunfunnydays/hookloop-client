import { useContext } from "react";
import KanbanContext from "@/Context/KanbanContext";
import { queryTypeInitValue } from "@/components/util/initValue";
import Card from "./Card";

type CardsProps = {
  cards: ICard[];
};

const Cards: React.FC<CardsProps> = ({ cards }) => {
  const { c_query } = useContext(KanbanContext);
  function findCards() {
    if (cards.length === 0) return [];
    if (JSON.stringify(queryTypeInitValue) === JSON.stringify(c_query)) return cards;
    return cards.filter((card) => {
      const matchReporters = c_query.reporters?.includes(card.reporter);
      const matchMembers = c_query.members?.some((member) => card.assignee.includes(member));
      const matchTags = c_query?.tags.some((tag) => card.tag.includes(tag));
      const matchPriority = card.priority === c_query.priority;
      const matchStatus = card.status === c_query.status;

      if (c_query.isMatch) {
        return matchMembers && matchTags && matchReporters && matchPriority && matchStatus;
      }

      return matchMembers || matchTags || matchReporters || matchPriority || matchStatus;
    });
  }

  const matchedCards = findCards();
  return (
    <div className="flex flex-col">
      {matchedCards?.map((card: ICard, index: number) => (
        <Card key={card._id} card={card} index={index} />
      ))}
    </div>
  );
};

export default Cards;
