import { insertAtIndex, removeAtIndex } from '../array';

export const moveBetweenContainers = (
  items,
  activeContainer,
  activeIndex,
  overContainer,
  overIndex,
  item
) => {
  return {
    ...items,
    [activeContainer]: removeAtIndex(items[activeContainer], activeIndex),
    [overContainer]: insertAtIndex(items[overContainer], overIndex, item),
  };
};
