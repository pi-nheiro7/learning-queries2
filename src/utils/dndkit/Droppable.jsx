import { useDroppable } from '@dnd-kit/core';
import {
  horizontalListSortingStrategy,
  SortableContext,
} from '@dnd-kit/sortable';
import SortableItem from './SortableItem';
import React from 'react';

export const Droppable = ({ id, items }) => {
  const { setNodeRef } = useDroppable({ id });
  
  let droppableStyle = {
    width: '100%',
    height: '7rem',
    border: '1px solid white',
    marginBottom: '1rem',
    padding: '10px',
    display: 'flex',
    flexWrap: 'wrap',
  };

  if (id == 'answers') {
    droppableStyle = {
      display: 'flex',
      flexWrap: 'wrap',
      borderBottom: '1px solid white',
      marginBottom: '2rem',
      paddingBottom: '10px',
    };
  }

  return (
    <SortableContext
      id={id}
      items={items}
      strategy={horizontalListSortingStrategy}
    >
      <div ref={setNodeRef} style={droppableStyle}>
        {items.map((item) => (
          <SortableItem key={item} id={item} />
        ))}
      </div>
    </SortableContext>
  );
};

export default Droppable;
