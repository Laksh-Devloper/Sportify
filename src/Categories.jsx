// src/pages/Categories.js
import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const categories = [
  { name: 'Football', img: '/football.png' },
  { name: 'Cricket', img: '/cricket.png' },
  { name: 'Hockey', img: '/hockey.jpeg' },
  { name: 'Tennis', img: '/tennis.png' },
  { name: 'Basketball', img: '/basketball.png' },
  { name: 'Baseball', img: '/baseballl.png' },
  { name: 'Badminton', img: '/badminton.jpg' },
  { name: 'Table Tennis', img: '/tablet.png' },
  { name: 'Golf', img: '/golf.png' },
  { name: 'Rugby', img: '/rugby.png' },
  { name: 'Volleyball', img: '/volleyball.png' },
  { name: 'Swimming', img: '/swimming.png' },
  { name: 'Marital Arts', img: '/marital.jpeg' },
  { name: 'Boxing', img: '/boxing.jpg' },
  { name: 'Skateboarding', img: '/skate.jpeg' },
  { name: 'Wrestling', img: '/wrestling.jpg' },
];

const Categories = () => {
  return (
    <>
    <div id='store' className='min-h-screen relative z-[2]'>
    <StyledCategories>
    
      <h1 className="title font-['Copperplate']">Sports Categories</h1>
      <div className="card-grid title font-['Copperplate'] ">
        {categories.map((category, index) => (
          <Link
            key={index}
            to={`/products/${category.name.toLowerCase().replace(/\s/g, '-')}`}
            className="no-underline"
          >
            <div className="card">
              <img src={category.img} alt={category.name} className="card-img" />
              <h2 className="card-title">{category.name}</h2>
            </div>
          </Link>
        ))}
      </div>
      
    </StyledCategories>
    </div>
    </>
  );
}; 

const StyledCategories = styled.div`
  min-height: 100vh;
  padding: 6rem 2rem;
  background-color: #18181b;
  display: flex;
  flex-direction: column;
  align-items: center;

  .title {
    font-size: 3rem;
    font-weight: bold;
    color: white;
    margin-bottom: 2rem;
  }

  .card-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
    gap: 2rem;
    width: 80%;
    justify-items: center;
    position: relative;
    z-index: 2; /* Ensures the z-[2] is applied */
  }

  .card {
    position: relative;
    width: 209px; /* 10% increase */
    height: 279px; /* 10% increase */
    background-color: #000;
    display: flex;
    flex-direction: column;
    justify-content: end;
    padding: 12px;
    gap: 12px;
    border-radius: 8px;
    cursor: pointer;
    color: white;
    transition: transform 0.3s;
  }

  .card:hover {
    transform: scale(1.05);
  }

  .card::before {
    content: '';
    position: absolute;
    inset: 0;
    left: -5px;
    margin: auto;
    width: 220px;
    height: 290px;
    border-radius: 10px;
    background: linear-gradient(-45deg, #e81cff 0%, #40c9ff 100%);
    z-index: -10;
    pointer-events: none;
    transition: all 0.6s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  }

  .card::after {
    content: '';
    z-index: -1;
    position: absolute;
    inset: 0;
    background: linear-gradient(-45deg, #fc00ff 0%, #00dbde 100%);
    transform: translate3d(0, 0, 0) scale(0.95);
    filter: blur(20px);
  }

  .card:hover::after {
    filter: blur(30px);
  }

  .card:hover::before {
    transform: rotate(-90deg) scaleX(1.34) scaleY(0.77);
  }

  .card-img {
    width: 100%;
    height: 60%;
    object-fit: cover;
    border-radius: 6px;
  }

  .card-title {
    font-size: 1.5rem;
    font-weight: 700;
    text-align: center;
  }
`;

export default Categories;
