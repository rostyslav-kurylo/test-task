import { Dropdown, IDropdownItem } from './components/dropdown/dropdown';
import { usePaginatedList } from './hooks/use-paginated-list/use-paginated-list.ts';
import { fetchMockedData, IPostsResponseData } from './mock/mockData';

import './App.css';

function App() {
    const dropdownItems: IDropdownItem[] = [
        { label: 'English', value: 'EN' },
        { label: 'Ukrainian', value: 'UA' },
        { label: 'French', value: 'FR' },
    ];

    const {
        data,
        pagination,
        status,
        updatePagination,
        hasNextPage,
        updateSorting,
        updateFilter,
        sorting
    } = usePaginatedList<IPostsResponseData>({
        fetchFn: fetchMockedData,
        initialPagination: { page: 1, pageSize: 2 },
        initialSorting: 'asc'
    });

    const handleDropdownSelect = (item: IDropdownItem) => {
        if (item) {
            console.log('Selected item: ', item.value);
        }
    }

    return (
        <>
            <h1>React App</h1>
            <Dropdown items={ dropdownItems } label={ 'Please select' } onSelect={ handleDropdownSelect }/>

            <hr/>
            <h2>Paginated List</h2>
            { status === 'loading' && <p>Loading...</p> }
            { status === 'error' && <p>Error loading data.</p> }
            { data?.items.map((item) => (
                <article key={ item.id }>
                    <div>User ID: { item.userId }</div>
                    <h3>{ item.title }</h3>
                    <p>{ item.body }</p>
                </article>
            )) }

            <div className='pagination-container'>
                <button onClick={ () => updatePagination({ ...pagination, page: pagination.page - 1 }) }
                        disabled={ pagination.page === 1 }>Previous
                </button>
                <button onClick={ () => updatePagination({ ...pagination, page: pagination.page + 1 }) }
                        disabled={ !!data && !hasNextPage(data.total) }>
                    Next
                </button>
            </div>

            <div className='sorting-container'>
                <button className={ sorting === 'asc' ? 'active-button' : '' }
                        onClick={ () => updateSorting('asc') }>ASC Sort
                </button>
                <button className={ sorting === 'desc' ? 'active-button' : '' }
                        onClick={ () => updateSorting('desc') }>DESC Sort
                </button>
            </div>

            <div className='filter-container'>
                <label>Filter by user id: </label>
                <input
                    type='text'
                    placeholder='Filter by user id'
                    onChange={ (event) => updateFilter(event.target.value) }
                />
            </div>
        </>
    )
}

export default App
