import Image from 'next/image'
import Link from 'next/link'
import { type ChangeEvent, useState } from 'react'

import logo_filler from '@images/logo_filler.png'
import menu from '@images/menu.png'
import search from '@images/search.png'
import profile from '@images/profile.png'
import cart from '@images/cart.png'

import SearchResults from './search'

const Header = () => {

    const [input, setInput] = useState("")

    const openMenu = () => {
        const menu = document.getElementById('menu') as HTMLButtonElement;
        menu.style.width = '250px';
    }

    const openSearch = () => {
        const search = document.getElementById('search') as HTMLInputElement
        if (search.style.display === "block") {
            search.style.display = "none";
        } else {
            search.style.display = "block";
        }
    }

    const closeMenu = () => {
        const menu = document.getElementById('menu') as HTMLButtonElement;
        menu.style.width = '0';
    }


    const inputHandler = (e: ChangeEvent<HTMLInputElement>) => {
        const x = e.target.value
        setInput(x)
    }

    return (
        <div>
            <div className="flex bg-slate-900">

                <div className="categories">
                    <button className="" onClick={openMenu}>
                        <Image src={menu} alt="menu" />
                    </button>
                </div>

                <div className="h-full w-0 fixed z-50 bg-slate-900 overflow-hidden transition-all" id="menu">
                    <button onClick={closeMenu} className="text-white text-2xl p-2">Close</button>

                    <div id='categories' >
                        <div className='text-white text-xl p-2'>
                            <Link href={`/category/food`}>Food</Link>
                        </div>
                        <div className='text-white text-xl p-2'>
                            <Link href={`/category/gpu`}>gpu</Link>
                        </div>
                        <div className='text-white text-xl p-2'>
                            <Link href={`/category/cpu`}>cpu</Link>
                        </div>
                    </div>
                </div>

                <Link href="/">
                    <a>
                        <Image src={logo_filler} alt="logo" className="" />
                    </a>
                </Link>

                <div className='hidden md:block max-w-md mx-auto mt-2' id="search">
                    <div className="relative flex items-center w-full h-12 rounded-lg focus-within:shadow-lg bg-white overflow-hidden">
                        <div className="grid place-items-center h-full w-12 text-gray-300">
                        </div>
                        <input
                            className="h-full w-full outline-none text-sm text-gray-700 pr-2"
                            type="text"
                            placeholder="Search..."
                            onChange={inputHandler}
                        />
                    </div>
                    <SearchResults input={input} />
                </div>

                <div className='flex ml-auto'>
                    <button className='block md:hidden' onClick={openSearch}><Image src={search} alt="search" /></button>

                    <div className="p-2">
                        <Link href="/account/login">
                            <a>
                                <Image src={profile} alt="profile" />
                            </a>
                        </Link>
                    </div >

                    <div className="p-2">
                        <Link href="/cart">
                            <a >
                                <Image src={cart} alt="shopping cart" />
                            </a>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Header;