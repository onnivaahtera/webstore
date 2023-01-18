import Image from "next/image";
import type { GetServerSidePropsContext } from "next/types";
import { getServerAuthSession } from "../../server/common/get-server-auth-session";
import { trpc } from "../../utils/trpc";

export default function ({ id }: any) {
  const cart = trpc.cart.getItemsInCart.useQuery({
    id: id,
  });

  const item = cart.data?.[0]?.product;

  if (!item?.[0])
    return <div className="mx-6 text-center text-2xl">Cart is empty</div>;
  console.log(item);

  return (
    <div>
      <div>
        <table>
          <thead>
            <tr>
              <th>Product</th>
              <th>Quantity</th>
              <th>Price</th>
              <th>Total</th>
            </tr>
          </thead>
          {item.map((value, key) => (
            <tbody key={key}>
              <tr>
                <td>
                  <Image
                    src={value.image}
                    alt={"kala"}
                    height={100}
                    width={100}
                    unoptimized
                  />
                </td>
                <td>{value.name}</td>
                <td>{value.price}</td>
                <td>{value.price}</td>
              </tr>
            </tbody>
          ))}
        </table>
      </div>
    </div>
  );
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const session = await getServerAuthSession(context);

  if (!session) {
    return {
      redirect: {
        destination: "/account/login",
        permanent: false,
      },
    };
  }

  const id = session.user.userId;
  return {
    props: { id },
  };
}
