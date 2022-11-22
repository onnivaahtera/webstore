import { useRouter } from 'next/router'
import { FC } from 'react'
import { trpc } from '../../utils/trpc'
import Image from 'next/image'
import Head from 'next/head'


const Product: FC = () => {

    const router = useRouter()
    const { id } = router.query

    const product = trpc.product.getProduct.useQuery({ url: `${id}` })

    if (!product.data) {
        return <div>Loading...</div>
    }


    return (
        <>
            <Head>
                <title>{product.data?.[0]?.name}</title>
            </Head>

            <div className='product-wrapper flex justify-center items-center'>
                <div className='product-image mt-16  rounded-md bg-slate-900'>
                    <Image src={`${product.data?.[0]?.image}`}
                        alt="product image"
                        width={300} height={300}
                        unoptimized={true} />
                </div>
                <div className='flex-col'>
                    <div className='product-name p-2'>
                        <div className='text-white bg-slate-800 text-3xl p-2 w-44 h-14 rounded-md'>
                            <p>{product.data?.[0]?.name}</p>
                        </div>
                    </div>
                    <div className='product-price px-2'>
                        <div className='text-white bg-slate-800 w-44 h-18 rounded-md'>
                            <div className='p-2'>
                                <p className='text-2xl'>{product.data?.[0]?.price}€</p>
                                <p className='text-white text-xs'>includes vat. 24%</p>
                            </div>
                        </div>
                    </div>
                    <div className='add-to-cart p-2'>
                        <div className='text-white bg-slate-800 rounded-sm p-2 w-32'>
                            <button>Add to cart</button>
                        </div>
                    </div>
                </div>
            </div>

        </>

    )
}

export default Product