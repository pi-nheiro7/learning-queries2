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
import { useNavigate, redirect, useLocation } from 'react-router-dom';


const droppableStyle = {
  width: '100%',
  height: '7rem',
  border: '1px solid white',
  marginBottom: '1rem',
};

export default function Question() {

  const navigate = useNavigate();

  let data = useLocation().state;
  console.log(data);

  function handleClick() {
    console.log('cheguei auqi');
    // updateData();
    // updateDataGroup();
  }
  // console.log(data);

  const rightQuery = data ? data.query.split(' ') : [];
  let query = GenerateQuery(rightQuery);

  const [items, setItems] = useState({
    dropzone: [],
    answers: [],
  });

  const [error, setError] = useState(false);
  const [msg, setMsg] = useState(false);

  useEffect(() => {
    setItems((items) => ({
      ...items,
      answers: query,
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

  function reset(){
    const response = confirm("Tem certeza que deseja resetar? além de perder seu progresso, as respostas serão embaralhadas.")
    if(response){
      setItems((items) => ({
        dropzone: [],
        answers: query,
      }));
    }
    
  }



  function handleAnswer(e) {
    e.PreventDefault;
    let dropzoneString = items?.dropzone.join(' ');
    console.log(data.query + ' | ' + dropzoneString);

    if (dropzoneString.toLowerCase() == data.query.toLowerCase()) {
      setError(false)
      setMsg(true);
      setTimeout(() => {
        navigate('/home')
      }, 2000);
    } else {
      setError(true)
      setMsg(false);
    }
  }



  return (
    <div className={`container center ${style.question}`}>
      <h1>Select 1</h1>
      <p>Observe o Schema abaixo e faça o que se pede</p>
      <img
        className={data.imgContexto}
        src={data.img}
        alt="imagem qualquer"
      />

      <h5>{data.description}</h5>
      <h6>
        Para realizar a tarefa, arraste os blocos da linha para a caixa na
        sequência correta.
      </h6>

      {error && <ErrorMessage />}

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
          <Droppable id="dropzone" items={items.dropzone} />
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
        <a href="/home">
          <button className="outline">Voltar</button>
        </a>
        <button className="secondary outline" onClick={reset}>Resetar</button>
        <button className="contrast" onClick={handleAnswer}>Confirmar</button>
      </div>
      {msg && <p><mark>Parabéns, você será redirecionado para a tela principal em 1s.</mark></p>}
    </div>
  );
}
