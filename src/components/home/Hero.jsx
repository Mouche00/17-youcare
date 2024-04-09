import React from 'react'
import Shadow from '../ui/shadow/Shadow'
import ShadowWrapper from '../ui/shadow/ShadowWrapper'
import heroImage from '@/assets/hero.jpg'
import Sticker from '@components/ui/Sticker'

const Hero = ({ children }) => {
    return (
        <ShadowWrapper classes='w-full px-8 pt-8'>
            <div
                className='relative border-2 border-black p-8 rounded-lg bg-cover bg-center flex flex-col items-center justify-center'
                style={{
                    height: '40vh',
                    backgroundImage: `url(${heroImage})`
                }}
            >
                <Shadow />

                <Sticker classes='bg-black'>
                    Help Us Help You
                </Sticker>

                { children }
            </div>
        </ShadowWrapper>
    )
}

export default Hero