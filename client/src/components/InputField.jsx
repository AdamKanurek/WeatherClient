import { useState, useEffect, useRef } from "react";

const InputField = ({
    data = [],
    labelKey = 'name',
    placeholder = '...',
    minLength = 2,
    onSelect
}) => {
    const [query, setQuery] = useState('');
    const [suggestions, setSuggestions] = useState([]);
    const containerRef = useRef(null);

    useEffect(() => {
        if (query.length < minLength) {
            setSuggestions([]);
            return;
        }

        const lower = query.toLowerCase();
        const filtered = data.filter(item =>
            item[labelKey].toLowerCase().includes(lower)
        ).slice(0, 8);

        setSuggestions(filtered);
    }, [query, data, labelKey, minLength]);

    useEffect(() => {
        const handleClickOutside = (e) => {
            if (containerRef.current && !containerRef.current.contains(e.target)) {
                setSuggestions([]);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const handleSelect = (item) => {
        setQuery(item[labelKey]);
        setSuggestions([]);
        if (onSelect) onSelect(item);
    };

    return (
        <div className="input-field" ref={containerRef}>
            <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder={placeholder}
                autoComplete="off"
            />
            {suggestions.length > 0 && (
                <ul className="suggestions">
                    {suggestions.map((item, i) => (
                        <li key={i} onClick={() => handleSelect(item)}>
                            {item[labelKey]}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );

};
export default InputField;