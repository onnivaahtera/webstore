import React, { FC } from "react";
import { orderType } from "../../types/product";
import { trpc } from "../../utils/trpc";
import { formatCurrency, formatDate } from "../../utils/formatter";
import { AccounNav } from "../../components/Navbar/AccounNav";
import { GetServerSidePropsContext } from "next";
import { getServerAuthSession } from "../../server/common/get-server-auth-session";

interface x {
  id: string;
}

const Orders: FC<x> = ({ id }) => {
  const orders = trpc.cart.userOrders.useQuery({
    id: id,
  });

  return (
    <>
      <AccounNav role="Admin" />
      <main>
        <h1>Orders</h1>
        {orders.data?.map((item) => (
          <Products
            key={item.id}
            id={item.productId}
            date={item.Order?.Date!}
            email={item.Order?.email!}
          />
        ))}
      </main>
    </>
  );
};

export default Orders;

const Products: FC<orderType> = ({ id, date }) => {
  const product = trpc.cart.userProduct.useQuery({ id: id });
  return (
    <div className="my-4">
      {product.data?.map((item) => (
        <div key={item.id} className="flex flex-row">
          <img src={item.image} alt="" className="mr-5 h-[50px] w-[100px]" />
          <div className="flex flex-col">
            <span>{item.name}</span>
            <span>Order placed {formatDate(date)}</span>
          </div>
        </div>
      ))}
    </div>
  );
};

export const getServerSideProps = async (ctx: GetServerSidePropsContext) => {
  const session = await getServerAuthSession(ctx);
  return {
    props: {
      id: session?.user.userId,
    },
  };
};
