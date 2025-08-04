import { useState, useEffect, useRef } from "react";

// InputField component with autocomplete functionality
const InputField = ({
    data = [],              // Array of objects to search through
    labelKey = 'name',      // Key in each object to display in suggestions
    placeholder = '...',    // Placeholder text for the input field
    minLength = 2,          // Minimum number of characters before filtering starts
    onSelect                // Callback when an item is selected
}) => {
 const [query, setQuery] = useState('');                 // User's current input
    const [suggestions, setSuggestions] = useState([]);  // Filtered list of suggestions
    const containerRef = useRef(null);                   // Ref to the input field wrapper

    // Filter suggestions based on user input
    useEffect(() => {
        if (query.length < minLength) {
            setSuggestions([]);
            return;
        }

        const lower = query.toLowerCase(); // Convert input to lowercase for comparison
        const filtered = data.filter(item =>
            item[labelKey].toLowerCase().includes(lower)
        ).slice(0, 8); // Limit to 8 suggestions

        setSuggestions(filtered);
    }, [query, data, labelKey, minLength]);

    // Hide suggestions when clicking outside the component
    useEffect(() => {
        const handleClickOutside = (e) => {
            if (containerRef.current && !containerRef.current.contains(e.target)) {
                setSuggestions([]);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    // Handle selection from the suggestion list
    const handleSelect = (item) => {
        setQuery(item[labelKey]);     // Update input with selected item label
        setSuggestions([]);           // Hide suggestions
        if (onSelect) onSelect(item); // Call the onSelect callback if provided
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
                        <li key={i} onMouseDown={() => handleSelect(item)}>
                            {item[labelKey]}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );

};
export default InputField;