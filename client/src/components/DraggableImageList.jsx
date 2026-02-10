import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

const DraggableImage = ({
  id,
  url,
  index,
  onRemove,
  formatBytes,
  fileSize,
  isLocal,
}) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      className={`flex justify-between p-3 border items-center rounded-lg ${
        isDragging ? 'border-blue-500 shadow-lg' : 'border-gray-300'
      }`}
    >
      <div className='flex items-center gap-3 flex-1'>
        <div
          {...listeners}
          className='cursor-grab active:cursor-grabbing p-2 hover:bg-gray-100 rounded'
          title='Drag to reorder'
        >
          <svg
            xmlns='http://www.w3.org/2000/svg'
            width='20'
            height='20'
            viewBox='0 0 24 24'
            fill='none'
            stroke='currentColor'
            strokeWidth='2'
            strokeLinecap='round'
            strokeLinejoin='round'
            className='text-gray-400'
          >
            <line x1='3' y1='12' x2='21' y2='12'></line>
            <line x1='3' y1='6' x2='21' y2='6'></line>
            <line x1='3' y1='18' x2='21' y2='18'></line>
          </svg>
        </div>
        <img
          src={url}
          alt='listing image'
          className='w-20 h-20 object-contain rounded-lg'
        />
        {isLocal && fileSize && (
          <span className='text-xs text-gray-500'>{formatBytes(fileSize)}</span>
        )}
        {index === 0 && (
          <span className='text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded'>
            Cover
          </span>
        )}
      </div>
      <button
        type='button'
        onClick={onRemove}
        className='p-3 text-red-700 rounded-lg uppercase hover:opacity-75'
      >
        Delete
      </button>
    </div>
  );
};

export default DraggableImage;
