import React, { useState } from 'react';
import { CurrentPoints } from '../../../services/games/types';
import Modal from "../../ui/Modal/Modal"

const GameFinished = ({currentPoints}: {currentPoints: CurrentPoints[]}) => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [modalOpen, setModalOpen] = useState(false);

    return <div>
       
            { <Modal setOpenModal={setModalOpen} />} 
    </div>
}

export default GameFinished;