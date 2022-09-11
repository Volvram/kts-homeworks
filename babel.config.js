module.exports = api => {
    api.cache.using(() => process.env.NODE_ENV);
    
    const presets = [
     "@babel/preset-env",
     "@babel/preset-react",
     "@babel/preset-typescript",
    //  "module:@babel/eslint-parser",
    //  "@babel/plugin-proposal-optional-chaining",
    // "module:@babel/plugin-proposal-optional-chaining",
    ]
  
    const plugins = [
     process.env.NODE_ENV === "development" && "react-refresh/babel"
    ].filter(Boolean);
  
    return {
     presets,
     plugins
    }
}