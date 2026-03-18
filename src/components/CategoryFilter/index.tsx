import { useAtom } from 'jotai';
import { CATEGORY_LABELS } from '../../modules/spots/spot.entity';
import './index.css';
import { filterStateAtom } from '../../modules/spots/filter.state';

const categories = [
  { value: '', label: 'すべて' },
  ...Object.entries(CATEGORY_LABELS).map(([value, label]) => ({
    value,
    label,
  })),
];

export default function CategoryFilter() {
  const [filterState, setFilterState] = useAtom(filterStateAtom);

  return (
    <div className="category-filter">
      <div className="category-filter-list">
        {categories.map((category) => (
          <button
            key={category.value}
            className={`category-filter-chip ${filterState.category === category.value ? 'active' : ''}`}
            onClick={() =>
              setFilterState((prev) => ({ ...prev, category: category.value }))
            }
          >
            {category.label}
          </button>
        ))}
      </div>
    </div>
  );
}
