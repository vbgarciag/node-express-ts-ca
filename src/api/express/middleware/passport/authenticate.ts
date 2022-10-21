import { Request, Response, NextFunction } from "express"
import passport from "passport"
import UnauthorizedError from "../../../../core/shared/domain/exceptions/UnauthorizedError";

export const authenticate = (req: Request, res: Response, next: NextFunction) => {
  return passport.authenticate('jwt', { session: false }, (err, user, info) => {
    //console.log(err, user, info);
    if (err) {
      throw new Error(err)
    }
    if (user) {
      throw new UnauthorizedError('Unauthorized')
      //return res.status(401).json(info)
    }
    //req.user = user
    //res.status(200).json(user)
    next()
  })(req, res)
}