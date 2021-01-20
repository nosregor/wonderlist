// import * as jwt from 'jsonwebtoken';
// import { NextFunction, Request, Response } from 'express';
// import * as http from 'http-status-codes';
// import { HttpError } from './error';

// interface RequestWithUser extends Request {
//   user: object | string;
// }

// /**
//  * verify if token is valid
//  * @param {*} token
//  * @return {boolean}
//  */
// const isValidToken = (token) => {
//   try {
//     jwt.verify(token, process.env.JWT_SECRET_OR_KEY);
//     return true;
//   } catch (error) {
//     // error
//     return false;
//   }
// };

// /**
//  * retrieve token from header
//  * @param {*} headers
//  * @return {string} token or null
//  */
// const retrieveToken = (headers) => {
//   if (headers && headers.authorization) {
//     const tokens = headers.authorization.split(' ');
//     if (tokens && tokens.length === 2) {
//       return tokens[1];
//     } else {
//       return null;
//     }
//   } else {
//     return null;
//   }
// };

// const AuthUtils = {
//   isValidToken,
//   retrieveToken,
// };

// /**
//  *
//  * @param {RequestWithUser} req
//  * @param {Response} res
//  * @param {NextFunction} next
//  * @returns {void}
//  */
// export function isAuthenticated(
//   req: RequestWithUser,
//   res: Response,
//   next: NextFunction,
// ): void {
//   const token: any = req.headers['authorization'];

//   if (token) {
//     try {
//       const user: object | string = jwt.verify(token, 'TOP_SECRET');

//       req.user = user;

//       return next();
//     } catch (error) {
//       return next(new HttpError(401, http.StatusCodes[401]));
//     }
//   }

//   return next(new HttpError(400, 'No token provided'));
// }
