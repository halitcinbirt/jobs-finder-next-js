import React, { useEffect, useState } from 'react'
import axios from 'axios';
import Link from 'next/link';

function Header() {
    const apiUrl = process.env.API_URL; 
    const [menu, setMenu] = useState([]);

    useEffect(() => {
      const fetchData = async () => {
        try {
          const apiUrl = process.env.API_URL;
          const response = await axios.get(apiUrl + 'city?topbar=1');
          setMenu(response.data);
        } catch (error) {
          console.error('Veri çekme hatası:', error);
        }
      };
  
      fetchData();
    }, []);


  return (
    <div>
        <div className="topbar">
            <div className='container'>
                <div className='topbar-inner'>
                {menu.map((item) => (
                <Link key={item.city_id} href={`/is-ilanlari/${item.city_slug}`}>
                   {item.city_name}
                </Link>
                ))}
                </div>
            </div>
        </div>
        <div className='header'>
            <div className='container'>
                <div className='logo'>
                    <Link href='/'>
                         <img src='/logo.png' />
                    </Link>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Header;

export async function getServerSideProps() {
    try {
        const apiUrl = process.env.API_URL;
        const response = await axios.get(apiUrl+'city?topbar=1');
        const menu = response.data;
        return {
            props: {
                menu,
            },
        };
    } catch (error) {
        console.error('Veri çekme hatası:', error);
        return {
            props: {
                menu: null, // Hata durumunda "data" değerini null yapabilirsiniz.
            },
        };
    }
  }