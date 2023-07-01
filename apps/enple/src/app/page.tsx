'use client'

import Image from 'next/image'
import { deco } from "../deco";
import EarthScene from '../components/earthScene';

export default function Landing() {

    const r = 1080 / 1920;
    const iw = 300;
    const ih = iw * r;
    
    const styles = deco.land();

    return (
        <div style={ styles.wrap }>
            <div style={ styles.head }>
                <Image src={ '/images/logo.svg'} alt="logo" width={iw} height={ih} />                 
            </div>
            <div style={ styles.desc }>
                Embark on a global journey, capturing memories, one snapshot at a time. Uncover the world's most cherished places, through the lens of those who love them
            </div>                
            <div>
                <EarthScene />
            </div>            
        </div>
    )
}

