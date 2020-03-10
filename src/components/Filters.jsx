import React from 'react';

function Filters({ handleCheckboxChange, handleTextBoxChange, types, weaknesses }) {
    const typeCheckboxes = Object.keys(types).map((type) => (
        <label
            key={type}>
            {type}:
            <input
                type='checkbox'
                name={type}
                key={type}
                onChange={(e) => { handleCheckboxChange(e, 'types') }} />
            ---
        </label>
    ));

    const weaknessCheckboxes = Object.keys(weaknesses).map((weakness) => (
        <label
            key={weakness}>
            {weakness}:
            <input
                type='checkbox'
                name={weakness}
                key={weakness}
                onChange={(e) => { handleCheckboxChange(e, 'weaknesses') }} />
            ---
        </label>
    ));

    return (
        <form>
            <label>
                name:
                <input
                    type='text'
                    name='name'
                    onChange={handleTextBoxChange} />
            </label>
            <br />
            <label>
                Types:
                <br />
                {typeCheckboxes}
            </label>
            <br />
            <label>
                Weaknesses:
                <br />
                {weaknessCheckboxes}
                </label>
        </form>
    )
}

export default Filters;