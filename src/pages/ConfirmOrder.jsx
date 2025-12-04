import { useState, useEffect } from 'react'
import { HeaderHome } from '../components/home/Header'
import { MapConfirmMonitoring } from '../components/monitoring/MapConfirm'
import '../styles/ConfirmOrder.css'

export const ConfirmOrder = () => {

    const [firstView, setFirstView] = useState(true)
    const [_count, setCount] = useState(2)

    useEffect(() => {
        const countInterval = setInterval(() => {
            setCount((prevCount) => {
                if (prevCount <= 1) {
                    clearInterval(countInterval);
                    setFirstView(false);
                    return 0;
                }
                return prevCount - 1;
            });
        }, 1000);
        return () => clearInterval(countInterval);
    }, [])


    return (
        <>
            <HeaderHome />
            {
                firstView ? <div className='card confirm-order'>
                    <img src="./icon_check.svg" alt="" />
                    <span>Pedido confirmado...!</span>
                </div> :
                    <MapConfirmMonitoring />
            }
        </>
    )
}