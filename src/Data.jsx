import React from 'react';
import "./index.css";
import { useGSAP } from "@gsap/react";
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
gsap.registerPlugin(ScrollTrigger);

const Data = () => {

    useGSAP(() => {
        document.querySelectorAll(".elem").forEach(elem => {
            let image = elem.querySelector('img')
            let tl = gsap.timeline()
            let xt = gsap.utils.random(-100, 100)

            tl
                .set(image, {
                    transformOrigin: `${xt < 0 ? 0 : '100%'}  `,
                }, "start")
                .to(image, {
                    scale: 0,
                    ease: 'none',

                    scrollTrigger: {
                        trigger: image,
                        start: 'top top',
                        end: 'bottom top',
                        scrub: true,
                    }
                }, "start")
                .to(elem, {
                    xPercent: xt,
                    ease: 'Power4.easeInOut',

                    scrollTrigger: {
                        trigger: image,
                        start: 'top bottom',
                        end: 'bottom top',
                        scrub: true,
                    }
                })
        })

    })
    
    return (
        <>
            <div className="w-full bg-zinc-900">
                <div className="grid grid-cols-8 grid-rows-20 gap-2 overflow-hidden">
                    <div className="elem col-span-1 row-span-1" style={{ "--r": "1", "--c": "3" }}><img src="/1.png" alt="Image 1" /></div>
                    <div className="elem col-span-1 row-span-1" style={{ "--r": "1", "--c": "7" }}><img src="/2.png" alt="Image 2" /></div>
                    <div className="elem col-span-1 row-span-1" style={{ "--r": "2", "--c": "2" }}><img src="/3.png" alt="Image 3" /></div>
                    <div className="elem col-span-1 row-span-1" style={{ "--r": "2", "--c": "6" }}><img src="/4.png" alt="Image 4" /></div>
                    <div className="elem col-span-1 row-span-1" style={{ "--r": "3", "--c": "4" }}><img src="/5.png" alt="Image 5" /></div>
                    <div className="elem col-span-1 row-span-1" style={{ "--r": "3", "--c": "8" }}><img src="/6.png" alt="Image 6" /></div>
                    <div className="elem col-span-1 row-span-1" style={{ "--r": "4", "--c": "1" }}><img src="/7.png" alt="Image 7" /></div>
                    <div className="elem col-span-1 row-span-1" style={{ "--r": "4", "--c": "4" }}><img src="/8.png" alt="Image 8" /></div>
                    <div className="elem col-span-1 row-span-1" style={{ "--r": "5", "--c": "2" }}><img src="/9.png" alt="Image 9" /></div>
                    <div className="elem col-span-1 row-span-1" style={{ "--r": "5", "--c": "6" }}><img src="/10.png" alt="Image 10" /></div>
                    <div className="elem col-span-1 row-span-1" style={{ "--r": "6", "--c": "3" }}><img src="/11.png" alt="Image 11" /></div>
                    <div className="elem col-span-1 row-span-1" style={{ "--r": "6", "--c": "7" }}><img src="/12.png" alt="Image 12" /></div>
                    <div className="elem col-span-1 row-span-1" style={{ "--r": "7", "--c": "5" }}><img src="/13.png" alt="Image 13" /></div>
                    <div className="elem col-span-1 row-span-1" style={{ "--r": "7", "--c": "8" }}><img src="/14.png" alt="Image 14" /></div>
                    <div className="elem col-span-1 row-span-1" style={{ "--r": "8", "--c": "1" }}><img src="/15.png" alt="Image 15" /></div>
                    <div className="elem col-span-1 row-span-1" style={{ "--r": "8", "--c": "4" }}><img src="/16.png" alt="Image 16" /></div>
                    <div className="elem col-span-1 row-span-1" style={{ "--r": "9", "--c": "2" }}><img src="/17.png" alt="Image 17" /></div>
                    <div className="elem col-span-1 row-span-1" style={{ "--r": "9", "--c": "6" }}><img src="/18.png" alt="Image 18" /></div>
                    <div className="elem col-span-1 row-span-1" style={{ "--r": "10", "--c": "3" }}><img src="/19.png" alt="Image 19" /></div>
                    <div className="elem col-span-1 row-span-1" style={{ "--r": "10", "--c": "7" }}><img src="/20.png" alt="Image 20" /></div>
                </div>

                <div className="fixed font-['Garamond'] top-0 left-0 w-full h-full flex flex-col items-center justify-center text-white z-[1]">
                    <h1 className="text-7xl mb-4">SPORTIFY<sup>®</sup></h1>
                </div>
                <div
  id="about"
  className="w-full h-screen bg-zinc-900 font-poppins flex items-center justify-center mx-auto py-16 px-4 relative z-[9] text-center"
>
  <div className="text-white max-w-3xl">
    <h1 className="text-6xl font-bold leading-tight mb-8 text-teal-400">
      Welcome to Sportify
    </h1>
    <p className="text-xl leading-relaxed text-gray-300">
      Your one-stop destination for all things sports! We believe in the power
      of sports to <span className="text-teal-300 font-medium">inspire</span>,
      connect, and transform lives. Whether you’re a seasoned athlete, a weekend
      warrior, or just starting your fitness journey, we offer a diverse range
      of high-quality{" "}
      <span className="text-teal-300 font-medium">sports gear, apparel,</span>{" "}
      and accessories tailored to your needs.
    </p>
    <p className="mt-6 text-xl leading-relaxed text-gray-300">
      Join our community of sports enthusiasts and{" "}
      <span className="text-teal-300 font-medium">elevate your game</span> with
      the right gear. Gear up, and let’s get moving!
    </p>
  </div>
</div>

                </div>

                 
               
 
        </>
    )
}

export default Data;
