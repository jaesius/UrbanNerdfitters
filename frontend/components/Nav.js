import React, { Fragment } from 'react';
import { Mutation } from 'react-apollo';
import Link from 'next/link';
import NavStyles from './styles/NavStyles';
import User from './User';
import CartCount from './CartCount';
import SignOut from './SignOut';
import { TOGGLE_CART_MUTATION } from './Cart';

const Nav = () => {
  return (
    <User>
      {({ data: { me } }) => (
        <NavStyles>
          <Link href="/items">
            <a>Shop</a>
          </Link>
          {/* Check if user is logged in */}
          {me && (
            <Fragment>
              <Link href="/sell">
                <a>Sell</a>
              </Link>
              <Link href="/orders">
                <a>Orders</a>
              </Link>
              {/* <Link href="/me">
                <a>Account</a>
              </Link> */}
              <SignOut />
              <Mutation mutation={TOGGLE_CART_MUTATION}>
                {toggleCart => (
                  <button onClick={toggleCart}>
                    Cart{' '}
                    <CartCount
                      count={me.cart.reduce(
                        (tally, cartItem) => tally + cartItem.quantity,
                        0
                      )}
                    />
                  </button>
                )}
              </Mutation>
            </Fragment>
          )}
          {!me && (
            <Link href="/signup">
              <a>Sign In</a>
            </Link>
          )}
        </NavStyles>
      )}
    </User>
  );
};

export default Nav;
