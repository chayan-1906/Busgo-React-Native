module.exports = {
    root: true,
    extends: '@react-native',
    rules: {
        '@typescript-eslint/no-unused-vars': [
            'warn',
            {
                varsIgnorePattern: '^_',
                argsIgnorePattern: '^_',
                caughtErrorsIgnorePattern: '^_',
            },
        ],
    },
};
