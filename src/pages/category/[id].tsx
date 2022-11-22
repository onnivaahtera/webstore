import { useRouter } from 'next/router'
import React from 'react'
import Image from 'next/image'

import { trpc } from '../../utils/trpc'
import Link from 'next/link'

function Category() {

    const router = useRouter()
    const { id } = router.query

    const products = trpc.product.productsInCategory.useQuery({ category: `${id}` })

    return (
        <>

            <div>
                <div className="m-5 p-2 grid grid-cols-2 md:grid-cols-5 2xl:grid-cols-7 3xl:grid-cols-10">
                    {
                        products.data?.map((value, key) =>

                            <div className="max-w-sm text-center shadow-lg border-2 m-3 border-slate-800 rounded-md text-white bg-slate-800" key={key}>
                                <Link href={`/product/${value.name}`} >
                                    <a>
                                        <Image src={value.image} alt="product image" height={250} width={250} layout={'responsive'} unoptimized={true} />
                                        <div className='text-xs md:text-lg p-2'>
                                            <h1>{value.name}</h1>
                                            <p className='py-2'>{value.price}€</p>
                                        </div>
                                    </a>
                                </Link>
                                <p><button className='bg-slate-900 text-white w-full rounded-md p-3'>Add to Cart</button></p>
                            </div>
                        )
                    }
                </div>

            </div>

        </>


    )
}

export default Category