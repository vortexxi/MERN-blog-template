import React, { useState } from 'react'


export const Expand = ({ children, descriptionLength }) => {

    const fullText = children;

    // Set the initial state of the text to be collapsed
    const [isExpanded, setIsExpanded] = useState(false);

    // This function is called when the read more/less button is clicked

    const toggleText = () => {
        setIsExpanded(!isExpanded);
    }




    return (
        <>
            <p className='text'>
            {/* slice(start, ?end) */}
                {isExpanded ? fullText : `${fullText.slice(0, descriptionLength)}`}
                <span onClick={toggleText} className='toggle-text'>
                    {isExpanded ? '...Show less' : '...Show more'}
                </span>
            </p>
        </>
    )
}
