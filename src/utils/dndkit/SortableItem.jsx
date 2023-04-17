import React from 'react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

const SortableItem = (props) => {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: props.id });

  const itemStyle = {
    transform: CSS.Transform.toString(transform),
    transition,
    width: 100,
    height: 30,
    textAlign: 'center',
    border: '1px solid gray',
    borderRadius: 5,
    userSelect: 'none',
    cursor: 'grab',
    boxSizing: 'border-box',
  };

  return (
    <div style={itemStyle} ref={setNodeRef} {...attributes} {...listeners}>
      {props.id}
    </div>
  );
};

export default SortableItem;
