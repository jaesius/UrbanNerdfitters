const {forwardTo} = require('prisma-binding')
const {hasPermission} = require('../utils')

const Query = {
    items: forwardTo('db'),
    item: forwardTo('db'),
    itemsConnection: forwardTo('db'),
    me(parent, args, ctx, info) {
        // check if there is a current user ID
        if (!ctx.request.userId) {
          return null;
        }
        return ctx.db.query.user(
          {
            where: { id: ctx.request.userId },
          },
          info
        );
    },
    async users(parent, args, ctx, info){
        //Check if logged in
        if(!ctx.request.userId) {
            throw new Error('You must be logged in')
        }
        // Check if user has permissions
        hasPermission(ctx.request.user, ['ADMIN', 'PERMISSIONUPDATE']);
        // Query all users
        return ctx.db.query.users({}, info)
    },

  async order(parent, args, ctx, info) {
    // 1. Make sure they are logged in
    if (!ctx.request.userId) {
      throw new Error('You arent logged in!');
    }
    // 2. Query the current order
    const order = await ctx.db.query.order(
      {
        where: { id: args.id }
      },
      info
    );
    // 3. Check if the have the permissions to see this order
    const ownsOrder = order.user.id === ctx.request.userId;
    const hasPermissionToSeeOrder = ctx.request.user.permissions.includes(
      'ADMIN'
    );
    if (!ownsOrder && !hasPermissionToSeeOrder) {
      throw new Error('You cant see this.');
    }
    // 4. Return the order
    console.log(order);
    return order;
  },
  orders(parent, args, ctx, info){
    //get user id
    const {userId} = ctx.request
    if(!userId){
      throw new Error('You arent logged in!')
    }

    return ctx.db.query.orders({
      where: {
        user: { id: userId}
      }
    }, info)
  }
};

module.exports = Query;
