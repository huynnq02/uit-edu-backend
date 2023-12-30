import jwt from "jsonwebtoken";

const config = process.env;
const JWTMiddleware = {
  verifyToken: (req, res, next) => {
    console.log("verify token");
    let accessToken = req.header("Access-Token");
    const refreshToken = req.header("Refresh-Token");

    if (accessToken == null || accessToken == undefined) {
      accessToken = req.headers["api_token"];
    }

    if (!accessToken) {
      console.log("An access token is required for authentication");
      return res
        .status(401)
        .json({ error: "An access token is required for authentication" });
    }

    try {
      const decodedAccessToken = jwt.verify(
        accessToken,
        config.ACCESS_TOKEN_SECRET
      );
      req.user = decodedAccessToken;
      console.log(decodedAccessToken);
      return next();
    } catch (accessTokenError) {
      if (!refreshToken) {
        return res.status(401).json({ error: "Refresh token is required" });
      }

      try {
        const decodedRefreshToken = jwt.verify(
          refreshToken,
          config.REFRESH_TOKEN_SECRET
        );

        const newAccessToken = jwt.sign(
          {
            email: decodedRefreshToken.email,
            email: decodedRefreshToken.email,
            userId: decodedRefreshToken.id,
          },
          config.ACCESS_TOKEN_SECRET,
          {
            expiresIn: "15m",
          }
        );
        res.setHeader("Access-Token", newAccessToken);
        res.setHeader("Refresh-Token", refreshToken);
        req.user = decodedRefreshToken;
        console.log(decodedRefreshToken);
        return next();
      } catch (refreshTokenError) {
        console.log("Invalid refresh token");
        console.log(refreshTokenError);
        return res.status(401).json({ error: "Invalid refresh token" });
      }
    }
  },
  checkAdminRole: (req, res, next) => {
    const userRole = req.user.role;

    if (userRole !== "admin") {
      console.log("User does not have the admin role");
      return res.status(403).json({
        error: "Access denied. This API is restricted to administrators only.",
      });
    }

    return next();
  },
};
export default JWTMiddleware;
