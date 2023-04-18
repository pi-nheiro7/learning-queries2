import React from 'react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

const SortableItem = (props) => {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: props.id });

  const itemStyle = {
    transform: CSS.Transform.toString(transform),
    transition,
    display: ' table-cell',
    width: 'fit-content',
    height: '40px',
    border: '1px solid white',
    padding: '0 10px 0 10px',
    verticalAlign: 'middle',
    marginRight: '10px',
    marginBottom: '5px',
    backgroundColor: '#10181f00',
  };

  return (
    <div style={itemStyle} ref={setNodeRef} {...attributes} {...listeners}>
      {props.id}
    </div>
  );
};

export default SortableItem;
