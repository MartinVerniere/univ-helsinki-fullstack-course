import babelParser from "@babel/eslint-parser";
import reactPlugin from "eslint-plugin-react";
import reactNativePlugin from "eslint-plugin-react-native";

export default [
	{
		ignores: ["node_modules/**"],
	},

	{
		files: ["**/*.js", "**/*.jsx"],
		languageOptions: {
			parser: babelParser,
			parserOptions: {
				requireConfigFile: false,
				babelOptions: {
					presets: ["@babel/preset-react"],
				},
			},
		},
		plugins: {
			react: reactPlugin,
			"react-native": reactNativePlugin,
		},
		settings: {
			react: {
				version: "detect",
			},
		},
		extends: ["eslint:recommended", "plugin:react/recommended", "plugin:jest/recommended"],
		rules: {
			"react/prop-types": "off",
			"react/react-in-jsx-scope": "off",
		},
	},
];
