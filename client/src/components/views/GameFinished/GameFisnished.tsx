import React, { useEffect, useState } from 'react';
import { CurrentPoints } from '../../../services/games/types';
import { getUserNickName } from '../../../services/user/getUserNickName';
import Modal from "../../ui/Modal/Modal"

const GameFinished = ({currentPoints}: {currentPoints: CurrentPoints[]}) => {
    const [modalOpen, setModalOpen] = useState(false);
    const [points, setPoints] = useState<{nick: string, points: number}[]>([]);

    useEffect(() => {
        const promises = currentPoints.map(async currentPoint => {
            const nickname = await getUserNickName(currentPoint.player);
            return {
                nick: nickname,
                points: currentPoint.points,
            }
        })
    
        Promise.all(promises).then(data => {
            setPoints(data);
        });
    }, [])

    console.log(points);
    return <div>
       
            { <Modal setOpenModal={setModalOpen} />} 
    </div>
}

export default GameFinished;