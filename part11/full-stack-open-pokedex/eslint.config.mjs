import globals from "globals"
import js from "@eslint/js"
import react from "eslint-plugin-react"
import jest from "eslint-plugin-jest"
import babelParser from "@babel/eslint-parser"

export default [
	{
		ignores: [
			"webpack.config.js",
			"node_modules/",
			"dist/"
		]
	},

	{
		files: ["**/*.{js,mjs,cjs,jsx}"],
		languageOptions: {
			parser: babelParser,
			parserOptions: {
				requireConfigFile: false,
				babelOptions: {
					presets: ["@babel/preset-react"]
				}
			},
			ecmaVersion: 2018,
			sourceType: "module",
			globals: {
				...globals.browser,
				...globals.node,
				...globals.es6,
				...jest.environments.globals.globals
			}
		},
		plugins: {
			react,
			jest
		},
		settings: {
			react: {
				version: "detect"
			}
		},
		rules: {
			...js.configs.recommended.rules,
			...react.configs.recommended.rules,

			"no-console": "off",
			"indent": ["error", "tab"],
			"linebreak-style": ["error", "unix"],
			"quotes": ["error", "double"],
			"semi": ["error", "never"],
			"eqeqeq": "error",
			"no-trailing-spaces": "error",
			"object-curly-spacing": ["error", "always"],
			"arrow-spacing": ["error", { before: true, after: true }],
			"react/prop-types": "off"
		}
	}
]
