import PollSchema from "../models/poll.model.js";

const votedIps = new Map();

export const createPoll = async (req, res) => {
    try {
        const { question, options } = req.body;
        const poll = new PollSchema({ question, options });
        await poll.save();
        res.status(201).json(poll);
    } catch (error) {
        res.status(500).json({ message: "Error al crear la encuesta", error });
    }
};

export const getPolls = async (req, res) => {
    try {
        const polls = await PollSchema.find();
        res.json(polls);
    } catch (error) {
        res.status(500).json({
            message: "Error al obtener las encuestas",
            error,
        });
    }
};

export const getPollById = async (req, res) => {
    try {
        const poll = await PollSchema.findById(req.params.id);
        if (!poll) {
            return res.status(404).json({ message: "Encuesta no encontrada" });
        }
        res.json(poll);
    } catch (error) {
        res.status(500).json({
            message: "Error al obtener la encuesta",
            error,
        });
    }
};

export const votePoll = async (req, res) => {
    const { optionIndex } = req.body;
    const pollId = req.params.id;
    const userIp = req.ip;

    try {
        // Verificar si la IP ya ha votado en esta encuesta
        if (votedIps.has(pollId) && votedIps.get(pollId).has(userIp)) {
            return res
                .status(400)
                .json({ message: "Ya has votado en esta encuesta." });
        }

        // Si es la primera vez que esta IP vota en esta encuesta, registra el voto
        const poll = await PollSchema.findById(pollId);
        if (!poll) {
            return res.status(404).json({ message: "Encuesta no encontrada" });
        }
        poll.options[optionIndex].votes += 1;
        await poll.save();

        // Registrar la IP como que ha votado
        if (!votedIps.has(pollId)) {
            votedIps.set(pollId, new Set());
        }
        votedIps.get(pollId).add(userIp);

        res.json(poll);

        // Emitir actualización a través de WebSocket
        // io.emit("voteUpdated", poll);
    } catch (error) {
        res.status(500).json({ message: "Error al registrar el voto", error });
    }
};
