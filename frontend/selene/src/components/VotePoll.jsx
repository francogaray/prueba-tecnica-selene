import { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
const VotePoll = () => {
    const { id } = useParams();
    const [poll, setPoll] = useState(null);

    useEffect(() => {
        const fetchPoll = async () => {
            const response = await axios.get(
                `http://localhost:8080/polls/${id}`
            );
            setPoll(response.data);
        };

        fetchPoll();
    }, [id]);

    const handleVote = async (optionIndex) => {
        await axios.post(`http://localhost:8080/api/polls/${id}/vote`, {
            optionIndex,
        });
    };

    if (!poll) return <div>Cargando...</div>;

    return (
        <div>
            <h1>{poll.question}</h1>
            {poll.options.map((option, index) => (
                <div key={index}>
                    <button onClick={() => handleVote(index)}>
                        {option.text}
                    </button>
                    <span> {option.votes} votos</span>
                </div>
            ))}
        </div>
    );
};

export default VotePoll;
