import { useEffect, useRef, useState } from 'react';

import './dropdown.css';

export interface IDropdownItem {
    label: string;
    value: string;
}

interface IDropdownProps {
    items: IDropdownItem[];
    label: string;
    onSelect?: (item: IDropdownItem) => void | undefined;
    disabled?: boolean;
    value?: IDropdownItem;
    className?: string;
    buttonClass?: string;
    itemClass?: string;
}

export function Dropdown({
                             items,
                             label,
                             onSelect,
                             disabled = false,
                             value,
                             className = '',
                             buttonClass = '',
                             itemClass = ''
                         }: IDropdownProps) {
    const [ isOpen, setIsOpen ] = useState<boolean>(false);
    const [ selectedItem, setSelectedItem ] = useState<IDropdownItem | null>(value || null);
    const dropdownRef = useRef<HTMLDivElement>(null);

    const handleToggle = () => {
        if (!disabled) {
            setIsOpen(!isOpen);
        }
    }

    const handleClickOutside = (event: Event) => {
        if (dropdownRef.current && !dropdownRef.current.contains(event.target as Element)) {
            setIsOpen(false);
        }
    }

    const handleSelect = (item: IDropdownItem) => {
        if (item) {
            setSelectedItem(item);
            onSelect && onSelect(item);
        }
        setIsOpen(false);
    };

    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside);

        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    return (
        <div ref={ dropdownRef } className={ `dropdown ${ disabled ? 'dropdown-disabled' : '' } ${ className }` }>
            <button onClick={ handleToggle } className={ `dropdown-button ${ buttonClass }` } disabled={ disabled }>
                { selectedItem?.label || label }
                <span className='arrow-down'></span>
            </button>
            { isOpen && (
                <ul className="dropdown-list">
                    { items.map((item) => (
                        <li
                            key={ item.value }
                            className={ `dropdown-option ${ itemClass }` }
                            onClick={ () => handleSelect(item) }
                        >
                            { item.label }
                        </li>
                    )) }
                </ul>
            ) }
        </div>
    )
}

export default Dropdown;