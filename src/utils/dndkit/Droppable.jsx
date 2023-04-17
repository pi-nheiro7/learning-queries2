import { useDroppable } from '@dnd-kit/core';
import {
  horizontalListSortingStrategy,
  SortableContext,
} from '@dnd-kit/sortable';
import SortableItem from './SortableItem';
import React from 'react';

export const Droppable = ({ id, items }) => {
  const { setNodeRef } = useDroppable({ id });

  const height = id === 'dropzone' ? '150px' : 'auto';

  const droppableStyle = {
    margin: '10px auto',
    width: '90%',
    padding: '10px 10px',
    border: '1px solid black',
    borderRadius: '5px',
    minWidth: 110,
    display: 'flex',
    gap: '10px',
    flexWrap: 'wrap',
    minHeight: '60px',
    height: height,
  };

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
