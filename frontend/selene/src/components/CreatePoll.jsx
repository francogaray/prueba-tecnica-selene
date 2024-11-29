import { useState } from "react";
import axios from "axios";

const CreatePoll = () => {
    const [question, setQuestion] = useState("");
    const [options, setOptions] = useState(["", ""]);

    const handleOptionChange = (index, value) => {
        const newOptions = [...options];
        newOptions[index] = value;
        setOptions(newOptions);
    };

    const addOption = () => {
        if (options.length < 4) {
            setOptions([...options, ""]);
        }
    };

    const createPoll = async () => {
        const response = await axios.post("http://localhost:8080/api/polls", {
            question,
            options: options.map((option) => ({ text: option })),
        });
        console.log("Poll created:", response.data);
    };

    return (
        <div>
            <h1>Crear Encuesta</h1>
            <input
                type="text"
                placeholder="Pregunta"
                value={question}
                onChange={(e) => setQuestion(e.target.value)}
            />
            {options.map((option, index) => (
                <input
                    key={index}
                    type="text"
                    placeholder={`Opción ${index + 1}`}
                    value={option}
                    onChange={(e) => handleOptionChange(index, e.target.value)}
                />
            ))}
            <button onClick={addOption}>Agregar Opción</button>
            <button onClick={createPoll}>Crear Encuesta</button>
        </div>
    );
};

export default CreatePoll;
