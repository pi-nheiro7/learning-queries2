import React, {useState, useEffect} from 'react'
import style from './Question.module.css'
import ErrorMessage from '../../components/error-message/ErrorMessage';
import {
  DndContext,
  DragOverlay,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import { sortableKeyboardCoordinates } from '@dnd-kit/sortable';
import Droppable from '../../utils/dndkit/Droppable';
import { GenerateQuery } from '../../utils/query/GenerateQuery';
import SortableItem from '../../utils/dndkit/SortableItem';
import { arrayMove } from '../../utils/dndkit/array';
import { moveBetweenContainers } from '../../utils/dndkit/handlers/MoveBetweenContainers';

const data = 'SELECT * FROM jorginho';


const droppableStyle = {
  width: '100%',
  height: '7rem',
  border: '1px solid white',
  marginBottom: '1rem',
};

export default function Question() {


  function handleClick() {
    console.log('cheguei auqi');
    // updateData();
    // updateDataGroup();
  }
  // console.log(data);

  const rightQuery = data ? data.split(' ') : [];
  let query = GenerateQuery(rightQuery);

  const [items, setItems] = useState({
    dropzone: [],
    answers: [],
  });

  const [correct, setCorrect] = useState(false);
  const [incorrect, setIncorrect] = useState(false);

  useEffect(() => {
    setItems((items) => ({
      ...items,
      answers: rightQuery,
    }));
    // console.log(items);
  }, [data]);

  const [activeId, setActiveId] = useState();
  // dnd

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  function findContainer(id) {
    if (id in items) {
      return id;
    }

    return Object.keys(items).find((key) => items[key].includes(id));
  }

  function handleDragStart(event) {
    const { active } = event;
    const { id } = active;

    setActiveId(id);
  }

  const handleDragOver = ({ over, active }) => {
    const { id } = active;
    const overId = over?.id;

    if (!overId) {
      return;
    }

    const activeContainer = findContainer(id);
    const overContainer = findContainer(overId);

    if (!overContainer) {
      return;
    }

    if (activeContainer !== overContainer) {
      setItems((items) => {
        const activeItems = items[activeContainer];
        const overItems = items[overContainer];

        const activeIndex = activeItems.indexOf(id);
        const overIndex = overItems.indexOf(overId);

        return moveBetweenContainers(
          items,
          activeContainer,
          activeIndex,
          overContainer,
          overIndex,
          active.id
        );
      });
    }
  };

  const handleDragEnd = ({ active, over }) => {
    console.log(items);
    if (!over) {
      return;
    }

    if (active.id !== over.id) {
      const activeContainer = active.data.current.sortable.containerId;
      const overContainer = over.data.current?.sortable.containerId || over.id;
      const activeIndex = active.data.current.sortable.index;
      const overIndex = over.data.current?.sortable.index || 0;

      setItems((items) => {
        let newItems;
        if (activeContainer === overContainer) {
          newItems = {
            ...items,
            [overContainer]: arrayMove(
              items[overContainer],
              activeIndex,
              overIndex
            ),
          };
        } else {
          newItems = moveBetweenContainers(
            items,
            activeContainer,
            activeIndex,
            overContainer,
            overIndex,
            active.id
          );
        }
        return newItems;
      });
    }
  };

  // if (loading) return <SpinnerComponent />;
  // if (error) return <h2>{error}</h2>;

  function handleAnswer(e) {
    e.PreventDefault;
    let dropzoneString = items?.dropzone.join(' ');
    let correctQuery = [...data?.query].join('');

    if (dropzoneString.toLowerCase() == correctQuery.toLowerCase()) {
      // console.log('boa');
      setCorrect(() => true);
      setIncorrect(() => false);
    } else {
      // console.log('tente novamente');
      setCorrect(() => false);
      setIncorrect(() => true);
    }
  }





  return (
    <div className={`container center ${style.question}`}>
      <h1>Select 1</h1>
      <p>Observe o Schema abaixo e faça o que se pede</p>
      <img
        className={style.imgContexto}
        src="https://www.premierpet.com.br/wp-content/uploads/2020/10/banner-gato-3.jpg"
        alt="imagem qualuqer"
      />

      <h5>Busque todos os dados da tabela "usuários"</h5>
      <h5>
        Para realizar a tarefa, arraste os blocos da linha para a caixa na
        sequência correta.
      </h5>

      <ErrorMessage />

      <DndContext
        sensors={sensors}
        onDragStart={handleDragStart}
        onDragEnd={handleDragEnd}
        onDragOver={handleDragOver}
      >
        <div>
          {/* {Object.keys(items).map((group) => (
              <Droppable id={group} items={items[group]} key={group} />
            ))} */}
          <Droppable
            id="dropzone"
            items={items.dropzone}
          />
          <Droppable
            className={style.answerzone}
            id="answers"
            items={items.answers}
          />
        </div>
        <DragOverlay>
          {activeId ? <SortableItem id={activeId} /> : null}
        </DragOverlay>
      </DndContext>

      <div className="grid">
        <button className="outline">Voltar</button>
        <button className="secondary outline">Resetar</button>
        <button className="contrast">Confirmar</button>
      </div>
    </div>
  );
}
